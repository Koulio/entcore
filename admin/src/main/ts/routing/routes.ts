import { I18nResolve } from './i18n.resolve'
import { StructuresResolve } from './structures.resolve'
import { StructureResolve } from './structure.resolve'
import { SessionResolve } from './session.resolve'
import { UsersResolve } from './users.resolve'
import { Portal, Home, UsersRoot, StructureHome } from '../components'

export let routes = [
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
					{ path: 'users', component: UsersRoot, resolve: { userlist: UsersResolve } }
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