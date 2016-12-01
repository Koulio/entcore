import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy,
    ViewChild } from '@angular/core'
import { ActivatedRoute, Router, Params, Data } from '@angular/router'
import { Subscription } from 'rxjs'

import { User } from '../../../models/mappings'
import { StructureModel, structureCollection } from '../../../models'
import { LoadingService } from '../../../services'
import { UserList } from '../user-list/user-list.component'
import { UserFilterList } from '../user-filters/user-filters.component'

@Component({
    selector: 'users-root',
    template: `
        <h1><i class="fa fa-user"></i><s5l>users.title</s5l></h1>
        <side-layout (closeCompanion)="listCompanionView = ''" [showCompanion]="listCompanionView">
            <div side-card>
                <div class="round-button top-right-button"
                    (click)="openCreationView()"
                    [class.selected]="listCompanionView === 'user-create'"
                    [tooltip]="'create.user' | translate" position="top">+</div>
                <user-list [userlist]="userlist"
                    [(listCompanion)]="listCompanionView"
                    [(selectedUser)]="selectedUser"
                    [filters]="filters"
                    #userListComponent></user-list>
            </div>
            <div side-companion>
                <user-detail [user]="selectedUser" [structure]="currentStructure"
                    *ngIf="listCompanionView === 'user-detail'"></user-detail>
                <user-filters [structure]="currentStructure" [(filters)]="rawFilters"
                    *ngIf="listCompanionView === 'user-filters'"></user-filters>
                <user-create
                    *ngIf="listCompanionView === 'user-create'"></user-create>
                <user-error
                    [error]="error"
                    *ngIf="listCompanionView === 'user-error'"></user-error>
            </div>
        </side-layout>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersRoot implements OnInit, OnDestroy {

    constructor(private route: ActivatedRoute,
        private router: Router,
        private cdRef: ChangeDetectorRef,
        private loadingService: LoadingService){}

    // Current structure
    private _currentStructure: StructureModel
    get currentStructure(){ return this._currentStructure }
    set currentStructure(structure) {
        this._currentStructure = structure
        this._rawFilters = null
        this.filters = {}
    }
    // User list & selection
    private userlist: User[] = []
    private _selectedUser: User
    get selectedUser() : User { return this._selectedUser}
    set selectedUser(user: User) {
        if(user && user !== this._selectedUser) {
            this._selectedUser = user
            this.openUserDetail()
            this.router.navigate(['../users'], {
                    queryParams: { userId: this.selectedUser.id },
                    relativeTo: this.route })
        } else if(user === this._selectedUser) {
            this.listCompanionView = 'user-detail'
        } else if(!user) {
            this.listCompanionView = ''
            this.cdRef.markForCheck()
        }
    }
    private setUserById(id: string) {
        if(!this.selectedUser || id !== this.selectedUser.id)
            this.selectedUser = this.userlist.find(user => user.id === id)
        else if(this.listCompanionView !== 'user-detail') {
            this.listCompanionView = 'user-detail'
            this.cdRef.markForCheck()
        }
    }

    // User list filters
    private _rawFilters : UserFilterList<any>
    get rawFilters(){ return this._rawFilters }
    set rawFilters(filters : UserFilterList<any>) {
        this._rawFilters = filters

        let formattedFilters = {}
        for(let i = 0; i < filters.length; i++) {
            let filter = filters[i]
            formattedFilters[filter.type] = filter.filter
        }
        this.filters = formattedFilters
    }
    private filters : {}

    // Components
    @ViewChild("userListComponent") private userListComponent : UserList
    private listCompanionView: string = ''

    // Route parameters subscriptions
    private structureSubscriber: Subscription
    private querySubscriber : Subscription

    ngOnInit(): void {
        this.userlist = this.route.snapshot.data['userlist']

        // Watch selected structure
        this.structureSubscriber = this.route.parent.data.subscribe((data: Data) => {
            this.currentStructure = data['structure']
            if (this.currentStructure.users.data.length > 0) {
                this.userlist = this.currentStructure.users.data
            } else {
                this.loadingService.load('portal-content')
                this.currentStructure.users.sync().then(() => {
                    this.userlist = this.currentStructure.users.data
                }).catch(e => {
                    this.onError(e)
                }).then(() => {
                    this.loadingService.done('portal-content')
                    this.cdRef.markForCheck()
                })
            }
            this.userListComponent.resetLimit()
            this.selectedUser = null
            this.cdRef.markForCheck()
        })

        // Watch query parameters
        this.querySubscriber = this.route.queryParams.subscribe((params: Params) => {
            if(params['userId']){
                this.setUserById(params['userId'])
            } else {
                this.selectedUser = null
            }

            if(params['createUser']){
                this.openCreationView()
            }
        })
    }

    ngOnDestroy(): void {
        this.structureSubscriber.unsubscribe()
        this.querySubscriber.unsubscribe()
    }

    openUserDetail() {
        this.listCompanionView = 'user-detail'
        this.loadingService.load('users-content')
        return this.selectedUser.userDetails.sync()
            .catch((err) => {
                this.onError(err)
            }).then(() => {
                this.loadingService.done('users-content')
                this.cdRef.markForCheck()
            })
    }

    openCreationView() {
        if(this.listCompanionView !== 'user-create'){
            this.listCompanionView = 'user-create'
            this.router.navigate(['../users'], {
                queryParams: { createUser: 1 },
                relativeTo: this.route })
        }
    }

    private error: Error
    onError(error: Error){
        console.error(error)
        this.listCompanionView = 'user-error'
        this.error = error
    }

}