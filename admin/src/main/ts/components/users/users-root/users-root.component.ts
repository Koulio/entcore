import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy,
    ViewChild } from '@angular/core'
import { ActivatedRoute, Router, Params, Data, NavigationEnd } from '@angular/router'
import { Subscription } from 'rxjs'

import { UserModel } from '../../../models'
import { StructureModel, structureCollection } from '../../../models'
import { LoadingService } from '../../../services'
import { UserList } from '../user-list/user-list.component'
import { UserlistFiltersService } from '../../../services/users/userlist.filters.service'
import { UsersDataService } from '../../../services/users/users.data.service'

@Component({
    selector: 'users-root',
    template: `
        <h1><i class="fa fa-user"></i><s5l>users.title</s5l></h1>
        <side-layout (closeCompanion)="closeCompanion()"
                [showCompanion]="!router.isActive('/admin/' + dataService.structure?.id + '/users', true)">
            <div side-card>
                <div class="round-button top-right-button"
                    (click)="openCreationView()"
                    [class.selected]="router.isActive('/admin/' + dataService.structure?.id + '/users/create', true)"
                    [tooltip]="'create.user' | translate" position="top">+</div>
                <user-list [userlist]="dataService.structure.users.data"
                    (listCompanionChange)="openCompanionView($event)"
                    [selectedUser]="dataService.user"
                    (selectedUserChange)="openUserDetail($event)"></user-list>
            </div>
            <div side-companion>
                <router-outlet></router-outlet>
            </div>
        </side-layout>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [UserlistFiltersService, UsersDataService]
})
export class UsersRoot implements OnInit, OnDestroy {

    constructor(private route: ActivatedRoute,
        private router: Router,
        private cdRef: ChangeDetectorRef,
        private dataService: UsersDataService,
        private filtersService: UserlistFiltersService,
        private ls: LoadingService){}

    // Subscriptions
    private structureSubscriber : Subscription
    private routerSubscriber : Subscription

    ngOnInit(): void {
        this.structureSubscriber = this.route.parent.data.subscribe((data: Data) => {
            let structure: StructureModel = data['structure']
            this.dataService.structure = structure
            this.filtersService.resetFilters()
            this.filtersService.setClasses(structure.classes)
            this.cdRef.markForCheck()
        })

        this.routerSubscriber = this.router.events.subscribe(e => {
            if(e instanceof NavigationEnd)
                this.cdRef.markForCheck()
        })
    }

    ngOnDestroy(): void {
        this.structureSubscriber.unsubscribe()
        this.routerSubscriber.unsubscribe()
    }

    closeCompanion() {
        this.router.navigate(['../users'], {relativeTo: this.route }).then(() => {
            this.dataService.user = null
        })
    }

    openUserDetail(user) {
        this.dataService.user = user
        this.router.navigate([user.id], {relativeTo: this.route })
    }

    openCreationView() {
        this.router.navigate(['create'], { relativeTo: this.route })
    }

    openCompanionView(view) {
        this.router.navigate([view], { relativeTo: this.route })
    }

}