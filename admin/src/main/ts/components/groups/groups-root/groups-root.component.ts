import { Component, ChangeDetectorRef, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core'
import { ActivatedRoute, Router, Data, Params } from '@angular/router'
import { LoadingService } from '../../../services'
import { Group } from '../../../models/mappings'
import { StructureModel } from '../../../models'
import { Subscription } from 'rxjs'

@Component({
    selector: 'groups-root',
    template: `
        <div class="tabs">
            <button class="tab" *ngFor="let tab of tabs"
                (click)="openView(tab.view)" [class.active]="shownView === tab.view">
                {{ tab.label | translate }}
            </button>
        </div>
        <h1>
            <i class="fa fa-users"></i>
            <s5l>groups</s5l>
        </h1>

        <manual-groups      [groups]="grouplist"
            *ngIf="shownView === 'manual-groups'"></manual-groups>
        <profile-groups     [groups]="grouplist"
            *ngIf="shownView === 'profile-groups'"></profile-groups>
        <functional-groups  [groups]="grouplist"
             *ngIf="shownView === 'functional-groups'"></functional-groups>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupsRoot implements OnInit, OnDestroy {

    constructor(private route: ActivatedRoute,
        private router: Router,
        private cdRef: ChangeDetectorRef,
        private loadingService: LoadingService) { }

    // Current structure
    private _currentStructure: StructureModel
    get currentStructure() { return this._currentStructure }
    set currentStructure(structure) { this._currentStructure = structure }

    // Group list
    private grouplist: Group[] = []

    // View
    private shownView: string = ''
    private openView(view: string) {
        this.shownView = view
        this.router.navigate(['../groups'], {
            queryParams: { view: view },
            relativeTo: this.route })
    }

    // Subscriberts
    private structureSubscriber: Subscription
    private querySubscriber: Subscription

    // Tabs
    private tabs = [
        { label: "manual.groups", view: "manual-groups" },
        { label: "profile.groups", view: "profile-groups" },
        { label: "functional.groups", view: "functional-groups" }
    ]

    ngOnInit(): void {
        this.grouplist = this.route.snapshot.data['grouplist']

        // Watch selected structure
        this.structureSubscriber = this.route.parent.data.subscribe((data: Data) => {
            this.currentStructure = data['structure']
            if (this.currentStructure.groups.data.length > 0) {
                this.grouplist = this.currentStructure.groups.data
            } else {
                this.loadingService.load('portal-content')
                this.currentStructure.groups.sync().then(() => {
                    this.grouplist = this.currentStructure.groups.data
                }).catch(e => {
                    this.onError(e)
                }).then(() => {
                    this.loadingService.done('portal-content')
                    this.cdRef.markForCheck()
                })
            }
            this.cdRef.markForCheck()
        })

        this.querySubscriber = this.route.queryParams.subscribe((params: Params) => {
            if(params['view'] && params['view'] !== this.shownView) {
                this.openView(params['view'])
                this.cdRef.markForCheck()
            }
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