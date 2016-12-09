import { Routes } from '@angular/router'
import { I18nResolve } from './i18n.resolve'
import { StructuresResolve } from './structures.resolve'
import { StructureResolve } from './structure.resolve'
import { SessionResolve } from './session.resolve'
import { UsersResolve } from './users.resolve'
import { GroupsResolve } from './groups.resolve'
import { UserResolve } from './user.resolve'
import { Portal, Home, UsersRoot, GroupsRoot, StructureHome,
	UserCreate, UserDetail, UserFilters, UserError, ManualGroups,
	ProfileGroups, FunctionalGroups } from '../components'

export let routes : Routes = [
	{
		path: '',
		resolve: { session: SessionResolve, structures : StructuresResolve, i18n: I18nResolve },
		children: [
			{
				path: 'admin/:structureId',
				component: Portal,
				resolve: { structure: StructureResolve },
				children: [
					{ path: '', component: StructureHome },
					{ path: 'users', component: UsersRoot, resolve: { userlist: UsersResolve },
						children: [
							{ path: 'create', 	component: UserCreate },
							{ path: 'filter', 	component: UserFilters },
							{ path: 'error', 	component: UserError },
							{ path: ':userId', 	component: UserDetail, resolve: { user: UserResolve }}
						]
					},
					{ path: 'groups', component: GroupsRoot, resolve: { grouplist: GroupsResolve },
						 children: [
							 { path: 'manual',		component: ManualGroups },
							 { path: 'profile',		component: ProfileGroups },
							 { path: 'functional',	component: FunctionalGroups }
						 ]
					}
				]
			},
			{
				path: 'admin',
				component: Portal,
				children: [
					{ path: '', component: Home }
				]
			}
		]
	},
	{ path: '**', redirectTo: '/admin' }
]