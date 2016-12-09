webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var admin_module_1 = __webpack_require__(1);
	var platform_browser_dynamic_1 = __webpack_require__(466);
	var platform = platform_browser_dynamic_1.platformBrowserDynamic();
	platform.bootstrapModule(admin_module_1.AdminModule);


/***/ },

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var platform_browser_1 = __webpack_require__(20);
	var router_1 = __webpack_require__(22);
	var forms_1 = __webpack_require__(54);
	var dist_1 = __webpack_require__(56);
	var dist_2 = __webpack_require__(59);
	var routing_1 = __webpack_require__(69);
	var services_1 = __webpack_require__(124);
	var components_1 = __webpack_require__(416);
	var module_properties_1 = __webpack_require__(465);
	var AdminModule = (function () {
	    function AdminModule() {
	    }
	    return AdminModule;
	}());
	AdminModule = __decorate([
	    core_1.NgModule({
	        imports: [
	            platform_browser_1.BrowserModule,
	            forms_1.FormsModule,
	            dist_1.SijilModule,
	            dist_2.InfraComponentsModule.forRoot({
	                'LabelsService': {
	                    provide: dist_2.LabelsService,
	                    useExisting: services_1.SijilLabelsService
	                }
	            }),
	            router_1.RouterModule.forRoot(routing_1.routes)
	        ],
	        declarations: module_properties_1.declarations.slice(),
	        providers: module_properties_1.providers.slice(),
	        bootstrap: [components_1.AdminRoot]
	    }),
	    __metadata("design:paramtypes", [])
	], AdminModule);
	exports.AdminModule = AdminModule;


/***/ },

/***/ 69:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(70));
	__export(__webpack_require__(413));
	__export(__webpack_require__(415));
	__export(__webpack_require__(412));
	__export(__webpack_require__(72));
	__export(__webpack_require__(123));
	__export(__webpack_require__(414));
	__export(__webpack_require__(71));


/***/ },

/***/ 70:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var i18n_resolve_1 = __webpack_require__(71);
	var structures_resolve_1 = __webpack_require__(72);
	var structure_resolve_1 = __webpack_require__(123);
	var session_resolve_1 = __webpack_require__(412);
	var users_resolve_1 = __webpack_require__(413);
	var groups_resolve_1 = __webpack_require__(414);
	var user_resolve_1 = __webpack_require__(415);
	var components_1 = __webpack_require__(416);
	exports.routes = [
	    {
	        path: '',
	        resolve: { session: session_resolve_1.SessionResolve, structures: structures_resolve_1.StructuresResolve, i18n: i18n_resolve_1.I18nResolve },
	        children: [
	            {
	                path: 'admin/:structureId',
	                component: components_1.Portal,
	                resolve: { structure: structure_resolve_1.StructureResolve },
	                children: [
	                    { path: '', component: components_1.StructureHome },
	                    { path: 'users', component: components_1.UsersRoot, resolve: { userlist: users_resolve_1.UsersResolve },
	                        children: [
	                            { path: 'create', component: components_1.UserCreate },
	                            { path: 'filter', component: components_1.UserFilters },
	                            { path: 'error', component: components_1.UserError },
	                            { path: ':userId', component: components_1.UserDetail, resolve: { user: user_resolve_1.UserResolve } }
	                        ]
	                    },
	                    { path: 'groups', component: components_1.GroupsRoot, resolve: { grouplist: groups_resolve_1.GroupsResolve },
	                        children: [
	                            { path: 'manual', component: components_1.ManualGroups },
	                            { path: 'profile', component: components_1.ProfileGroups },
	                            { path: 'functional', component: components_1.FunctionalGroups }
	                        ]
	                    }
	                ]
	            },
	            {
	                path: 'admin',
	                component: components_1.Portal,
	                children: [
	                    { path: '', component: components_1.Home }
	                ]
	            }
	        ]
	    },
	    { path: '**', redirectTo: '/admin' }
	];


/***/ },

/***/ 71:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var dist_1 = __webpack_require__(56);
	var I18nResolve = (function () {
	    function I18nResolve(bundles) {
	        this.bundles = bundles;
	    }
	    I18nResolve.prototype.resolve = function () {
	        return this.bundles.loadBundle('/admin/i18n');
	    };
	    return I18nResolve;
	}());
	I18nResolve = __decorate([
	    core_1.Injectable(),
	    __metadata("design:paramtypes", [dist_1.BundlesService])
	], I18nResolve);
	exports.I18nResolve = I18nResolve;


/***/ },

/***/ 72:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var models_1 = __webpack_require__(73);
	var StructuresResolve = (function () {
	    function StructuresResolve() {
	    }
	    StructuresResolve.prototype.resolve = function () {
	        return models_1.structureCollection.sync();
	    };
	    return StructuresResolve;
	}());
	StructuresResolve = __decorate([
	    core_1.Injectable(),
	    __metadata("design:paramtypes", [])
	], StructuresResolve);
	exports.StructuresResolve = StructuresResolve;


/***/ },

/***/ 73:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(74));
	__export(__webpack_require__(101));
	__export(__webpack_require__(102));
	__export(__webpack_require__(103));
	__export(__webpack_require__(104));
	__export(__webpack_require__(118));
	__export(__webpack_require__(119));


/***/ },

/***/ 74:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var axios_1 = __webpack_require__(75);
	var SessionModel = (function () {
	    function SessionModel() {
	    }
	    SessionModel.getSession = function () {
	        if (!SessionModel.session) {
	            return axios_1.default.get('/auth/oauth2/userinfo').then(function (result) {
	                SessionModel.session = result.data;
	                return SessionModel.session;
	            }).catch(function (e) {
	                console.error(e);
	                return Promise.resolve({});
	            });
	        }
	        else {
	            return new Promise(function (res) { return res(SessionModel.session); });
	        }
	    };
	    return SessionModel;
	}());
	exports.SessionModel = SessionModel;


/***/ },

/***/ 101:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var structure_model_1 = __webpack_require__(102);
	var toolkit_1 = __webpack_require__(105);
	var StructureCollection = (function (_super) {
	    __extends(StructureCollection, _super);
	    function StructureCollection() {
	        return _super.call(this, {
	            sync: '/directory/structure/admin/list',
	            create: '/directory/school',
	            update: '/directory/structure/:id'
	        }, structure_model_1.StructureModel) || this;
	    }
	    StructureCollection.prototype.asTree = function () {
	        var childrenMap = new Map();
	        var referenceSet = new Set(this.data.map(function (s) { return s.id; }));
	        this.data.forEach(function (structure) {
	            structure.parents && structure.parents.forEach(function (parent) {
	                childrenMap.has(parent.id) ?
	                    childrenMap.get(parent.id).push(structure) :
	                    childrenMap.set(parent.id, [structure]);
	            });
	        });
	        this.data.forEach(function (structure) {
	            if (childrenMap.has(structure.id))
	                structure.children = childrenMap.get(structure.id);
	        });
	        var result = this.data.filter(function (structure) {
	            return !structure.parents ||
	                structure.parents.length === 0 ||
	                structure.parents.every(function (p) { return !referenceSet.has(p.id); });
	        });
	        return result;
	    };
	    return StructureCollection;
	}(toolkit_1.Collection));
	exports.StructureCollection = StructureCollection;
	exports.structureCollection = new StructureCollection();


/***/ },

/***/ 102:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var user_collection_1 = __webpack_require__(103);
	var toolkit_1 = __webpack_require__(105);
	var group_collection_1 = __webpack_require__(119);
	var StructureModel = (function (_super) {
	    __extends(StructureModel, _super);
	    function StructureModel() {
	        var _this = _super.call(this, {}) || this;
	        _this.classes = [];
	        _this.users = new user_collection_1.UserCollection();
	        _this.groups = new group_collection_1.GroupCollection();
	        return _this;
	    }
	    Object.defineProperty(StructureModel.prototype, "id", {
	        get: function () { return this._id; },
	        set: function (id) {
	            this.users.structureId = id;
	            this.groups.structureId = id;
	            this._id = id;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    StructureModel.prototype.quickSearchUsers = function (input) {
	        return this.http.get("/admin/api/structure/" + this.id + "/quicksearch/users", {
	            params: { input: input }
	        });
	    };
	    StructureModel.prototype.syncClasses = function () {
	        var _this = this;
	        return this.http.get('/directory/class/admin/list', {
	            params: { structureId: this.id }
	        }).then(function (res) {
	            _this.classes = res.data;
	        });
	    };
	    return StructureModel;
	}(toolkit_1.Model));
	exports.StructureModel = StructureModel;


/***/ },

/***/ 103:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var user_model_1 = __webpack_require__(104);
	var toolkit_1 = __webpack_require__(105);
	var UserCollection = (function (_super) {
	    __extends(UserCollection, _super);
	    function UserCollection() {
	        return _super.call(this, {
	            sync: '/directory/user/admin/list?structureId=:structureId'
	        }, user_model_1.UserModel) || this;
	    }
	    return UserCollection;
	}(toolkit_1.Collection));
	exports.UserCollection = UserCollection;


/***/ },

/***/ 104:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var toolkit_1 = __webpack_require__(105);
	var userdetails_model_1 = __webpack_require__(118);
	var structure_collection_1 = __webpack_require__(101);
	var UserModel = (function (_super) {
	    __extends(UserModel, _super);
	    function UserModel() {
	        var _this = _super.call(this, {}) || this;
	        _this.userDetails = new userdetails_model_1.UserDetailsModel();
	        return _this;
	    }
	    Object.defineProperty(UserModel.prototype, "id", {
	        get: function () { return this._id; },
	        set: function (id) {
	            this._id = id;
	            this.userDetails.id = id;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    UserModel.prototype.addStructure = function (structureId) {
	        var _this = this;
	        return this.http.put("/directory/structure/" + structureId + "/link/" + this.id).then(function () {
	            var targetStructure = structure_collection_1.structureCollection.data.find(function (s) { return s.id === structureId; });
	            if (targetStructure) {
	                _this.structures.push({ id: targetStructure.id, name: targetStructure.name });
	                if (targetStructure.users.data.length > 0)
	                    targetStructure.users.data.push(_this);
	            }
	        });
	    };
	    UserModel.prototype.removeStructure = function (structureId) {
	        var _this = this;
	        return this.http.delete("/directory/structure/" + structureId + "/unlink/" + this.id).then(function () {
	            _this.structures = _this.structures.filter(function (s) { return s.id !== structureId; });
	            var targetStructure = structure_collection_1.structureCollection.data.find(function (s) { return s.id === structureId; });
	            if (targetStructure && targetStructure.users.data.length > 0) {
	                targetStructure.users.data = targetStructure.users.data.filter(function (u) { return u.id !== _this.id; });
	            }
	        });
	    };
	    return UserModel;
	}(toolkit_1.Model));
	exports.UserModel = UserModel;


/***/ },

/***/ 118:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var toolkit_1 = __webpack_require__(105);
	var UserDetailsModel = (function (_super) {
	    __extends(UserDetailsModel, _super);
	    function UserDetailsModel() {
	        return _super.call(this, {
	            sync: '/directory/user/:id',
	            update: '/directory/user/:id'
	        }) || this;
	    }
	    UserDetailsModel.prototype.toggleBlock = function () {
	        var _this = this;
	        return this.http.put("/auth/block/" + this.id, { block: !this.blocked }).then(function () {
	            _this.blocked = !_this.blocked;
	        });
	    };
	    UserDetailsModel.prototype.sendResetPassword = function (email) {
	        var payload = new window['URLSearchParams']();
	        payload.append('login', this.login);
	        payload.append('email', email);
	        return this.http.post('/auth/sendResetPassword', payload);
	    };
	    UserDetailsModel.prototype.addRelative = function (parent) {
	        var _this = this;
	        return this.http.put("/directory/user/" + this.id + "/related/" + parent.id).then(function () {
	            _this.parents.push(parent);
	        });
	    };
	    UserDetailsModel.prototype.removeRelative = function (parent) {
	        var _this = this;
	        return this.http.delete("/directory/user/" + this.id + "/related/" + parent.id).then(function () {
	            _this.parents = _this.parents.filter(function (p) { return p.id !== parent.id; });
	        });
	    };
	    UserDetailsModel.prototype.addChild = function (child) {
	        var _this = this;
	        return this.http.put("/directory/user/" + child.id + "/related/" + this.id).then(function () {
	            _this.children.push(child);
	        });
	    };
	    UserDetailsModel.prototype.removeChild = function (child) {
	        var _this = this;
	        return this.http.delete("/directory/user/" + child.id + "/related/" + this.id).then(function () {
	            _this.children = _this.children.filter(function (c) { return c.id !== child.id; });
	        });
	    };
	    UserDetailsModel.prototype.toJSON = function () {
	        return {
	            firstName: this.firstName,
	            lastName: this.lastName,
	            displayName: this.displayName,
	            birthDate: this.birthDate,
	            address: this.address,
	            city: this.city,
	            zipCode: this.zipCode,
	            email: this.email,
	            homePhone: this.homePhone,
	            mobile: this.mobile
	        };
	    };
	    return UserDetailsModel;
	}(toolkit_1.Model));
	exports.UserDetailsModel = UserDetailsModel;


/***/ },

/***/ 119:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var toolkit_1 = __webpack_require__(105);
	var mappings_1 = __webpack_require__(120);
	var GroupCollection = (function (_super) {
	    __extends(GroupCollection, _super);
	    function GroupCollection() {
	        return _super.call(this, {
	            sync: '/directory/group/admin/list?structureId=:structureId'
	        }, mappings_1.Group) || this;
	    }
	    return GroupCollection;
	}(toolkit_1.Collection));
	exports.GroupCollection = GroupCollection;


/***/ },

/***/ 120:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(121));
	__export(__webpack_require__(122));


/***/ },

/***/ 121:
/***/ function(module, exports) {

	"use strict";
	var Session = (function () {
	    function Session() {
	    }
	    return Session;
	}());
	exports.Session = Session;


/***/ },

/***/ 122:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var axios_1 = __webpack_require__(75);
	var Group = (function () {
	    function Group() {
	    }
	    Group.prototype.syncUsers = function () {
	        var _this = this;
	        return axios_1.default.get("/directory/user/group/" + this.id).then(function (res) {
	            _this.users = res.data;
	        });
	    };
	    return Group;
	}());
	exports.Group = Group;


/***/ },

/***/ 123:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var models_1 = __webpack_require__(73);
	var services_1 = __webpack_require__(124);
	var StructureResolve = (function () {
	    function StructureResolve(loadingService) {
	        this.loadingService = loadingService;
	    }
	    StructureResolve.prototype.resolve = function (route) {
	        var _this = this;
	        var target = models_1.structureCollection.data.find(function (s) { return s.id === route.params['structureId']; });
	        if (!target) {
	            return new Promise(function (res, rej) {
	                rej('structure.not.found');
	            });
	        }
	        this.loadingService.load('portal-content');
	        return target.syncClasses().catch(function (err) {
	            console.error(err);
	        }).then(function () {
	            _this.loadingService.done('portal-content');
	            return Promise.resolve(target);
	        });
	    };
	    return StructureResolve;
	}());
	StructureResolve = __decorate([
	    core_1.Injectable(),
	    __metadata("design:paramtypes", [services_1.LoadingService])
	], StructureResolve);
	exports.StructureResolve = StructureResolve;


/***/ },

/***/ 124:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(125));
	__export(__webpack_require__(409));
	__export(__webpack_require__(410));


/***/ },

/***/ 125:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var rxjs_1 = __webpack_require__(126);
	var LoadingService = (function () {
	    function LoadingService(appRef) {
	        this.appRef = appRef;
	        this.timer = 250;
	        this.loading = new Set();
	        this.timers = new Map();
	        this._trigger = new rxjs_1.Subject();
	    }
	    Object.defineProperty(LoadingService.prototype, "trigger", {
	        get: function () {
	            return this._trigger;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    LoadingService.prototype.isLoading = function (something, pending) {
	        if (pending === void 0) { pending = false; }
	        return this.loading.has(something) ||
	            (pending && this.timers.has(something));
	    };
	    LoadingService.prototype.load = function (something, timer) {
	        var _this = this;
	        if (this.timers.has(something)) {
	            window.clearTimeout(this.timers.get(something));
	        }
	        var addToQueue = function () {
	            _this.loading.add(something);
	            _this.timers.delete(something);
	            _this.appRef.tick();
	            _this.trigger.next(true);
	        };
	        if (timer === 0) {
	            addToQueue();
	        }
	        else {
	            this.timers.set(something, window.setTimeout(addToQueue, timer || this.timer));
	        }
	    };
	    LoadingService.prototype.done = function (something) {
	        window.clearTimeout(this.timers.get(something));
	        this.timers.delete(something);
	        this.loading.delete(something);
	        this.trigger.next(true);
	        this.appRef.tick();
	    };
	    return LoadingService;
	}());
	LoadingService = __decorate([
	    core_1.Injectable(),
	    __metadata("design:paramtypes", [core_1.ApplicationRef])
	], LoadingService);
	exports.LoadingService = LoadingService;


/***/ },

/***/ 409:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var dist_1 = __webpack_require__(56);
	var SijilLabelsService = (function () {
	    function SijilLabelsService(bundles) {
	        this.bundles = bundles;
	    }
	    SijilLabelsService.prototype.getLabel = function (label) {
	        return this.bundles.translate(label);
	    };
	    return SijilLabelsService;
	}());
	SijilLabelsService = __decorate([
	    core_1.Injectable(),
	    __metadata("design:paramtypes", [dist_1.BundlesService])
	], SijilLabelsService);
	exports.SijilLabelsService = SijilLabelsService;


/***/ },

/***/ 410:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(411));


/***/ },

/***/ 411:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var dist_1 = __webpack_require__(56);
	var UserListService = (function () {
	    function UserListService(bundlesService) {
	        var _this = this;
	        this.bundlesService = bundlesService;
	        // Sorts
	        this.sortsMap = {
	            alphabetical: {
	                sort: '+',
	                orderedValue: 'lastName',
	                staticValues: ['+firstName'],
	                selected: true
	            },
	            profile: {
	                sort: '+',
	                orderedValue: 'type',
	                selected: false
	            }
	        };
	        this.sorts = ['+lastName', '+firstName', '+type'];
	        this.changeSorts = function (target) {
	            this.resetLimit();
	            this.sortsMap[target].selected = true;
	            this.sortsMap[target].sort = this.sortsMap[target].sort === '+' ? '-' : '+';
	            this.sorts = [
	                this.sortsMap[target].sort + this.sortsMap[target].orderedValue
	            ].concat((this.sortsMap[target].staticValues || []));
	            for (var prop in this.sortsMap) {
	                if (prop !== target) {
	                    this.sorts = this.sorts.concat([
	                        this.sortsMap[prop].sort + this.sortsMap[prop].orderedValue
	                    ].concat((this.sortsMap[prop].staticValues || [])));
	                    this.sortsMap[prop].selected = false;
	                }
	            }
	        };
	        // Filters
	        this._inputFilter = "";
	        this.filterByInput = function (user) {
	            if (!_this.inputFilter)
	                return true;
	            return (user.lastName + " " + user.firstName).toLowerCase()
	                .indexOf(_this.inputFilter.toLowerCase()) >= 0;
	        };
	        // Display
	        this.display = function (user) {
	            return user.lastName.toUpperCase() + " " + user.firstName + " - " + _this.bundlesService.translate(user.type);
	        };
	        // Limit
	        this.DEFAULT_INCREMENT = 100;
	        this.limit = this.DEFAULT_INCREMENT;
	    }
	    Object.defineProperty(UserListService.prototype, "inputFilter", {
	        get: function () {
	            return this._inputFilter;
	        },
	        set: function (filter) {
	            this._inputFilter = filter;
	            this.resetLimit();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    UserListService.prototype.resetLimit = function () {
	        this.limit = this.DEFAULT_INCREMENT;
	    };
	    UserListService.prototype.addPage = function (max) {
	        if (max) {
	            this.limit = Math.min(this.limit + this.DEFAULT_INCREMENT, max);
	        }
	        else {
	            this.limit = this.limit + this.DEFAULT_INCREMENT;
	        }
	    };
	    return UserListService;
	}());
	UserListService = __decorate([
	    core_1.Injectable(),
	    __metadata("design:paramtypes", [dist_1.BundlesService])
	], UserListService);
	exports.UserListService = UserListService;


/***/ },

/***/ 412:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var models_1 = __webpack_require__(73);
	var SessionResolve = (function () {
	    function SessionResolve() {
	    }
	    SessionResolve.prototype.resolve = function () {
	        return models_1.SessionModel.getSession();
	    };
	    return SessionResolve;
	}());
	SessionResolve = __decorate([
	    core_1.Injectable(),
	    __metadata("design:paramtypes", [])
	], SessionResolve);
	exports.SessionResolve = SessionResolve;


/***/ },

/***/ 413:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var models_1 = __webpack_require__(73);
	var services_1 = __webpack_require__(124);
	var UsersResolve = (function () {
	    function UsersResolve(loadingService) {
	        this.loadingService = loadingService;
	    }
	    UsersResolve.prototype.resolve = function (route) {
	        var _this = this;
	        var currentStructure = models_1.structureCollection.data.find(function (s) { return s.id === route.parent.params['structureId']; });
	        if (currentStructure.users.data.length > 0) {
	            return Promise.resolve(currentStructure.users.data);
	        }
	        else {
	            this.loadingService.load('portal-content');
	            return currentStructure.users.sync().then(function () {
	                _this.loadingService.done('portal-content');
	                return currentStructure.users.data;
	            }).catch(function (e) {
	                _this.loadingService.done('portal-content');
	                console.error(e);
	            });
	        }
	    };
	    return UsersResolve;
	}());
	UsersResolve = __decorate([
	    core_1.Injectable(),
	    __metadata("design:paramtypes", [services_1.LoadingService])
	], UsersResolve);
	exports.UsersResolve = UsersResolve;


/***/ },

/***/ 414:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var models_1 = __webpack_require__(73);
	var services_1 = __webpack_require__(124);
	var GroupsResolve = (function () {
	    function GroupsResolve(loadingService) {
	        this.loadingService = loadingService;
	    }
	    GroupsResolve.prototype.resolve = function (route) {
	        var _this = this;
	        var currentStructure = models_1.structureCollection.data.find(function (s) { return s.id === route.parent.params['structureId']; });
	        if (currentStructure.groups.data.length > 0) {
	            return Promise.resolve(currentStructure.groups.data);
	        }
	        else {
	            this.loadingService.load('portal-content');
	            return currentStructure.groups.sync().then(function () {
	                _this.loadingService.done('portal-content');
	                return currentStructure.groups.data;
	            }).catch(function (e) {
	                _this.loadingService.done('portal-content');
	                console.error(e);
	            });
	        }
	    };
	    return GroupsResolve;
	}());
	GroupsResolve = __decorate([
	    core_1.Injectable(),
	    __metadata("design:paramtypes", [services_1.LoadingService])
	], GroupsResolve);
	exports.GroupsResolve = GroupsResolve;


/***/ },

/***/ 415:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var router_1 = __webpack_require__(22);
	var models_1 = __webpack_require__(73);
	var services_1 = __webpack_require__(124);
	var UserResolve = (function () {
	    function UserResolve(loadingService, router) {
	        this.loadingService = loadingService;
	        this.router = router;
	    }
	    UserResolve.prototype.resolve = function (route) {
	        var _this = this;
	        this.loadingService.load('users-content');
	        var structure = models_1.structureCollection.data.find(function (s) { return s.id === route.parent.parent.params['structureId']; });
	        var user = structure &&
	            structure.users.data.find(function (u) { return u.id === route.params['userId']; });
	        if (user) {
	            return user.userDetails.sync()
	                .catch(function (err) {
	                _this.router.navigate(['/admin', structure.id, 'users'], { replaceUrl: true });
	            }).then(function () {
	                _this.loadingService.done('users-content');
	                return user;
	            });
	        }
	        else {
	            this.router.navigate(['/admin', structure.id, 'users'], { replaceUrl: true });
	        }
	    };
	    return UserResolve;
	}());
	UserResolve = __decorate([
	    core_1.Injectable(),
	    __metadata("design:paramtypes", [services_1.LoadingService, router_1.Router])
	], UserResolve);
	exports.UserResolve = UserResolve;


/***/ },

/***/ 416:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(417));
	__export(__webpack_require__(419));
	__export(__webpack_require__(421));
	__export(__webpack_require__(422));
	__export(__webpack_require__(429));
	__export(__webpack_require__(449));
	__export(__webpack_require__(457));


/***/ },

/***/ 417:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var AdminRoot = (function () {
	    function AdminRoot(_cdRef) {
	        this._cdRef = _cdRef;
	    }
	    AdminRoot.prototype.ngOnInit = function () { };
	    return AdminRoot;
	}());
	AdminRoot = __decorate([
	    core_1.Component({
	        selector: 'admin-app',
	        templateUrl: __webpack_require__(418),
	        changeDetection: core_1.ChangeDetectionStrategy.OnPush
	    }),
	    __metadata("design:paramtypes", [core_1.ChangeDetectorRef])
	], AdminRoot);
	exports.AdminRoot = AdminRoot;


/***/ },

/***/ 418:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "templates/admin-root.component.html";

/***/ },

/***/ 419:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var common_1 = __webpack_require__(21);
	var router_1 = __webpack_require__(22);
	var models_1 = __webpack_require__(73);
	var Portal = (function () {
	    function Portal(cdRef, router, location, route) {
	        this.cdRef = cdRef;
	        this.router = router;
	        this.location = location;
	        this.route = route;
	    }
	    Object.defineProperty(Portal.prototype, "currentStructure", {
	        get: function () { return this._currentStructure; },
	        set: function (struct) {
	            this._currentStructure = struct;
	            var replacerRegex = /^\/{0,1}admin(\/[^\/]+){0,1}/;
	            var newPath = window.location.pathname.replace(replacerRegex, "/admin/" + struct.id);
	            this.router.navigateByUrl(newPath);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Portal.prototype.ngOnInit = function () {
	        var _this = this;
	        this.structures = models_1.structureCollection.asTree();
	        models_1.SessionModel.getSession().then(function (session) { _this.session = session; });
	        this.structureSubscriber = this.route.params.subscribe(function (params) {
	            var structureId = params['structureId'];
	            if (structureId) {
	                _this.currentStructure = models_1.structureCollection.data.find(function (s) { return s.id === structureId; });
	            }
	        });
	    };
	    Portal.prototype.ngOnDestroy = function () {
	        if (this.structureSubscriber)
	            this.structureSubscriber.unsubscribe();
	    };
	    return Portal;
	}());
	__decorate([
	    core_1.ViewChild("sidePanelOpener"),
	    __metadata("design:type", core_1.ElementRef)
	], Portal.prototype, "sidePanelOpener", void 0);
	Portal = __decorate([
	    core_1.Component({
	        selector: 'admin-portal',
	        templateUrl: __webpack_require__(420),
	        changeDetection: core_1.ChangeDetectionStrategy.OnPush
	    }),
	    __metadata("design:paramtypes", [core_1.ChangeDetectorRef,
	        router_1.Router,
	        common_1.Location,
	        router_1.ActivatedRoute])
	], Portal);
	exports.Portal = Portal;


/***/ },

/***/ 420:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "templates/portal.component.html";

/***/ },

/***/ 421:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var Home = (function () {
	    function Home(cdRef) {
	        this.cdRef = cdRef;
	    }
	    Home.prototype.ngAfterContentInit = function () {
	        this.cdRef.markForCheck();
	    };
	    return Home;
	}());
	Home = __decorate([
	    core_1.Component({
	        selector: 'admin-home',
	        template: "\n    <div>\n        <h1><i class=\"fa fa-cog\"></i><s5l>admin.title</s5l></h1>\n        <h3><s5l>pick.a.structure</s5l></h3>\n    </div>",
	        changeDetection: core_1.ChangeDetectionStrategy.OnPush
	    }),
	    __metadata("design:paramtypes", [core_1.ChangeDetectorRef])
	], Home);
	exports.Home = Home;


/***/ },

/***/ 422:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(423));
	__export(__webpack_require__(424));


/***/ },

/***/ 423:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var models_1 = __webpack_require__(73);
	var router_1 = __webpack_require__(22);
	var core_1 = __webpack_require__(2);
	var StructureHome = (function () {
	    function StructureHome(route, cdRef) {
	        this.route = route;
	        this.cdRef = cdRef;
	        this.structures = models_1.structureCollection;
	    }
	    StructureHome.prototype.ngOnInit = function () {
	        var _this = this;
	        this.routeSubscriber = this.route.data.subscribe(function (data) {
	            _this.structure = data['structure'];
	            _this.cdRef.markForCheck();
	        });
	    };
	    StructureHome.prototype.ngOnDestroy = function () {
	        this.routeSubscriber.unsubscribe();
	    };
	    return StructureHome;
	}());
	StructureHome = __decorate([
	    core_1.Component({
	        selector: 'structure-home',
	        template: "\n        <div>\n            <h1><i class=\"fa fa-cogs\"></i><s5l>admin.title</s5l></h1>\n            <div class=\"card-layout\">\n                <quick-actions-card [structure]=\"structure\"></quick-actions-card>\n                <user-search-card [structure]=\"structure\" class=\"align-start\"></user-search-card>\n                <structure-card [structure]=\"structure\"></structure-card>\n                <imports-exports-card [structure]=\"structure\"></imports-exports-card>\n            </div>\n        </div>\n    ",
	        changeDetection: core_1.ChangeDetectionStrategy.OnPush
	    }),
	    __metadata("design:paramtypes", [router_1.ActivatedRoute, core_1.ChangeDetectorRef])
	], StructureHome);
	exports.StructureHome = StructureHome;


/***/ },

/***/ 424:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(425));
	__export(__webpack_require__(426));
	__export(__webpack_require__(427));
	__export(__webpack_require__(428));


/***/ },

/***/ 425:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var models_1 = __webpack_require__(73);
	var ImportsExportsCard = (function () {
	    function ImportsExportsCard() {
	    }
	    return ImportsExportsCard;
	}());
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", models_1.StructureModel)
	], ImportsExportsCard.prototype, "structure", void 0);
	ImportsExportsCard = __decorate([
	    core_1.Component({
	        selector: 'imports-exports-card',
	        template: "\n        <div class=\"card-header\">\n            <span>\n                <i class=\"fa fa-exchange \"></i>\n                <s5l>imports.exports</s5l>\n            </span>\n        </div>\n        <div class=\"card-body\">\n            <button>\n                <i class=\"fa fa-arrow-up\"></i>\n                <s5l>export.accounts</s5l>\n            </button>\n            <button>\n                <i class=\"fa fa-arrow-down\"></i>\n                <s5l>import.users</s5l>\n            </button>\n            <button>\n                <i class=\"fa fa-files-o\"></i>\n                <s5l>massmail.accounts</s5l>\n            </button>\n        </div>\n    ",
	        changeDetection: core_1.ChangeDetectionStrategy.OnPush
	    }),
	    __metadata("design:paramtypes", [])
	], ImportsExportsCard);
	exports.ImportsExportsCard = ImportsExportsCard;


/***/ },

/***/ 426:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var models_1 = __webpack_require__(73);
	var QuickActionsCard = (function () {
	    function QuickActionsCard() {
	    }
	    return QuickActionsCard;
	}());
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", models_1.StructureModel)
	], QuickActionsCard.prototype, "structure", void 0);
	QuickActionsCard = __decorate([
	    core_1.Component({
	        selector: 'quick-actions-card',
	        template: "\n        <div class=\"card-header\">\n            <span>\n                <i class=\"fa fa-wrench\"></i>\n                <s5l>quick.actions</s5l>\n            </span>\n        </div>\n        <div class=\"card-body\">\n            <button routerLink=\"users/create\">\n                <s5l>create.user</s5l>\n                <i class=\"fa fa-user-plus\"></i>\n            </button>\n            <button routerLink=\"groups\">\n                <s5l>create.group</s5l>\n                <i class=\"fa fa-users\"></i>\n            </button>\n            <button>\n                <s5l>manage.duplicates</s5l>\n                <i class=\"fa fa-user-times\"></i>\n            </button>\n            <button>\n                <s5l>manage.reports</s5l>\n                <i class=\"fa fa-exclamation-circle\"></i>\n            </button>\n        </div>\n    ",
	        changeDetection: core_1.ChangeDetectionStrategy.OnPush
	    }),
	    __metadata("design:paramtypes", [])
	], QuickActionsCard);
	exports.QuickActionsCard = QuickActionsCard;


/***/ },

/***/ 427:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var models_1 = __webpack_require__(73);
	var UserSearchCard = (function () {
	    function UserSearchCard(cdRef) {
	        this.cdRef = cdRef;
	        this.loading = false;
	        this.foundUsers = [];
	    }
	    Object.defineProperty(UserSearchCard.prototype, "inputValue", {
	        get: function () { return this._inputValue; },
	        set: function (value) {
	            var _this = this;
	            this._inputValue = value;
	            if (this._inputValue && !this.loading) {
	                this.loading = true;
	                this.structure.quickSearchUsers(this._inputValue).then(function (res) {
	                    _this.foundUsers = res.data;
	                }).catch(function (err) {
	                    console.error(err);
	                }).then(function () {
	                    _this.loading = false;
	                    _this.cdRef.markForCheck();
	                });
	            }
	            else {
	                this.foundUsers = [];
	            }
	            this.cdRef.markForCheck();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    UserSearchCard.prototype.ngAfterViewInit = function () {
	        this.cdRef.markForCheck();
	        this.cdRef.detectChanges();
	    };
	    return UserSearchCard;
	}());
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", models_1.StructureModel)
	], UserSearchCard.prototype, "structure", void 0);
	UserSearchCard = __decorate([
	    core_1.Component({
	        selector: 'user-search-card',
	        template: "\n        <div class=\"card-header\">\n            <span>\n                <i class=\"fa fa-user\"></i>\n                <s5l>search.user</s5l>\n            </span>\n        </div>\n        <div class=\"card-body relative\">\n            <search-input\n                [delay]=\"500\"\n                [attr.placeholder]=\"'search.user' | translate\"\n                (onChange)=\"inputValue = $event\"></search-input>\n            <!-- position hack ... -->\n                <i class=\"fa fa-spinner fa-pulse fa-2x fa-fw\"\n                    *ngIf=\"loading\"\n                    style=\"position: absolute; top: 35px; right: -20px;\"></i>\n            <div class=\"card-list\">\n                <div class=\"card-big-margin\" *ngIf=\"!foundUsers || foundUsers.length === 0\">\n                    <em *ngIf=\"!inputValue\">\n                        <s5l>users.quick.search.intro</s5l>.\n                    </em>\n                    <em *ngIf=\"inputValue\">\n                        <s5l>no.user.found</s5l>.\n                    </em>\n                </div>\n                <ul *ngIf=\"foundUsers && foundUsers.length > 0\">\n                    <li *ngFor=\"let user of foundUsers\">\n                        <a [routerLink]=\"['users', user.id]\">\n                            {{ user.lastName | uppercase }} {{ user.firstName }}\n                        </a>\n                    </li>\n                </ul>\n            </div>\n        </div>\n    ",
	        changeDetection: core_1.ChangeDetectionStrategy.OnPush
	    }),
	    __metadata("design:paramtypes", [core_1.ChangeDetectorRef])
	], UserSearchCard);
	exports.UserSearchCard = UserSearchCard;


/***/ },

/***/ 428:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var models_1 = __webpack_require__(73);
	var StructureCard = (function () {
	    function StructureCard() {
	    }
	    return StructureCard;
	}());
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", models_1.StructureModel)
	], StructureCard.prototype, "structure", void 0);
	StructureCard = __decorate([
	    core_1.Component({
	        selector: 'structure-card',
	        template: "\n        <div class=\"card-header\">\n            <span>\n                <i class=\"fa fa-building\"></i>\n                <s5l>structure</s5l>\n            </span>\n        </div>\n        <div class=\"card-body\">\n            <button>\n                <i class=\"fa fa-plug\"></i>\n                <s5l>manage.connectors</s5l>\n            </button>\n            <button>\n                <i class=\"fa fa-window-maximize\"></i>\n                <s5l>manage.widgets</s5l>\n            </button>\n            <button>\n                <i class=\"fa fa-th\"></i>\n                <s5l>manage.applications</s5l>\n            </button>\n        </div>\n    ",
	        changeDetection: core_1.ChangeDetectionStrategy.OnPush
	    }),
	    __metadata("design:paramtypes", [])
	], StructureCard);
	exports.StructureCard = StructureCard;


/***/ },

/***/ 429:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(430));
	__export(__webpack_require__(434));
	__export(__webpack_require__(435));
	__export(__webpack_require__(437));
	__export(__webpack_require__(446));
	__export(__webpack_require__(447));
	__export(__webpack_require__(448));


/***/ },

/***/ 430:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var router_1 = __webpack_require__(22);
	var services_1 = __webpack_require__(124);
	var userlist_filters_service_1 = __webpack_require__(431);
	var users_data_service_1 = __webpack_require__(432);
	var UsersRoot = (function () {
	    function UsersRoot(route, router, cdRef, dataService, filtersService, loadingService) {
	        this.route = route;
	        this.router = router;
	        this.cdRef = cdRef;
	        this.dataService = dataService;
	        this.filtersService = filtersService;
	        this.loadingService = loadingService;
	    }
	    UsersRoot.prototype.ngOnInit = function () {
	        var _this = this;
	        this.structureSubscriber = this.route.parent.data.subscribe(function (data) {
	            var structure = data['structure'];
	            _this.dataService.structure = structure;
	            _this.filtersService.resetFilters();
	            _this.filtersService.setClasses(structure.classes);
	            if (structure.users.data.length === 0) {
	                _this.loadingService.load('portal-content');
	                structure.users.sync().catch(function (e) {
	                    _this.router.navigate(['error']);
	                }).then(function () {
	                    _this.loadingService.done('portal-content');
	                    _this.cdRef.markForCheck();
	                    _this.cdRef.detectChanges();
	                });
	            }
	            _this.cdRef.markForCheck();
	            _this.cdRef.detectChanges();
	        });
	    };
	    UsersRoot.prototype.ngOnDestroy = function () {
	        this.structureSubscriber.unsubscribe();
	    };
	    UsersRoot.prototype.closeCompanion = function () {
	        this.router.navigate(['../users'], { relativeTo: this.route });
	    };
	    UsersRoot.prototype.openUserDetail = function (user) {
	        this.dataService.user = user;
	        this.router.navigate([user.id], { relativeTo: this.route });
	    };
	    UsersRoot.prototype.openCreationView = function () {
	        this.router.navigate(['create'], { relativeTo: this.route });
	    };
	    UsersRoot.prototype.openCompanionView = function (view) {
	        this.router.navigate([view], { relativeTo: this.route });
	    };
	    return UsersRoot;
	}());
	UsersRoot = __decorate([
	    core_1.Component({
	        selector: 'users-root',
	        template: "\n        <h1><i class=\"fa fa-user\"></i><s5l>users.title</s5l></h1>\n        <side-layout (closeCompanion)=\"closeCompanion()\"\n                [showCompanion]=\"!router.isActive('/admin/' + dataService.structure?.id + '/users', true)\">\n            <div side-card>\n                <div class=\"round-button top-right-button\"\n                    (click)=\"openCreationView()\"\n                    [class.selected]=\"router.isActive('/admin/' + dataService.structure?.id + '/users/create', true)\"\n                    [tooltip]=\"'create.user' | translate\" position=\"top\">+</div>\n                <user-list [userlist]=\"dataService.structure.users.data\"\n                    (listCompanionChange)=\"openCompanionView($event)\"\n                    [selectedUser]=\"dataService.user\"\n                    (selectedUserChange)=\"openUserDetail($event)\"></user-list>\n            </div>\n            <div side-companion>\n                <router-outlet></router-outlet>\n            </div>\n        </side-layout>\n    ",
	        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
	        providers: [userlist_filters_service_1.UserlistFiltersService, users_data_service_1.UsersDataService]
	    }),
	    __metadata("design:paramtypes", [router_1.ActivatedRoute,
	        router_1.Router,
	        core_1.ChangeDetectorRef,
	        users_data_service_1.UsersDataService,
	        userlist_filters_service_1.UserlistFiltersService,
	        services_1.LoadingService])
	], UsersRoot);
	exports.UsersRoot = UsersRoot;


/***/ },

/***/ 431:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var rxjs_1 = __webpack_require__(126);
	var UserFilter = (function () {
	    function UserFilter(observable) {
	        this.observable = observable;
	        this._outputModel = [];
	    }
	    Object.defineProperty(UserFilter.prototype, "outputModel", {
	        get: function () {
	            return this._outputModel;
	        },
	        set: function (model) {
	            this._outputModel = model;
	            this.observable.next();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return UserFilter;
	}());
	exports.UserFilter = UserFilter;
	var ProfileFilter = (function (_super) {
	    __extends(ProfileFilter, _super);
	    function ProfileFilter() {
	        var _this = _super.apply(this, arguments) || this;
	        _this.type = 'type';
	        _this.label = 'profiles.multi.combo.title';
	        _this.comboModel = ['Student', 'Teacher', 'Relative', 'Personnel', 'Guest'];
	        _this.filter = function (type) {
	            var outputModel = _this.outputModel;
	            return outputModel.length === 0 || outputModel.indexOf(type) >= 0;
	        };
	        return _this;
	    }
	    return ProfileFilter;
	}(UserFilter));
	var ActivationFilter = (function (_super) {
	    __extends(ActivationFilter, _super);
	    function ActivationFilter() {
	        var _this = _super.apply(this, arguments) || this;
	        _this.type = 'code';
	        _this.label = 'code.multi.combo.title';
	        _this.comboModel = ['users.activated', 'users.not.activated'];
	        _this.filter = function (code) {
	            var outputModel = _this.outputModel;
	            return outputModel.length === 0 ||
	                outputModel.indexOf('users.activated') >= 0 && !code ||
	                outputModel.indexOf('users.not.activated') >= 0 && !(!code);
	        };
	        return _this;
	    }
	    return ActivationFilter;
	}(UserFilter));
	var ClassesFilter = (function (_super) {
	    __extends(ClassesFilter, _super);
	    function ClassesFilter() {
	        var _this = _super.apply(this, arguments) || this;
	        _this.type = 'allClasses';
	        _this.label = 'classes.multi.combo.title';
	        _this.comboModel = [];
	        _this.display = 'name';
	        _this.order = '+name';
	        _this.filterProp = 'name';
	        _this.filter = function (allClasses) {
	            var outputModel = _this.outputModel;
	            return outputModel.length === 0 ||
	                allClasses && allClasses.length > 0 &&
	                    allClasses.some(function (c) {
	                        return outputModel.some(function (o) { return o.id === c.id; });
	                    });
	        };
	        return _this;
	    }
	    return ClassesFilter;
	}(UserFilter));
	var UserlistFiltersService = (function () {
	    function UserlistFiltersService() {
	        this.updateSubject = new rxjs_1.Subject();
	        this.profileFilter = new ProfileFilter(this.updateSubject);
	        this.activationFilter = new ActivationFilter(this.updateSubject);
	        this.classesFilter = new ClassesFilter(this.updateSubject);
	        this.filters = [
	            this.profileFilter,
	            this.activationFilter,
	            this.classesFilter
	        ];
	    }
	    UserlistFiltersService.prototype.resetFilters = function () {
	        for (var i = 0; i < this.filters.length; i++) {
	            this.filters[i].outputModel = [];
	        }
	    };
	    UserlistFiltersService.prototype.setClasses = function (classes) {
	        this.classesFilter.comboModel = classes;
	    };
	    UserlistFiltersService.prototype.getFormattedFilters = function () {
	        var formattedFilters = {};
	        for (var i = 0; i < this.filters.length; i++) {
	            var filter = this.filters[i];
	            formattedFilters[filter.type] = filter.filter;
	        }
	        return formattedFilters;
	    };
	    return UserlistFiltersService;
	}());
	UserlistFiltersService = __decorate([
	    core_1.Injectable(),
	    __metadata("design:paramtypes", [])
	], UserlistFiltersService);
	exports.UserlistFiltersService = UserlistFiltersService;


/***/ },

/***/ 432:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var abstract_data_service_1 = __webpack_require__(433);
	var UsersDataService = (function (_super) {
	    __extends(UsersDataService, _super);
	    function UsersDataService() {
	        return _super.call(this, ['structure', 'user']) || this;
	    }
	    return UsersDataService;
	}(abstract_data_service_1.AbstractDataService));
	exports.UsersDataService = UsersDataService;


/***/ },

/***/ 433:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var rxjs_1 = __webpack_require__(126);
	var AbstractDataService = (function () {
	    function AbstractDataService(triggers) {
	        var _this = this;
	        this.onchange = new rxjs_1.Subject();
	        triggers.forEach(function (trigger) {
	            _this['_' + trigger] = _this[trigger];
	            delete _this[trigger];
	            Object.defineProperty(_this, trigger, {
	                set: function (x) {
	                    _this['_' + trigger] = x;
	                    _this.onchange.next();
	                },
	                get: function () {
	                    return _this['_' + trigger];
	                }
	            });
	        });
	    }
	    return AbstractDataService;
	}());
	exports.AbstractDataService = AbstractDataService;


/***/ },

/***/ 434:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var dist_1 = __webpack_require__(56);
	var services_1 = __webpack_require__(124);
	var userlist_filters_service_1 = __webpack_require__(431);
	var UserList = (function () {
	    function UserList(cdRef, bundlesService, userListService, listFilters) {
	        var _this = this;
	        this.cdRef = cdRef;
	        this.bundlesService = bundlesService;
	        this.userListService = userListService;
	        this.listFilters = listFilters;
	        this.userlist = [];
	        this.companionChange = new core_1.EventEmitter();
	        this.onselect = new core_1.EventEmitter();
	        this.isSelected = function (user) {
	            return _this.selectedUser && user &&
	                _this.selectedUser.id === user.id;
	        };
	        // Scroll
	        this.ticking = false;
	    }
	    UserList.prototype.ngOnInit = function () {
	        var _this = this;
	        this.filtersUpdatesSubscriber = this.listFilters.updateSubject.subscribe(function () {
	            _this.cdRef.markForCheck();
	        });
	    };
	    UserList.prototype.ngOnDestroy = function () {
	        this.filtersUpdatesSubscriber.unsubscribe();
	    };
	    UserList.prototype.selectUser = function (user) {
	        this.selectedUser = user;
	        this.onselect.emit(user);
	    };
	    UserList.prototype.onDocumentScroll = function (event) {
	        var _this = this;
	        if (!this.ticking) {
	            window.requestAnimationFrame(function () {
	                if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
	                    _this.userListService.addPage(_this.userlist.length);
	                    _this.cdRef.markForCheck();
	                }
	                _this.ticking = false;
	            });
	        }
	        this.ticking = true;
	    };
	    return UserList;
	}());
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", Array)
	], UserList.prototype, "userlist", void 0);
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", String)
	], UserList.prototype, "listCompanion", void 0);
	__decorate([
	    core_1.Output("listCompanionChange"),
	    __metadata("design:type", core_1.EventEmitter)
	], UserList.prototype, "companionChange", void 0);
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", Object)
	], UserList.prototype, "selectedUser", void 0);
	__decorate([
	    core_1.Output("selectedUserChange"),
	    __metadata("design:type", core_1.EventEmitter)
	], UserList.prototype, "onselect", void 0);
	UserList = __decorate([
	    core_1.Component({
	        selector: 'user-list',
	        template: "\n    <list-component\n        [model]=\"userlist\"\n        [filters]=\"listFilters.getFormattedFilters()\"\n        [inputFilter]=\"userListService.filterByInput\"\n        [sort]=\"userListService.sorts\"\n        [limit]=\"userListService.limit\"\n        searchPlaceholder=\"search.user\"\n        [isSelected]=\"isSelected\"\n        [display]=\"userListService.display\"\n        (inputChange)=\"userListService.inputFilter = $event\"\n        (onSelect)=\"selectedUser = $event; onselect.emit($event)\">\n        <div toolbar class=\"user-toolbar\">\n             <i class=\"fa\" aria-hidden=\"true\"\n                [ngClass]=\"{\n                    'fa-sort-alpha-asc': userListService.sortsMap.alphabetical.sort === '+',\n                    'fa-sort-alpha-desc': userListService.sortsMap.alphabetical.sort === '-',\n                    'selected': userListService.sortsMap.alphabetical.selected\n                }\"\n                [tooltip]=\"'sort.alphabetical' | translate\" position=\"top\"\n                (click)=\"userListService.changeSorts('alphabetical')\"></i>\n            <i class=\"fa\" aria-hidden=\"true\"\n                [ngClass]=\"{\n                    'fa-sort-amount-asc': userListService.sortsMap.profile.sort === '+',\n                    'fa-sort-amount-desc': userListService.sortsMap.profile.sort === '-',\n                    'selected': userListService.sortsMap.profile.selected\n                }\"\n                [tooltip]=\"'sort.profile' | translate\" position=\"top\"\n                (click)=\"userListService.changeSorts('profile')\"></i>\n            <i class=\"fa fa-filter toolbar-right\" aria-hidden=\"true\"\n                [tooltip]=\"'filters' | translate\" position=\"top\"\n                (click)=\"companionChange.emit('filter')\"></i>\n        </div>\n    </list-component>\n    ",
	        styles: ["\n        .user-toolbar {\n            padding: 15px;\n            font-size: 1.2em;\n        }\n        .user-toolbar i {\n            cursor: pointer;\n        }\n    "],
	        host: {
	            '(document:scroll)': 'onDocumentScroll($event)',
	        },
	        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
	        providers: [services_1.UserListService]
	    }),
	    __metadata("design:paramtypes", [core_1.ChangeDetectorRef,
	        dist_1.BundlesService,
	        services_1.UserListService,
	        userlist_filters_service_1.UserlistFiltersService])
	], UserList);
	exports.UserList = UserList;


/***/ },

/***/ 435:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var forms_1 = __webpack_require__(54);
	var services_1 = __webpack_require__(124);
	var router_1 = __webpack_require__(22);
	var users_data_service_1 = __webpack_require__(432);
	var UserDetail = (function () {
	    function UserDetail(loadingService, dataService, cdRef, route, router) {
	        this.loadingService = loadingService;
	        this.dataService = dataService;
	        this.cdRef = cdRef;
	        this.route = route;
	        this.router = router;
	        this.structure = this.dataService.structure;
	    }
	    UserDetail.prototype.ngOnInit = function () {
	        var _this = this;
	        this.dataSubscriber = this.dataService.onchange.subscribe(function () {
	            if (_this.dataService.user &&
	                !_this.dataService.user.structures.find(function (s) { return _this.dataService.structure.id === s.id; })) {
	                setTimeout(function () {
	                    _this.router.navigate(['..'], { relativeTo: _this.route, replaceUrl: true });
	                }, 0);
	            }
	            else if (_this.user !== _this.dataService.user) {
	                _this.user = _this.dataService.user;
	            }
	        });
	        this.userSubscriber = this.route.data.subscribe(function (data) {
	            _this.dataService.user = data['user'];
	        });
	    };
	    UserDetail.prototype.ngOnDestroy = function () {
	        this.userSubscriber.unsubscribe();
	        this.dataSubscriber.unsubscribe();
	    };
	    Object.defineProperty(UserDetail.prototype, "user", {
	        get: function () { return this._user; },
	        set: function (user) {
	            this._user = user;
	            this.details = user.userDetails;
	            if (this.codeInput)
	                this.codeInput.reset();
	            if (this.administrativeForm)
	                this.administrativeForm.reset();
	            this.cdRef.markForCheck();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    UserDetail.prototype.isContextAdml = function () {
	        var _this = this;
	        return this.details && this.details.functions &&
	            this.details.functions[0][0] &&
	            this.details.functions[0][1].find(function (id) { return _this.structure.id === id; });
	    };
	    return UserDetail;
	}());
	__decorate([
	    core_1.ViewChild("codeInput"),
	    __metadata("design:type", forms_1.AbstractControl)
	], UserDetail.prototype, "codeInput", void 0);
	__decorate([
	    core_1.ViewChild("administrativeForm"),
	    __metadata("design:type", forms_1.NgForm)
	], UserDetail.prototype, "administrativeForm", void 0);
	UserDetail = __decorate([
	    core_1.Component({
	        selector: 'user-detail',
	        templateUrl: __webpack_require__(436),
	        changeDetection: core_1.ChangeDetectionStrategy.OnPush
	    }),
	    __metadata("design:paramtypes", [services_1.LoadingService,
	        users_data_service_1.UsersDataService,
	        core_1.ChangeDetectorRef,
	        router_1.ActivatedRoute,
	        router_1.Router])
	], UserDetail);
	exports.UserDetail = UserDetail;


/***/ },

/***/ 436:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "templates/user-detail.component.html";

/***/ },

/***/ 437:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(438));
	__export(__webpack_require__(441));
	__export(__webpack_require__(443));
	__export(__webpack_require__(444));
	__export(__webpack_require__(445));


/***/ },

/***/ 438:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var forms_1 = __webpack_require__(54);
	var abstract_section_1 = __webpack_require__(439);
	var services_1 = __webpack_require__(124);
	var UserAdministrativeSection = (function (_super) {
	    __extends(UserAdministrativeSection, _super);
	    function UserAdministrativeSection(loadingService, cdRef) {
	        var _this = _super.call(this, loadingService, cdRef) || this;
	        _this.loadingService = loadingService;
	        _this.cdRef = cdRef;
	        return _this;
	    }
	    UserAdministrativeSection.prototype.onUserChange = function () {
	        if (this.administrativeForm)
	            this.administrativeForm.reset();
	    };
	    return UserAdministrativeSection;
	}(abstract_section_1.AbstractSection));
	__decorate([
	    core_1.ViewChild("administrativeForm"),
	    __metadata("design:type", forms_1.NgForm)
	], UserAdministrativeSection.prototype, "administrativeForm", void 0);
	UserAdministrativeSection = __decorate([
	    core_1.Component({
	        selector: 'user-administrative-section',
	        templateUrl: __webpack_require__(440),
	        inputs: ['user', 'structure']
	    }),
	    __metadata("design:paramtypes", [services_1.LoadingService,
	        core_1.ChangeDetectorRef])
	], UserAdministrativeSection);
	exports.UserAdministrativeSection = UserAdministrativeSection;


/***/ },

/***/ 439:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var models_1 = __webpack_require__(73);
	var AbstractSection = (function () {
	    function AbstractSection(loadingService, cdRef) {
	        var _this = this;
	        this.loadingService = loadingService;
	        this.cdRef = cdRef;
	        this.now = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();
	        this.emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	        this.wrapRequest = function (request, loadingLabel, delay) {
	            var args = [];
	            for (var _i = 3; _i < arguments.length; _i++) {
	                args[_i - 3] = arguments[_i];
	            }
	            _this.loadingService.load(loadingLabel, delay);
	            request.bind(_this.details).apply(void 0, args).catch(function (err) {
	                console.error(err);
	            }).then(function () {
	                _this.loadingService.done(loadingLabel);
	                _this.cdRef.markForCheck();
	            });
	            _this.cdRef.markForCheck();
	        };
	    }
	    Object.defineProperty(AbstractSection.prototype, "user", {
	        get: function () { return this._user; },
	        set: function (u) {
	            this.onUserChange();
	            this._user = u;
	            this.details = u.userDetails;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    AbstractSection.prototype.getStructure = function (id) {
	        return models_1.structureCollection.data.find(function (s) { return s.id === id; });
	    };
	    return AbstractSection;
	}());
	exports.AbstractSection = AbstractSection;


/***/ },

/***/ 440:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "templates/user-administrative-section.component.html";

/***/ },

/***/ 441:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var forms_1 = __webpack_require__(54);
	var abstract_section_1 = __webpack_require__(439);
	var services_1 = __webpack_require__(124);
	var UserInfoSection = (function (_super) {
	    __extends(UserInfoSection, _super);
	    function UserInfoSection(loadingService, cdRef) {
	        var _this = _super.call(this, loadingService, cdRef) || this;
	        _this.loadingService = loadingService;
	        _this.cdRef = cdRef;
	        return _this;
	    }
	    UserInfoSection.prototype.onUserChange = function () {
	        if (this.passwordMailInput)
	            this.passwordMailInput.reset();
	    };
	    return UserInfoSection;
	}(abstract_section_1.AbstractSection));
	__decorate([
	    core_1.ViewChild("passwordMailInput"),
	    __metadata("design:type", forms_1.NgModel)
	], UserInfoSection.prototype, "passwordMailInput", void 0);
	UserInfoSection = __decorate([
	    core_1.Component({
	        selector: 'user-info-section',
	        templateUrl: __webpack_require__(442),
	        inputs: ['user', 'structure']
	    }),
	    __metadata("design:paramtypes", [services_1.LoadingService,
	        core_1.ChangeDetectorRef])
	], UserInfoSection);
	exports.UserInfoSection = UserInfoSection;


/***/ },

/***/ 442:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "templates/user-info-section.component.html";

/***/ },

/***/ 443:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var forms_1 = __webpack_require__(54);
	var abstract_section_1 = __webpack_require__(439);
	var services_1 = __webpack_require__(124);
	var UserRelativesSection = (function (_super) {
	    __extends(UserRelativesSection, _super);
	    function UserRelativesSection(userListService, loadingService, cdRef) {
	        var _this = _super.call(this, loadingService, cdRef) || this;
	        _this.userListService = userListService;
	        _this.loadingService = loadingService;
	        _this.cdRef = cdRef;
	        _this.filterRelatives = function (u) {
	            return _this.details && _this.details.parents &&
	                u.type === 'Relative' && !_this.details.parents.find(function (p) { return p.id === u.id; });
	        };
	        _this.disableRelative = function (relative) {
	            return _this.loadingService.isLoading(relative.id);
	        };
	        return _this;
	    }
	    UserRelativesSection.prototype.onUserChange = function () { };
	    UserRelativesSection.prototype.isStudent = function (u) {
	        return u.type === 'Student';
	    };
	    return UserRelativesSection;
	}(abstract_section_1.AbstractSection));
	__decorate([
	    core_1.ViewChild("codeInput"),
	    __metadata("design:type", forms_1.AbstractControl)
	], UserRelativesSection.prototype, "codeInput", void 0);
	UserRelativesSection = __decorate([
	    core_1.Component({
	        selector: 'user-relatives-section',
	        template: "\n        <panel-section section-title=\"users.details.section.relatives\" [folded]=\"true\" *ngIf=\"isStudent(user)\">\n            <button (click)=\"showRelativesLightbox = true\">\n                <s5l>add.relative</s5l><i class=\"fa fa-plus-circle\"></i>\n            </button>\n            <light-box class=\"inner-list\"\n                    [show]=\"showRelativesLightbox\" (onClose)=\"showRelativesLightbox = false\">\n                <div class=\"padded\">\n                    <h3><s5l>add.relative</s5l></h3>\n                    <list-component class=\"inner-list\"\n                        [model]=\"structure?.users?.data\"\n                        [inputFilter]=\"userListService.filterByInput\"\n                        [filters]=\"filterRelatives\"\n                        searchPlaceholder=\"search.user\"\n                        [sort]=\"userListService.sorts\"\n                        [display]=\"userListService.display\"\n                        (inputChange)=\"userListService.inputFilter = $event\"\n                        [isDisabled]=\"disableRelative\"\n                        (onSelect)=\"wrapRequest(details?.addRelative, $event.id, 0, $event)\">\n                    </list-component>\n                </div>\n            </light-box>\n            <ul class=\"actions-list\">\n                <li *ngFor=\"let parent of details?.parents\">\n                    <a class=\"action\" [routerLink]=\"['..', parent.id]\">\n                        {{ parent.lastName | uppercase }} {{ parent.firstName }}\n                    </a>\n                    <i  class=\"fa fa-times action\" (click)=\"wrapRequest(details?.removeRelative, parent.id, 0, parent)\"\n                        [tooltip]=\"'delete.this.relative' | translate\"\n                        [ngClass]=\"{ disabled: loadingService.isLoading(parent.id)}\"></i>\n                </li>\n            </ul>\n        </panel-section>\n    ",
	        inputs: ['user', 'structure'],
	        providers: [services_1.UserListService]
	    }),
	    __metadata("design:paramtypes", [services_1.UserListService,
	        services_1.LoadingService,
	        core_1.ChangeDetectorRef])
	], UserRelativesSection);
	exports.UserRelativesSection = UserRelativesSection;


/***/ },

/***/ 444:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var forms_1 = __webpack_require__(54);
	var abstract_section_1 = __webpack_require__(439);
	var services_1 = __webpack_require__(124);
	var UserChildrenSection = (function (_super) {
	    __extends(UserChildrenSection, _super);
	    function UserChildrenSection(userListService, loadingService, cdRef) {
	        var _this = _super.call(this, loadingService, cdRef) || this;
	        _this.userListService = userListService;
	        _this.loadingService = loadingService;
	        _this.cdRef = cdRef;
	        _this.filterChildren = function (u) {
	            return _this.details && _this.details.children &&
	                u.type === 'Student' && !_this.details.children.find(function (c) { return c.id === u.id; });
	        };
	        _this.disableChild = function (child) {
	            return _this.loadingService.isLoading(child.id);
	        };
	        return _this;
	    }
	    UserChildrenSection.prototype.onUserChange = function () { };
	    UserChildrenSection.prototype.isRelative = function (u) {
	        return u.type === 'Relative';
	    };
	    return UserChildrenSection;
	}(abstract_section_1.AbstractSection));
	__decorate([
	    core_1.ViewChild("codeInput"),
	    __metadata("design:type", forms_1.AbstractControl)
	], UserChildrenSection.prototype, "codeInput", void 0);
	UserChildrenSection = __decorate([
	    core_1.Component({
	        selector: 'user-children-section',
	        template: "\n        <panel-section section-title=\"users.details.section.children\" [folded]=\"true\" *ngIf=\"isRelative(user)\">\n            <button (click)=\"showChildrenLightbox = true\">\n                <s5l>add.child</s5l><i class=\"fa fa-plus-circle\"></i>\n            </button>\n            <light-box class=\"inner-list\"\n                    [show]=\"showChildrenLightbox\" (onClose)=\"showChildrenLightbox = false\">\n                <div class=\"padded\">\n                    <h3><s5l>add.child</s5l></h3>\n                    <list-component class=\"inner-list\"\n                        [model]=\"structure?.users?.data\"\n                        [inputFilter]=\"userListService.filterByInput\"\n                        [filters]=\"filterChildren\"\n                        searchPlaceholder=\"search.user\"\n                        [sort]=\"userListService.sorts\"\n                        [display]=\"userListService.display\"\n                        (inputChange)=\"userListService.inputFilter = $event\"\n                        [isDisabled]=\"disableChild\"\n                        (onSelect)=\"wrapRequest(details?.addChild, $event.id, 0, $event)\">\n                    </list-component>\n                </div>\n            </light-box>\n            <ul class=\"actions-list\">\n                <li *ngFor=\"let child of details?.children\">\n                    <a class=\"action\" [routerLink]=\"['..', child.id]\">\n                        {{ child.lastName | uppercase }} {{ child.firstName }}\n                    </a>\n                    <i  class=\"fa fa-times action\" (click)=\"wrapRequest(details?.removeChild, child.id, 0, child)\"\n                        [tooltip]=\"'delete.this.child' | translate\"\n                        [ngClass]=\"{ disabled: loadingService.isLoading(child.id)}\"></i>\n                </li>\n            </ul>\n        </panel-section>\n    ",
	        inputs: ['user', 'structure'],
	        providers: [services_1.UserListService]
	    }),
	    __metadata("design:paramtypes", [services_1.UserListService,
	        services_1.LoadingService,
	        core_1.ChangeDetectorRef])
	], UserChildrenSection);
	exports.UserChildrenSection = UserChildrenSection;


/***/ },

/***/ 445:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var forms_1 = __webpack_require__(54);
	var router_1 = __webpack_require__(22);
	var abstract_section_1 = __webpack_require__(439);
	var services_1 = __webpack_require__(124);
	var models_1 = __webpack_require__(73);
	var UserStructuresSection = (function (_super) {
	    __extends(UserStructuresSection, _super);
	    function UserStructuresSection(userListService, router, loadingService, cdRef) {
	        var _this = _super.call(this, loadingService, cdRef) || this;
	        _this.userListService = userListService;
	        _this.router = router;
	        _this.loadingService = loadingService;
	        _this.cdRef = cdRef;
	        _this.structureCollection = models_1.structureCollection;
	        _this.disableStructure = function (s) {
	            return _this.loadingService.isLoading(s.id);
	        };
	        // Filters
	        _this._inputFilter = "";
	        _this.filterByInput = function (s) {
	            if (!_this.inputFilter)
	                return true;
	            return ("" + s.name).toLowerCase().indexOf(_this.inputFilter.toLowerCase()) >= 0;
	        };
	        _this.filterStructures = function (s) {
	            return !_this.user.structures.find(function (struct) { return s.id === struct.id; });
	        };
	        // Display
	        _this.display = function (s) {
	            return s.name;
	        };
	        // Loading wrapper
	        _this.wrapRequest = function (request, loadingLabel, delay) {
	            var args = [];
	            for (var _i = 3; _i < arguments.length; _i++) {
	                args[_i - 3] = arguments[_i];
	            }
	            _this.loadingService.load(loadingLabel, delay);
	            request.bind(_this.user).apply(void 0, args).catch(function (err) {
	                console.error(err);
	            }).then(function () {
	                _this.loadingService.done(loadingLabel);
	                _this.cdRef.markForCheck();
	            });
	            _this.cdRef.markForCheck();
	        };
	        return _this;
	    }
	    UserStructuresSection.prototype.onUserChange = function () { };
	    Object.defineProperty(UserStructuresSection.prototype, "inputFilter", {
	        get: function () {
	            return this._inputFilter;
	        },
	        set: function (filter) {
	            this._inputFilter = filter;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    //Routing
	    UserStructuresSection.prototype.routeToStructure = function (structureId) {
	        //[routerLink]="['/admin', structure.id, 'users']" [queryParams]="{userId: user.id, refresh: 1}"
	        this.router.navigate(['/admin', structureId, 'users', this.user.id]);
	    };
	    return UserStructuresSection;
	}(abstract_section_1.AbstractSection));
	__decorate([
	    core_1.ViewChild("codeInput"),
	    __metadata("design:type", forms_1.AbstractControl)
	], UserStructuresSection.prototype, "codeInput", void 0);
	UserStructuresSection = __decorate([
	    core_1.Component({
	        selector: 'user-structures-section',
	        template: "\n        <panel-section section-title=\"users.details.section.structures\" [folded]=\"true\">\n            <button (click)=\"showStructuresLightbox = true\">\n                <s5l>add.structure</s5l><i class=\"fa fa-plus-circle\"></i>\n            </button>\n            <light-box class=\"inner-list\"\n                    [show]=\"showStructuresLightbox\" (onClose)=\"showStructuresLightbox = false\">\n                <div class=\"padded\">\n                    <h3><s5l>add.structure</s5l></h3>\n                    <list-component class=\"inner-list\"\n                        [model]=\"structureCollection.data\"\n                        [inputFilter]=\"filterByInput\"\n                        [filters]=\"filterStructures\"\n                        searchPlaceholder=\"search.structure\"\n                        sort=\"name\"\n                        [display]=\"display\"\n                        (inputChange)=\"inputFilter = $event\"\n                        [isDisabled]=\"disableStructure\"\n                        (onSelect)=\"wrapRequest(user?.addStructure, $event.id, 0, $event.id)\">\n                    </list-component>\n                </div>\n            </light-box>\n            <ul class=\"actions-list\">\n                <li *ngFor=\"let structure of user?.structures\">\n                    <a class=\"action\" [routerLink]=\"['/admin', structure.id, 'users', user.id]\">\n                        {{ structure.name }}\n                    </a>\n                    <i  class=\"fa fa-times action\" (click)=\"wrapRequest(user?.removeStructure, structure.id, 0, structure.id)\"\n                        [tooltip]=\"'delete.this.structure' | translate\"\n                        [ngClass]=\"{ disabled: loadingService.isLoading(structure.id)}\"></i>\n                </li>\n            </ul>\n        </panel-section>\n    ",
	        inputs: ['user', 'structure']
	    }),
	    __metadata("design:paramtypes", [services_1.UserListService,
	        router_1.Router,
	        services_1.LoadingService,
	        core_1.ChangeDetectorRef])
	], UserStructuresSection);
	exports.UserStructuresSection = UserStructuresSection;


/***/ },

/***/ 446:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var dist_1 = __webpack_require__(56);
	var userlist_filters_service_1 = __webpack_require__(431);
	var router_1 = __webpack_require__(22);
	var users_data_service_1 = __webpack_require__(432);
	var UserFilters = (function () {
	    function UserFilters(bundles, cdRef, route, dataService, listFilters) {
	        var _this = this;
	        this.bundles = bundles;
	        this.cdRef = cdRef;
	        this.route = route;
	        this.dataService = dataService;
	        this.listFilters = listFilters;
	        this.structure = this.dataService.structure;
	        this.translateFunction = function (key) {
	            return _this.bundles.translate(key);
	        };
	    }
	    UserFilters.prototype.ngOnInit = function () {
	        var _this = this;
	        this.dataSubscriber = this.dataService.onchange.subscribe(function () {
	            _this.cdRef.markForCheck();
	        });
	    };
	    UserFilters.prototype.ngOnDestroy = function () {
	        this.dataSubscriber.unsubscribe();
	    };
	    UserFilters.prototype.orderer = function (a) {
	        return a;
	    };
	    UserFilters.prototype.deselect = function (filter, item) {
	        filter.outputModel.splice(filter.outputModel.indexOf(item), 1);
	    };
	    return UserFilters;
	}());
	UserFilters = __decorate([
	    core_1.Component({
	        selector: 'user-filters',
	        template: "\n        <div class=\"panel-header\">\n            <i class=\"fa fa-filter\"></i>\n            <span><s5l>filters</s5l></span>\n        </div>\n        <div class=\"padded\">\n            <div *ngFor=\"let filter of listFilters.filters\">\n                <div *ngIf=\"filter.comboModel.length > 0\">\n                    <multi-combo\n                        [comboModel]=\"filter.comboModel\"\n                        [(outputModel)]=\"filter.outputModel\"\n                        [title]=\"filter.label | translate\"\n                        [display]=\"filter.display || translateFunction\"\n                        [orderBy]=\"filter.order || orderer\"\n                        [filter]=\"filter.filterProp\"\n                    ></multi-combo>\n                    <div class=\"multi-combo-companion\">\n                        <div *ngFor=\"let item of filter.outputModel\" (click)=\"deselect(filter, item)\">\n                            <span *ngIf=\"filter.display\">\n                                {{ item[filter.display] }}\n                            </span>\n                            <span *ngIf=\"!filter.display\">\n                                {{ item | translate }}\n                            </span>\n                            <i class=\"fa fa-trash\"></i>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    ",
	        changeDetection: core_1.ChangeDetectionStrategy.OnPush
	    }),
	    __metadata("design:paramtypes", [dist_1.BundlesService,
	        core_1.ChangeDetectorRef,
	        router_1.ActivatedRoute,
	        users_data_service_1.UsersDataService,
	        userlist_filters_service_1.UserlistFiltersService])
	], UserFilters);
	exports.UserFilters = UserFilters;


/***/ },

/***/ 447:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var UserCreate = (function () {
	    function UserCreate() {
	    }
	    return UserCreate;
	}());
	UserCreate = __decorate([
	    core_1.Component({
	        selector: 'user-create',
	        template: "\n        <div class=\"panel-header\">\n            <i class=\"fa\">+</i>\n            <span><s5l>new.user.creation</s5l></span>\n        </div>\n    ",
	        changeDetection: core_1.ChangeDetectionStrategy.OnPush
	    }),
	    __metadata("design:paramtypes", [])
	], UserCreate);
	exports.UserCreate = UserCreate;


/***/ },

/***/ 448:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var UserError = (function () {
	    function UserError() {
	    }
	    return UserError;
	}());
	UserError = __decorate([
	    core_1.Component({
	        selector: 'user-error',
	        template: "\n        <div class=\"panel-header\">\n            <i class=\"fa fa-warning\"></i>\n            <span><s5l>user.root.error</s5l></span>\n        </div>\n        <div class=\"padded\">\n            <s5l>user.root.error.text</s5l>\n            <div class=\"error-tech\"  *ngIf=\"error\">\n                <span>\n                    {{ error?.stack || error }}\n                </span>\n            </div>\n        </div>\n    ",
	        changeDetection: core_1.ChangeDetectionStrategy.OnPush
	    }),
	    __metadata("design:paramtypes", [])
	], UserError);
	exports.UserError = UserError;


/***/ },

/***/ 449:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(450));
	__export(__webpack_require__(452));
	__export(__webpack_require__(453));
	__export(__webpack_require__(454));
	__export(__webpack_require__(455));
	__export(__webpack_require__(456));


/***/ },

/***/ 450:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var router_1 = __webpack_require__(22);
	var services_1 = __webpack_require__(124);
	var groups_data_service_1 = __webpack_require__(451);
	var GroupsRoot = (function () {
	    function GroupsRoot(route, router, cdRef, dataService, loadingService) {
	        this.route = route;
	        this.router = router;
	        this.cdRef = cdRef;
	        this.dataService = dataService;
	        this.loadingService = loadingService;
	        // Tabs
	        this.tabs = [
	            { label: "manual.groups", view: "manual" },
	            { label: "profile.groups", view: "profile" },
	            { label: "functional.groups", view: "functional" }
	        ];
	    }
	    GroupsRoot.prototype.ngOnInit = function () {
	        var _this = this;
	        // Watch selected structure
	        this.structureSubscriber = this.route.parent.data.subscribe(function (data) {
	            _this.dataService.structure = data['structure'];
	            if (!_this.dataService.structure.groups.data.length) {
	                _this.loadingService.load('portal-content');
	                _this.dataService.structure.groups.sync().catch(function (e) {
	                    _this.onError(e);
	                }).then(function () {
	                    _this.loadingService.done('portal-content');
	                    _this.cdRef.markForCheck();
	                });
	            }
	            _this.cdRef.markForCheck();
	        });
	    };
	    GroupsRoot.prototype.ngOnDestroy = function () {
	        this.structureSubscriber.unsubscribe();
	    };
	    GroupsRoot.prototype.onError = function (error) {
	        console.error(error);
	        this.error = error;
	    };
	    return GroupsRoot;
	}());
	GroupsRoot = __decorate([
	    core_1.Component({
	        selector: 'groups-root',
	        template: "\n        <div class=\"tabs\">\n            <button class=\"tab\" *ngFor=\"let tab of tabs\"\n                [routerLink]=\"tab.view\"\n                routerLinkActive=\"active\">\n                {{ tab.label | translate }}\n            </button>\n        </div>\n        <h1>\n            <i class=\"fa fa-users\"></i>\n            <s5l>groups</s5l>\n        </h1>\n\n        <router-outlet></router-outlet>\n    ",
	        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
	        providers: [groups_data_service_1.GroupsDataService]
	    }),
	    __metadata("design:paramtypes", [router_1.ActivatedRoute,
	        router_1.Router,
	        core_1.ChangeDetectorRef,
	        groups_data_service_1.GroupsDataService,
	        services_1.LoadingService])
	], GroupsRoot);
	exports.GroupsRoot = GroupsRoot;


/***/ },

/***/ 451:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var abstract_data_service_1 = __webpack_require__(433);
	var GroupsDataService = (function (_super) {
	    __extends(GroupsDataService, _super);
	    function GroupsDataService() {
	        return _super.call(this, ['structure', 'group']) || this;
	    }
	    return GroupsDataService;
	}(abstract_data_service_1.AbstractDataService));
	exports.GroupsDataService = GroupsDataService;


/***/ },

/***/ 452:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var groups_data_service_1 = __webpack_require__(451);
	var ManualGroups = (function () {
	    function ManualGroups(dataService) {
	        this.dataService = dataService;
	    }
	    ManualGroups.prototype.ngOnInit = function () { };
	    ManualGroups.prototype.ngOnDestroy = function () { };
	    return ManualGroups;
	}());
	ManualGroups = __decorate([
	    core_1.Component({
	        selector: 'manual-groups',
	        template: "\n        <groups-view groupType=\"ManualGroup\" viewName=\"manual\"\n                     [groups]=\"dataService.structure.groups.data\" [(selectedGroup)]=\"dataService.group\">\n            <div class=\"padded\">\n                <group-users-list [groups]=\"groups\" [selectedGroup]=\"dataService.group\">\n                    <em>{{ dataService.group?.users?.length }} {{ 'members' | translate | lowercase }}</em>\n                </group-users-list>\n            </div>\n        </groups-view>\n    "
	    }),
	    __metadata("design:paramtypes", [groups_data_service_1.GroupsDataService])
	], ManualGroups);
	exports.ManualGroups = ManualGroups;


/***/ },

/***/ 453:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var groups_data_service_1 = __webpack_require__(451);
	var FunctionalGroups = (function () {
	    function FunctionalGroups(dataService) {
	        this.dataService = dataService;
	    }
	    FunctionalGroups.prototype.ngOnInit = function () { };
	    FunctionalGroups.prototype.ngOnDestroy = function () { };
	    return FunctionalGroups;
	}());
	FunctionalGroups = __decorate([
	    core_1.Component({
	        selector: 'functional-groups',
	        template: "\n        <groups-view groupType=\"FunctionalGroup\" viewName=\"functional\"\n                     [groups]=\"dataService.structure.groups.data\" [(selectedGroup)]=\"dataService.group\">\n            <div class=\"padded\">\n                <group-users-list [groups]=\"groups\" [selectedGroup]=\"dataService.group\">\n                </group-users-list>\n            </div>\n        </groups-view>\n    "
	    }),
	    __metadata("design:paramtypes", [groups_data_service_1.GroupsDataService])
	], FunctionalGroups);
	exports.FunctionalGroups = FunctionalGroups;


/***/ },

/***/ 454:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var groups_data_service_1 = __webpack_require__(451);
	var ProfileGroups = (function () {
	    function ProfileGroups(dataService) {
	        this.dataService = dataService;
	    }
	    ProfileGroups.prototype.ngOnInit = function () { };
	    ProfileGroups.prototype.ngOnDestroy = function () { };
	    return ProfileGroups;
	}());
	ProfileGroups = __decorate([
	    core_1.Component({
	        selector: 'profile-groups',
	        template: "\n        <groups-view groupType=\"ProfileGroup\" viewName=\"profile\"\n                     [groups]=\"dataService.structure.groups.data\" [(selectedGroup)]=\"dataService.group\">\n            <div class=\"padded\">\n                <group-users-list [groups]=\"groups\" [selectedGroup]=\"dataService.group\">\n                </group-users-list>\n            </div>\n        </groups-view>\n    "
	    }),
	    __metadata("design:paramtypes", [groups_data_service_1.GroupsDataService])
	], ProfileGroups);
	exports.ProfileGroups = ProfileGroups;


/***/ },

/***/ 455:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var router_1 = __webpack_require__(22);
	var services_1 = __webpack_require__(124);
	var GroupView = (function () {
	    function GroupView(route, router, cdRef, loadingService) {
	        var _this = this;
	        this.route = route;
	        this.router = router;
	        this.cdRef = cdRef;
	        this.loadingService = loadingService;
	        this.onselect = new core_1.EventEmitter();
	        this.isSelected = function (group) {
	            return _this.selectedGroup === group;
	        };
	        this.filterByInput = function (group) {
	            if (!_this.groupInputFilter)
	                return true;
	            return group.name.toLowerCase()
	                .indexOf(_this.groupInputFilter.toLowerCase()) >= 0;
	        };
	        this.display = function (group) { return group.name; };
	    }
	    Object.defineProperty(GroupView.prototype, "selectedGroup", {
	        get: function () { return this._selectedGroup; },
	        set: function (g) {
	            if (g) {
	                if (g !== this._selectedGroup) {
	                    this._selectedGroup = g;
	                    this.onselect.emit(g);
	                }
	            }
	            else {
	                this._selectedGroup = null;
	                this.showCompanion = false;
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    GroupView.prototype.selectGroupByid = function (id) {
	        this.selectedGroup = this.groups.find(function (g) { return g.id === id; });
	        this.cdRef.markForCheck();
	    };
	    GroupView.prototype.ngOnInit = function () {
	        var _this = this;
	        this.querySubscriber = this.route.queryParams.subscribe(function (params) {
	            if (params['groupId']) {
	                _this.selectGroupByid(params['groupId']);
	                _this.openGroup();
	            }
	        });
	    };
	    GroupView.prototype.ngOnDestroy = function () {
	        this.querySubscriber.unsubscribe();
	    };
	    GroupView.prototype.routeToGroup = function (g) {
	        this.router.navigate(['.'], {
	            queryParams: { groupId: g.id },
	            relativeTo: this.route
	        });
	    };
	    GroupView.prototype.openGroup = function () {
	        var _this = this;
	        this.loadingService.load('groups-content');
	        this.selectedGroup.syncUsers().then(function () {
	            _this.showCompanion = true;
	        }).catch(function (err) {
	            console.error(err);
	        }).then(function () {
	            _this.loadingService.done('groups-content');
	            _this.cdRef.markForCheck();
	        });
	        this.cdRef.markForCheck();
	    };
	    return GroupView;
	}());
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", String)
	], GroupView.prototype, "groupType", void 0);
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", String)
	], GroupView.prototype, "viewName", void 0);
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", Array)
	], GroupView.prototype, "groups", void 0);
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", Object),
	    __metadata("design:paramtypes", [])
	], GroupView.prototype, "selectedGroup", null);
	__decorate([
	    core_1.Output("selectedGroupChange"),
	    __metadata("design:type", core_1.EventEmitter)
	], GroupView.prototype, "onselect", void 0);
	GroupView = __decorate([
	    core_1.Component({
	        selector: 'groups-view',
	        template: "\n        <side-layout (closeCompanion)=\"showCompanion = false\" [showCompanion]=\"showCompanion\">\n            <div side-card>\n                <list-component\n                    [model]=\"groups\"\n                    [filters]=\"{type: groupType}\"\n                    [inputFilter]=\"filterByInput\"\n                    sort=\"name\"\n                    searchPlaceholder=\"search.group\"\n                    [isSelected]=\"isSelected\"\n                    [display]=\"display\"\n                    (inputChange)=\"groupInputFilter = $event\"\n                    (onSelect)=\"routeToGroup($event)\">\n                </list-component>\n            </div>\n            <div side-companion>\n                <spinner-cube class=\"component-spinner\" waitingFor=\"groups-content\"></spinner-cube>\n\n                <div class=\"panel-header\">\n                    <i class=\"fa fa-users\"></i>\n                    <span><s5l>members.of.group</s5l>:</span><span>{{ selectedGroup?.name }}</span>\n                </div>\n\n                <div>\n                    <ng-content></ng-content>\n                </div>\n            </div>\n        </side-layout>\n    ",
	        changeDetection: core_1.ChangeDetectionStrategy.OnPush
	    }),
	    __metadata("design:paramtypes", [router_1.ActivatedRoute,
	        router_1.Router,
	        core_1.ChangeDetectorRef,
	        services_1.LoadingService])
	], GroupView);
	exports.GroupView = GroupView;


/***/ },

/***/ 456:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var group_1 = __webpack_require__(122);
	var router_1 = __webpack_require__(22);
	var dist_1 = __webpack_require__(56);
	var services_1 = __webpack_require__(124);
	var GroupUsersList = (function () {
	    function GroupUsersList(route, router, cdRef, bundles, loadingService, userListService) {
	        var _this = this;
	        this.route = route;
	        this.router = router;
	        this.cdRef = cdRef;
	        this.bundles = bundles;
	        this.loadingService = loadingService;
	        this.userListService = userListService;
	        this.display = function (user) {
	            var result = user.lastName + " " + user.firstName + " - " + _this.bundles.translate(user.profile);
	            if (user.structures.length === 1) {
	                result += " - " + user.structures[0].name;
	            }
	            else if (user.structures.length > 1) {
	                result += " - " + _this.bundles.translate('structure.or.more', {
	                    head: user.structures[0].name,
	                    rest: user.structures.length - 1
	                });
	            }
	            return result;
	        };
	    }
	    //protected isSelected = (user: GroupUser) => this.selectedUser === user
	    GroupUsersList.prototype.selectUser = function (user) {
	        if (user.structures.length > 0) {
	            this.router.navigate(['admin', user.structures[0].id, 'users', user.id]);
	        }
	    };
	    return GroupUsersList;
	}());
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", Array)
	], GroupUsersList.prototype, "groups", void 0);
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", group_1.Group)
	], GroupUsersList.prototype, "selectedGroup", void 0);
	GroupUsersList = __decorate([
	    core_1.Component({
	        selector: 'group-users-list',
	        template: "\n        <list-component\n            [model]=\"selectedGroup?.users\"\n            [inputFilter]=\"userListService.filterByInput\"\n            [sort]=\"userListService.sorts\"\n            searchPlaceholder=\"search.user\"\n            [display]=\"display\"\n            (inputChange)=\"userListService.inputFilter = $event\"\n            (onSelect)=\"selectUser($event)\">\n            <div toolbar>\n                <i class=\"fa\" aria-hidden=\"true\"\n                [ngClass]=\"{\n                    'fa-sort-alpha-asc': userListService.sortsMap.alphabetical.sort === '+',\n                    'fa-sort-alpha-desc': userListService.sortsMap.alphabetical.sort === '-',\n                    'selected': userListService.sortsMap.alphabetical.selected\n                }\"\n                [tooltip]=\"'sort.alphabetical' | translate\" position=\"top\"\n                (click)=\"userListService.changeSorts('alphabetical')\"></i>\n                <i class=\"fa\" aria-hidden=\"true\"\n                    [ngClass]=\"{\n                        'fa-sort-amount-asc': userListService.sortsMap.profile.sort === '+',\n                        'fa-sort-amount-desc': userListService.sortsMap.profile.sort === '-',\n                        'selected': userListService.sortsMap.profile.selected\n                    }\"\n                    [tooltip]=\"'sort.profile' | translate\" position=\"top\"\n                    (click)=\"userListService.changeSorts('profile')\"></i>\n                <ng-content></ng-content>\n            </div>\n        </list-component>\n    ",
	        styles: [""],
	        providers: [services_1.UserListService]
	    }),
	    __metadata("design:paramtypes", [router_1.ActivatedRoute,
	        router_1.Router,
	        core_1.ChangeDetectorRef,
	        dist_1.BundlesService,
	        services_1.LoadingService,
	        services_1.UserListService])
	], GroupUsersList);
	exports.GroupUsersList = GroupUsersList;


/***/ },

/***/ 457:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(458));
	__export(__webpack_require__(459));
	__export(__webpack_require__(460));
	__export(__webpack_require__(462));
	__export(__webpack_require__(463));
	__export(__webpack_require__(464));


/***/ },

/***/ 458:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var loading_service_1 = __webpack_require__(125);
	var SpinnerComponent = (function () {
	    function SpinnerComponent(loadingService, cdRef) {
	        this.loadingService = loadingService;
	        this.cdRef = cdRef;
	    }
	    Object.defineProperty(SpinnerComponent.prototype, "loadingProp", {
	        get: function () { return this._loadingProp; },
	        set: function (prop) {
	            this._loadingProp = prop;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SpinnerComponent.prototype.ngOnInit = function () {
	        var _this = this;
	        this.subscription = this.loadingService.trigger.subscribe(function () {
	            _this.cdRef.markForCheck();
	        });
	    };
	    SpinnerComponent.prototype.ngOnDestroy = function () {
	        if (this.subscription)
	            this.subscription.unsubscribe();
	    };
	    return SpinnerComponent;
	}());
	__decorate([
	    core_1.Input("waitingFor"),
	    __metadata("design:type", String),
	    __metadata("design:paramtypes", [String])
	], SpinnerComponent.prototype, "loadingProp", null);
	SpinnerComponent = __decorate([
	    core_1.Component({
	        selector: 'spinner-cube',
	        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
	        template: "\n    <div class=\"spinner-wrapper\" *ngIf=\"loadingService.isLoading(loadingProp)\">\n        <div class=\"spinner-cube\">\n            <div class=\"sk-cube sk-cube1\"></div>\n            <div class=\"sk-cube sk-cube2\"></div>\n            <div class=\"sk-cube sk-cube3\"></div>\n            <div class=\"sk-cube sk-cube4\"></div>\n            <div class=\"sk-cube sk-cube5\"></div>\n            <div class=\"sk-cube sk-cube6\"></div>\n            <div class=\"sk-cube sk-cube7\"></div>\n            <div class=\"sk-cube sk-cube8\"></div>\n            <div class=\"sk-cube sk-cube9\"></div>\n        </div>\n    </div>\n    ",
	        styles: ["\n        div.spinner-wrapper{\n            position: fixed;\n            width: 100%;\n            height: 100%;\n            pointer-events: all;\n            display: flex;\n            justify-content: center;\n            align-items: center;\n        }\n\n        div.spinner-cube {\n            width: 20vh;\n            height: 20vh;\n        }\n\n        div.sk-cube {\n            width: 33%;\n            height: 33%;\n            float: left;\n            -webkit-animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;\n            animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;\n        }\n\n        div.sk-cube1 {\n            -webkit-animation-delay: 0.2s;\n            animation-delay: 0.2s;\n        }\n        div.sk-cube2 {\n            -webkit-animation-delay: 0.3s;\n            animation-delay: 0.3s;\n        }\n        div.sk-cube3 {\n            -webkit-animation-delay: 0.4s;\n            animation-delay: 0.4s;\n        }\n        div.sk-cube4 {\n            -webkit-animation-delay: 0.1s;\n            animation-delay: 0.1s;\n        }\n        div.sk-cube5 {\n            -webkit-animation-delay: 0.2s;\n            animation-delay: 0.2s;\n        }\n        div.sk-cube6 {\n            -webkit-animation-delay: 0.3s;\n            animation-delay: 0.3s;\n        }\n        div.sk-cube7 {\n            -webkit-animation-delay: 0s;\n            animation-delay: 0s;\n        }\n        div.sk-cube8 {\n            -webkit-animation-delay: 0.1s;\n            animation-delay: 0.1s;\n        }\n        div.sk-cube9 {\n            -webkit-animation-delay: 0.2s;\n            animation-delay: 0.2s;\n        }\n\n        @-webkit-keyframes sk-cubeGridScaleDelay {\n            0%, 70%, 100% {\n                -webkit-transform: scale3D(1, 1, 1);\n                        transform: scale3D(1, 1, 1);\n            } 35% {\n                -webkit-transform: scale3D(0, 0, 1);\n                        transform: scale3D(0, 0, 1);\n            }\n        }\n\n        @keyframes sk-cubeGridScaleDelay {\n            0%, 70%, 100% {\n                -webkit-transform: scale3D(1, 1, 1);\n                        transform: scale3D(1, 1, 1);\n            } 35% {\n                -webkit-transform: scale3D(0, 0, 1);\n                        transform: scale3D(0, 0, 1);\n            }\n        }\n    "]
	    }),
	    __metadata("design:paramtypes", [loading_service_1.LoadingService,
	        core_1.ChangeDetectorRef])
	], SpinnerComponent);
	exports.SpinnerComponent = SpinnerComponent;


/***/ },

/***/ 459:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var SideLayout = (function () {
	    function SideLayout() {
	        this.showCompanion = false;
	        this.close = new core_1.EventEmitter();
	    }
	    return SideLayout;
	}());
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", Boolean)
	], SideLayout.prototype, "showCompanion", void 0);
	__decorate([
	    core_1.Output("closeCompanion"),
	    __metadata("design:type", core_1.EventEmitter)
	], SideLayout.prototype, "close", void 0);
	SideLayout = __decorate([
	    core_1.Component({
	        selector: 'side-layout',
	        template: "\n        <div class=\"side-layout\">\n            <div class=\"side-card\">\n                <ng-content select=\"[side-card]\"></ng-content>\n            </div>\n            <div class=\"side-companion\" *ngIf=\"showCompanion\">\n                <ng-content select=\"[side-companion]\"></ng-content>\n                <i class=\"fa fa-times action top-right\" (click)=\"close.emit()\"></i>\n            </div>\n        </div>\n    ",
	        styles: ["\n        div.side-layout {\n            display: flex;\n            flex-wrap: nowrap;\n            align-items: flex-start;\n        }\n\n        div.side-card {\n            flex: 400px 0 0;\n            position: relative;\n        }\n\n        div.side-companion {\n            flex: 1;\n            position: relative;\n            margin-left: 25px;\n        }\n    "]
	    }),
	    __metadata("design:paramtypes", [])
	], SideLayout);
	exports.SideLayout = SideLayout;


/***/ },

/***/ 460:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var ListComponent = (function () {
	    function ListComponent(cdRef) {
	        this.cdRef = cdRef;
	        this.model = [];
	        this.searchPlaceholder = "search";
	        this.isSelected = function () { return false; };
	        this.isDisabled = function () { return false; };
	        this.display = function (item) { return item; };
	        this.inputChange = new core_1.EventEmitter();
	        this.onSelect = new core_1.EventEmitter();
	    }
	    ListComponent.prototype.ngAfterViewInit = function () {
	        this.cdRef.markForCheck();
	        this.cdRef.detectChanges();
	    };
	    return ListComponent;
	}());
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", Object)
	], ListComponent.prototype, "model", void 0);
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", Object)
	], ListComponent.prototype, "filters", void 0);
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", Object)
	], ListComponent.prototype, "inputFilter", void 0);
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", Object)
	], ListComponent.prototype, "sort", void 0);
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", Number)
	], ListComponent.prototype, "limit", void 0);
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", Object)
	], ListComponent.prototype, "searchPlaceholder", void 0);
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", Object)
	], ListComponent.prototype, "isSelected", void 0);
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", Object)
	], ListComponent.prototype, "isDisabled", void 0);
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", Object)
	], ListComponent.prototype, "display", void 0);
	__decorate([
	    core_1.Output("inputChange"),
	    __metadata("design:type", core_1.EventEmitter)
	], ListComponent.prototype, "inputChange", void 0);
	__decorate([
	    core_1.Output("onSelect"),
	    __metadata("design:type", core_1.EventEmitter)
	], ListComponent.prototype, "onSelect", void 0);
	ListComponent = __decorate([
	    core_1.Component({
	        selector: 'list-component',
	        templateUrl: __webpack_require__(461),
	        styles: ["\n        ul {\n            margin: 0;\n            padding: 0px;\n            font-size: 0.9em;\n        }\n\n        ul li {\n            cursor: pointer;\n            border-top: 1px solid #ddd;\n            padding: 5px 10px;\n        }\n\n        ul li.disabled {\n            pointer-events: none;\n        }\n    "]
	    }),
	    __metadata("design:paramtypes", [core_1.ChangeDetectorRef])
	], ListComponent);
	exports.ListComponent = ListComponent;


/***/ },

/***/ 461:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "templates/list-component.html";

/***/ },

/***/ 462:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var FormField = (function () {
	    function FormField() {
	    }
	    return FormField;
	}());
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", String)
	], FormField.prototype, "label", void 0);
	FormField = __decorate([
	    core_1.Component({
	        selector: 'form-field',
	        template: "\n        <div class=\"form-field\">\n            <label>{{ label | translate }}</label>\n            <ng-content></ng-content>\n        </div>\n    ",
	        styles: ["\n        div.form-field { display: flex; }\n        div.form-field >>> > * { flex: 1; }\n        div.form-field > *:first-child { flex: 0 0 200px; }\n    "]
	    }),
	    __metadata("design:paramtypes", [])
	], FormField);
	exports.FormField = FormField;


/***/ },

/***/ 463:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var PanelSection = (function () {
	    function PanelSection() {
	        this.folded = null;
	    }
	    return PanelSection;
	}());
	__decorate([
	    core_1.Input("section-title"),
	    __metadata("design:type", String)
	], PanelSection.prototype, "sectionTitle", void 0);
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", Boolean)
	], PanelSection.prototype, "folded", void 0);
	PanelSection = __decorate([
	    core_1.Component({
	        selector: 'panel-section',
	        template: "\n        <section class=\"panel-section\">\n            <div class=\"panel-section-header\" (click)=\"folded !== null ? folded=!folded : null\" [class.foldable]=\"folded !== null\">\n                {{ sectionTitle | translate }}\n                <i class=\"opener\" *ngIf=\"folded !== null\"\n                    [class.opened]=\"!folded\"></i>\n            </div>\n            <div class=\"panel-section-content\" *ngIf=\"!folded\">\n                <ng-content></ng-content>\n            </div>\n        </section>\n    ",
	        styles: ["\n        .panel-section {}\n        .panel-section-header {\n            font-size: 1.1em;\n            padding: 5px 10px;\n        }\n        .panel-section-header.foldable {\n            cursor: pointer;\n        }\n        .panel-section-content {\n            padding: 15px;\n        }\n    "]
	    }),
	    __metadata("design:paramtypes", [])
	], PanelSection);
	exports.PanelSection = PanelSection;


/***/ },

/***/ 464:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var forms_1 = __webpack_require__(54);
	var FormErrors = (function () {
	    function FormErrors() {
	    }
	    FormErrors.prototype.getErrorsArray = function () {
	        var errorsArray = [];
	        for (var prop in this.ref.errors) {
	            errorsArray.push({ name: prop, value: this.ref.errors[prop] });
	        }
	        return errorsArray;
	    };
	    return FormErrors;
	}());
	__decorate([
	    core_1.Input("control"),
	    __metadata("design:type", forms_1.AbstractControl)
	], FormErrors.prototype, "ref", void 0);
	FormErrors = __decorate([
	    core_1.Component({
	        selector: 'form-errors',
	        template: "\n        <div *ngIf=\"ref && ref.errors && (ref.dirty || ref.touched)\" class=\"form-errors\">\n            <div *ngFor=\"let error of getErrorsArray()\">\n                <span>{{ 'form.error.' + error.name | translate:error.value }}</span>\n            </div>\n        </div>\n    ",
	        styles: ["\n        .form-errors {\n            font-size: 0.8em;\n            color: crimson;\n            font-style: italic;\n        }\n    "]
	    }),
	    __metadata("design:paramtypes", [])
	], FormErrors);
	exports.FormErrors = FormErrors;


/***/ },

/***/ 465:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var components = __webpack_require__(416);
	var routing = __webpack_require__(69);
	var services = __webpack_require__(124);
	exports.declarations = [];
	exports.providers = [];
	for (var component in components) {
	    exports.declarations.push(components[component]);
	}
	for (var routingService in routing) {
	    if (routingService !== 'routes') {
	        exports.providers.push(routing[routingService]);
	    }
	}
	for (var service in services) {
	    exports.providers.push(services[service]);
	}


/***/ }

});
//# sourceMappingURL=admin.js.map