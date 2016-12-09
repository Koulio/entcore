import { Component, Input, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef, EventEmitter, Output } from '@angular/core'
import { ActivatedRoute, Router, Params } from '@angular/router'
import { Subscription } from 'rxjs'

import { Group } from '../../../models/mappings'
import { LoadingService } from '../../../services'

@Component({
    selector: 'groups-view',
    template: `
        <side-layout (closeCompanion)="showCompanion = false" [showCompanion]="showCompanion">
            <div side-card>
                <list-component
                    [model]="groups"
                    [filters]="{type: groupType}"
                    [inputFilter]="filterByInput"
                    sort="name"
                    searchPlaceholder="search.group"
                    [isSelected]="isSelected"
                    [display]="display"
                    (inputChange)="groupInputFilter = $event"
                    (onSelect)="routeToGroup($event)">
                </list-component>
            </div>
            <div side-companion>
                <spinner-cube class="component-spinner" waitingFor="groups-content"></spinner-cube>

                <div class="panel-header">
                    <i class="fa fa-users"></i>
                    <span><s5l>members.of.group</s5l>:</span><span>{{ selectedGroup?.name }}</span>
                </div>

                <div>
                    <ng-content></ng-content>
                </div>
            </div>
        </side-layout>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupView implements OnInit, OnDestroy {

    constructor(private route: ActivatedRoute,
        private router: Router,
        private cdRef: ChangeDetectorRef,
        private loadingService: LoadingService){}

    // Distinguish group type
    @Input() groupType : string
    @Input() viewName: string

    // Model
    @Input() groups: Group[]
    @Input()
    get selectedGroup(){ return this._selectedGroup }
    set selectedGroup(g: Group) {
        if(g) {
            if(g !== this._selectedGroup) {
                this._selectedGroup = g
                this.onselect.emit(g)
            }
        } else {
            this._selectedGroup = null
            this.showCompanion = false
        }
    }
    private _selectedGroup : Group
    @Output("selectedGroupChange") onselect: EventEmitter<Group> = new EventEmitter<Group>()
    private selectGroupByid(id: string) {
        this.selectedGroup = this.groups.find(g => g.id === id)
        this.cdRef.markForCheck()
    }

    // View
    private showCompanion: boolean

    // List component  properties
    private groupInputFilter : string
    private isSelected = (group: Group) => {
        return this.selectedGroup === group
    }
    private filterByInput = (group: Group) => {
        if(!this.groupInputFilter) return true
        return group.name.toLowerCase()
            .indexOf(this.groupInputFilter.toLowerCase()) >= 0
    }
    private display = (group: Group) => { return group.name }

    // Subscribers
    private querySubscriber: Subscription

    ngOnInit() {
        this.querySubscriber = this.route.queryParams.subscribe((params: Params) => {
            if(params['groupId']) {
                this.selectGroupByid(params['groupId'])
                this.openGroup()
            }
        })
    }

    ngOnDestroy() {
        this.querySubscriber.unsubscribe()
    }

    routeToGroup(g:Group) {
        this.router.navigate(['.'], {
            queryParams: { groupId: g.id },
            relativeTo: this.route
        })
    }

    openGroup() {
        this.loadingService.load('groups-content')
        this.selectedGroup.syncUsers().then(() => {
            this.showCompanion = true
        }).catch(err => {
            console.error(err)
        }).then(() => {
            this.loadingService.done('groups-content')
            this.cdRef.markForCheck()
        })
        this.cdRef.markForCheck()
    }
}