// Copyright © WebServices pour l'Éducation, 2014
//
// This file is part of ENT Core. ENT Core is a versatile ENT engine based on the JVM.
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation (version 3 of the License).
//
// For the sake of explanation, any module that communicate over native
// Web protocols, such as HTTP, with ENT Core is outside the scope of this
// license and could be license under its own terms. This is merely considered
// normal use of ENT Core, and does not fall under the heading of "covered work".
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
function User(data){
	if(data && !data.mood){
		data.mood = 'default';
	}
	this.updateData(data);
	this.relatives = [];

	this.open = function(){
		var that = this;
		http().get('/userbook/api/person?id=' + this.id + '&type=' + this.type).done(function(data){
			if(!data.result[0]){
				this.id = undefined;
				return;
			}
			data.result[0].hobbies = _.filter(data.result[0].hobbies, function(hobby){
				return hobby.values
			})
			data.result[0].relatives = _.map(data.result, function(item){
				return new User({ displayName: item.relatedName, id: item.relatedId, type: item.relatedType });
			})
			.filter(function(relative){
				return relative.id;
			});
			data.result[0].relatives = _.filter(data.result[0].relatives, function(user){
				return user.id !== '';
			});

			this.updateData(data.result[0]);
			this.trigger('sync');
		}.bind(this));
	};
}

User.prototype.saveUserbook = function(){
	for(var i = 0; i < this.hobbies.length; i++)
		if(this.hobbies[i].values === undefined)
			this.hobbies[i].values = ""

	http().putJson('/directory/userbook/' + this.id, {
		health: this.health,
		hobbies: this.hobbies,
		picture: this.picture
	});
};

User.prototype.saveUserbookProperty = function(prop){
	var data = {};
	data[prop] = this[prop];
	if(prop === 'mood'){
		data.mood = data.mood.id;
	}
	http().putJson('/directory/userbook/' + this.id, data);
};

User.prototype.saveInfos = function(){
	var userData = {
		displayName: this.displayName,
		firstName: this.firstName,
		lastName: this.lastName,
		address: this.address,
		email: this.email,
		homePhone: this.homePhone,
        mobile: this.mobile,
		birthDate: moment(this.birthDate).format('YYYY-MM-DD')
	};
	if(this.type === 'Relative'){
		userData.childrenIds = _.map(this.relatives, function(user){
			return user.id;
		});
	}
	http().putJson('/directory/user/' + this.id, userData);
};

User.prototype.saveChanges = function(){
	if(this.edit.userbook){
		this.saveUserbook();
	}
	if(this.edit.infos){
		this.saveInfos();
	}
};

User.prototype.saveAccount = function(cb){
	var accountData = {
		lastName : this.lastName,
		firstName: this.firstName,
		type: this.type,
		birthDate: moment(this.birthDate).format('YYYY-MM-DD')
	};
	if(this.type === 'Relative'){
		accountData.childrenIds = _.map(this.relatives, function(user){
			return user.id;
		});
	}
	http().postJson('/directory/class/' + model.me.preferences.selectedClass + '/user', accountData).done(function(data){
		this.updateData(data);
		if(typeof cb === 'function'){
			cb();
		}
	}.bind(this));
};

User.prototype.thumbs = "thumbnail=290x290&thumbnail=82x82&thumbnail=48x48&thumbnail=100x100";
User.prototype.moods = ['default', 'happy','proud','dreamy','love','tired','angry','worried','sick','joker','sad'];

User.prototype.loadUserbook = function(){
	this.pictureVersion = 0;

	http().get('/directory/userbook/' + this.id).done(function(data){
		if(this.type){
			data.type = this.type;
		}
		if(!data.mood){
			data.mood = 'default';
		}
		if(data.picture === 'no-avatar.jpg' || data.picture === 'no-avatar.svg'){
			data.picture = '';
		}
		data.mood = _.findWhere(User.prototype.moods, { id: data.mood });

		if(this.edit.visibility){
			this.loadVisibility();
		}
		this.updateData(data);
	}.bind(this));
};

User.prototype.loadVisibility = function(){
	http().get('/userbook/api/person').done(function(data){
		model.me.email = data.result[0].email;
		this.updateData({
			schoolName: data.result[0].schools[0].name,
			hobbies: data.result[0].hobbies,
			visible: {
				email: data.result[0].visibleInfos.indexOf("SHOW_EMAIL") !== -1 ? "public" : "prive",
				mail: data.result[0].visibleInfos.indexOf("SHOW_MAIL") !== -1 ? "public" : "prive",
				phone: data.result[0].visibleInfos.indexOf("SHOW_PHONE") !== -1 ? "public" : "prive",
				birthdate: data.result[0].visibleInfos.indexOf("SHOW_BIRTHDATE") !== -1 ? "public" : "prive",
				health: data.result[0].visibleInfos.indexOf("SHOW_HEALTH") !== -1 ? "public" : "prive",
				mobile: data.result[0].visibleInfos.indexOf("SHOW_MOBILE") !== -1 ? "public" : "prive"
			}
		});
	}.bind(this));
};

User.prototype.loadInfos = function(){
	http().get('/directory/user/' + this.id).done(function(data){
		if(this.edit.visibility && !this.edit.userbook){
			this.loadVisibility();
		}
		this.updateData(data);
		this.trigger('loadInfos');
	}.bind(this));
};

User.prototype.load = function(){
	this.loadInfos();
	if(this.edit.userbook){
		this.loadUserbook();
	}
	if(model.me.federated){
		model.account.on('loadInfos', this.loadFederatedAddress);
	}
};

User.prototype.loadFederatedAddress = function(){
	if(model.me.federated){
		http().get('/directory/conf/public').done(function(conf){
			this.federatedAddress = conf.federatedAddress[model.account.federatedIDP];
			this.trigger('change');
		}.bind(this))
	}
};

User.prototype.uploadAvatar = function(){
	var form = new FormData();
	form.append("image", this.photo[0]);
	http()
		.putFile("/directory/avatar/" + this.id + "?" + User.prototype.thumbs, form, { requestName: 'photo'})
		.done(function(data){
			this.updateData({
				picture: data.picture
			});
			this.pictureVersion++;
			ui.updateAvatar();
		}.bind(this));
};

User.prototype.toString = function(){
	if(this.displayName){
		return this.displayName;
	}
	if(this.firstName && this.lastName){
		return this.firstName + ' ' + this.lastName;
	}
};

User.prototype.removeRelative = function(relative){
	this.relatives = _.reject(this.relatives, function(user){
		return user.id === relative.id;
	});
};

User.prototype.generateMergeKey = function() {
	http().get("/directory/duplicate/user/mergeKey").done(function(data) {
		this.mergeKey = data.mergeKey;
        this.trigger('change');
	}.bind(this));
};

User.prototype.mergeByKeys = function(keys, handler) {
	http().postJson("/directory/duplicate/user/mergeByKey", { mergeKeys : keys }).done(function(data) {
		this.mergedLogins = data.mergedLogins;
        this.trigger('change');
        if(typeof handler === 'function') {
        	handler();
        }
	}.bind(this));
};

function usersMatch(search){
	var searchTerm = lang.removeAccents(search).toLowerCase();
	if(!searchTerm){
		return this.all;
	}
	return _.filter(this.all, function(user){
		var testDisplayName = '', testNameReversed = '', testFullName = '', testFullNameReversed = '';
		if(user.displayName){
			testDisplayName = lang.removeAccents(user.displayName).toLowerCase();
			if(user.displayName.split(' ').length > 0){
				testNameReversed = lang.removeAccents(user.displayName.split(' ')[1] + ' '
					+ user.displayName.split(' ')[0]).toLowerCase();
			}
		}
		if(user.firstName && user.lastName){
			testFullName = lang.removeAccents(user.firstName + ' ' + user.lastName).toLowerCase();
			testFullNameReversed = lang.removeAccents(user.lastName + ' ' + user.firstName).toLowerCase();
		}

		return testDisplayName.indexOf(searchTerm) !== -1 || testNameReversed.indexOf(searchTerm) !== -1
			|| testFullName.indexOf(searchTerm) !== -1 || testFullNameReversed.indexOf(searchTerm) !== -1;
	});
}

function Classroom(){
	var that = this;

	this.collection(User, {
		sync: function(){
			http().get('/userbook/api/class', { id: that.id }).done(function(users){
				this.load(users);
				this.trigger('sync');
			}.bind(this))
		}
	});

	this.users.match = usersMatch.bind(this.users);
}

function School(){
	this.collection(User);
	this.users.match = usersMatch.bind(this.users);

	this.collection(Classroom, {
		match: function(search){
			var searchTerm = lang.removeAccents(search).toLowerCase();
			if(!searchTerm){
				return this.all;
			}
			return _.filter(this.all, function(classroom){
				return lang.removeAccents(classroom.name).toLowerCase().indexOf(searchTerm) !== -1;
			});
		}
	});

	this.sync = function(){
		http().get('/userbook/structure/' + this.id).done(function(d){
			this.classrooms.load(d.classes);
			this.users.load(d.users);
			this.classrooms.trigger('sync');
			this.trigger('sync');
			model.network.trigger('classrooms-sync');
		}.bind(this));
	}
}

function Network(){
	this.collection(School, {
		sync: function(){
			var that = this
			http().get('/userbook/structures').done(function(d){
				this.load(d);
				_.forEach(that.all, function(struct){
					struct.parents = _.filter(struct.parents, function(parent){
						var parentMatch = _.findWhere(that.all, {id: parent.id})
						if(parentMatch){
							parentMatch.children = parentMatch.children ? parentMatch.children : []
							parentMatch.children.push(struct)
							return true
						} else
							return false
					})
					if(struct.parents.length === 0)
						delete struct.parents
				})
				this.trigger('sync');
			}.bind(this))
		},
		match: function(search){
			return _.filter(this.all, function(school){
				var words = search.split(' ');
				return _.find(words, function(word){
					var formattedOption = lang.removeAccents(school.name).toLowerCase();
					var formattedWord = lang.removeAccents(word).toLowerCase();
					return formattedOption.indexOf(formattedWord) === -1
				}) === undefined;
			});
		},
		allClassrooms: function(){
			var classrooms = [];
			this.forEach(function(school){
				classrooms = classrooms.concat(school.classrooms.all);
			});
			return classrooms;
		}
	});
}

function Directory(){
	this.collection(User, {
		match: function(){
			return this.all;
		},
		searchDirectory: function(search, filters, callback){
			var searchTerm = encodeURIComponent(search.toLowerCase());
			var structure = filters.structure ? filters.structure : "";
			var profile = filters.profile ? filters.profile : "";
			this.loading = true;
			http().get('/userbook/api/search?name=' + searchTerm + "&structure=" + structure + "&profile=" + profile).done(function(result){
				this.loading = false;
				this.load(_.map(result, function(user){
					if(!user.mood){
						user.mood = 'default';
					}
					return user;
				}));

				if(typeof callback === 'function'){
					callback();
				}
			}.bind(this));
		}
	})
}

function ClassAdmin(){
	this.sync = function(){
		if(model.me.preferences.selectedClass === undefined){
			model.me.preferences.save('selectedClass', model.me.classes[0]);
		}
		http().get('/directory/class/' + model.me.preferences.selectedClass).done(function(data){
			this.id = model.me.preferences.selectedClass;
			this.updateData(data);
		}.bind(this));
		this.users.sync();
	};

	this.saveClassInfos = function(){
		http().putJson('/directory/class/' + this.id, { name: this.name, level: this.level })
	};

	this.collection(User, {
		sync: function(){
			http().get('/directory/class/' + model.me.preferences.selectedClass + '/users', { requestName: 'loadingUsers' }).done(function(data){
				data.sort(function(a, b) {
					return a.lastName > b.lastName?1:-1;
				});
				this.load(data);
			}.bind(this));
		},
		removeSelection: function(){
			http().postJson('/directory/user/delete', { users : _.map(this.selection(), function(user){ return user.id; }) });
			Collection.prototype.removeSelection.call(this);
		}
	});

	this.users.match = usersMatch.bind(this.users);

	this.importFile = function(file, type){
		var form = new FormData();
		form.append('file', file);
		http().postFile('/directory/csv/' + type + '/class/' + this.id, form)
			.done(function(){
				this.sync();
			}.bind(this))
			.e400(function(e){
				this.sync();
				var error = JSON.parse(e.responseText).message;
				var errWithIdx = error.split(/\s/);
				if (errWithIdx.length === 2) {
					notify.error(lang.translate(errWithIdx[0]) + errWithIdx[1]);
				} else {
					if(error.indexOf('already exists') !== -1){
						notify.error('directory.import.already.exists');
					}
					else{
						notify.error(error);
					}
				}
			}.bind(this));
	};

	this.addUser = function(user){
		user.saveAccount(function(){
			model.classAdmin.sync();
			model.directory.sync();
		});
	};

	this.grabUser = function(user){
		http().put('/directory/class/' + this.id + '/add/' + user.id).done(function(){
			model.classAdmin.sync();
		});
	};

	this.blockUsers = function(value){
		this.users.selection().forEach(function(user){
			user.blocked = value;
			http().putJson('/auth/block/' + user.id, { block: value });
		});
	};

	this.resetPasswords = function(){
		this.users.selection().forEach(function(user){
			http().post('/auth/sendResetPassword', {
				login: user.login,
				email: model.me.email
			});
		});
	};

	model.on('preferences-updated', function(){
		this.sync();
	}.bind(this));
}

model.build = function(){
	this.makeModels([User, Directory, ClassAdmin, Network, Classroom, School]);
	this.directory = new Directory();
	this.classAdmin = new ClassAdmin();
	this.network = new Network();

	if(window.location.href.indexOf('mon-compte') === -1){
		http().get('/userbook/api/person').done(function(data){
			model.me.email = data.result[0].email;
		});
	}

	User.prototype.moods = _.map(User.prototype.moods, function(mood){
		return {
			icon: mood,
			text: lang.translate('userBook.mood.' + mood),
			id: mood
		}
	});
};
