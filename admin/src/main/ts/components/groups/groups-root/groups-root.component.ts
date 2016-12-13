import { Component, ChangeDetectorRef, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core'
import { ActivatedRoute, Router, Data, Params } from '@angular/router'
import { LoadingService } from '../../../services'
import { Group } from '../../../models/mappings'
import { StructureModel } from '../../../models'
import { Subscription } from 'rxjs'
import { GroupsDataService } from '../../../services/groups/groups.data.service'

@Component({
    selector: 'groups-root',
    template: `
        <div class="tabs">
            <button class="tab" *ngFor="let tab of tabs"
                [routerLink]="tab.view"
                routerLinkActive="active">
                {{ tab.label | translate }}
            </button>
        </div>
        <h1>
            <i class="fa fa-users"></i>
            <s5l>groups</s5l>
        </h1>

        <router-outlet></router-outlet>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [GroupsDataService]
})
export class GroupsRoot implements OnInit, OnDestroy {

    constructor(private route: ActivatedRoute,
        private router: Router,
        private cdRef: ChangeDetectorRef,
        private dataService: GroupsDataService,
        private ls: LoadingService) { }

    // Subscriberts
    private structureSubscriber: Subscription
    private querySubscriber: Subscription

    // Tabs
    private tabs = [
        { label: "manual.groups", view: "manual" },
        { label: "profile.groups", view: "profile" },
        { label: "functional.groups", view: "functional" }
    ]

    ngOnInit(): void {
        // Watch selected structure
        this.structureSubscriber = this.route.parent.data.subscribe((data: Data) => {
            this.dataService.structure = data['structure']
            if (!this.dataService.structure.groups.data.length) {
                this.ls.load('portal-content')
                this.dataService.structure.groups.sync().catch(e => {
                    this.onError(e)
                }).then(() => {
                    this.ls.done('portal-content')
                    this.cdRef.markForCheck()
                })
            }
            this.cdRef.markForCheck()
        })
    }

    ngOnDestroy(): void {
        this.structureSubscriber.unsubscribe()
    }

    private error: Error
    onError(error: Error){
        console.error(error)
        this.error = error
    }
}