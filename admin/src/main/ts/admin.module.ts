import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'

import { SijilModule } from 'sijil/dist'
import { InfraComponentsModule, LabelsService } from 'infra-components/dist'

import { AdminRoot, Portal, Home, UsersRoot, SideLayout, ListComponent, FormField,
    StructureHome, UserList, UserDetail, UserCreate, UserFilters, UserError, SpinnerComponent,
    PanelSection } from './components'
import { routes, UsersResolve, SessionResolve, I18nResolve, StructuresResolve, StructureResolve } from './routing'
import { LoadingService, SijilLabelsService } from './services'

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        SijilModule,
        InfraComponentsModule.forRoot({
            'LabelsService': {
                provide: LabelsService,
                useExisting: SijilLabelsService
            }
        }),
        RouterModule.forRoot(routes)
    ],
    declarations: [
        AdminRoot,
        Portal,
        Home,
        UsersRoot,
        UserList,
        UserDetail,
        UserFilters,
        UserCreate,
        UserError,
        StructureHome,
        SideLayout,
        ListComponent,
        SpinnerComponent,
        PanelSection,
        FormField
    ],
    providers: [
        UsersResolve,
        SessionResolve,
        StructuresResolve,
        StructureResolve,
        I18nResolve,
        LoadingService,
        SijilLabelsService
    ],
    bootstrap: [ AdminRoot ]
})
export class AdminModule {}
