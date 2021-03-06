function Preference(){
}
function Config(){
}
function AppAction(){
}
function UserInfos(){
}

UserInfos.prototype.getinfo = function(callback){
    http().get('/userbook/api/person').done(function(data){
        this.updateData(data.result['0'])
    }.bind(this))
}

UserInfos.prototype.putinfo = function(){
    http().putJson('/directory/user/' + this.id, {email: this.email});
}

function Appli(data){
    this.collection(AppAction)
    this.appActions.load(data.appActions)

    this.appActions.each(function(appAction){
        appAction.orderName = lang.translate(appAction.key.toLowerCase())
    })
}

Preference.prototype.getinfo = function(callback){
    http().get('/userbook/preference/timeline').done(function(data){
        try {
            this.preference = JSON.parse(data.preference);
        } catch (e) {
            this.preference = {}
        }
        this.trigger('change');
        if(typeof callback === 'function')
            callback()
    }.bind(this))
}

Preference.prototype.putinfo = function(){
    var json = this.preference
    http().putJson('/userbook/preference/timeline', json).done(function(){
        window.location = "/userbook/mon-compte";
    })
}

model.build = function(){
	this.makeModels([Preference, Config, Appli, AppAction, UserInfos]);
    this.preference = new Preference();
    this.userinfos = new UserInfos();
    model.userinfos.getinfo()

    this.collection(Appli, {
        list: function(){
            http().get('/timeline/notifications-defaults').done(function(data){

                data = _.reject(data, function(notif){
                    return notif.restriction === "INTERNAL" || notif.restriction === "HIDDEN"
                })
                data = _.filter(data, function(notif){
                    return _.find(model.me.apps, function(app){
                        return (notif.type.toLowerCase() === app.name.toLowerCase() ||
                            (notif['app-name'] && notif['app-name'].toLowerCase() === app.name.toLowerCase()))
                    })
                })
                data=_.map(_.groupBy(data, 'type'), function(item){
                    return{
                        appActions: item,
                        appName: item[0]['app-name'],
                        type: item[0]['type'],
                        appAddress: item[0]['app-address'],
                        eventType: item[0]['event-type'],
                        orderType: lang.translate(item[0]['type'].toLowerCase())
                    }
                })

                this.load(data);

                model.preference.getinfo(function(){
                    if(!model.preference.preference)
                        model.preference.preference = {}

                    if(!model.preference.preference.config)
                        return
            		model.applis.each(function(appli){
                        appli.appActions.each(function(appAction){
                            if(model.preference.preference.config[appAction.key]){
                                appAction.defaultFrequency = model.preference.preference.config[appAction.key].defaultFrequency
                            }
                        })

                        if(appli.appActions.all.length){
                            var val = appli.appActions.all[0].defaultFrequency;
                            var result = appli.appActions.every(function(appAction){
                                return val === appAction.defaultFrequency
                            })
                            if(result){
                                appli.freq = val;
                            }
                        }
                    })
                });
            }.bind(this))
        }
    })
};
