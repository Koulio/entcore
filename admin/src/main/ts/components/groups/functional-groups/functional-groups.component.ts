import { Component, Input, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core'
import { ActivatedRoute, Router, Params } from '@angular/router'

import { Group } from '../../../models/mappings'
import { LoadingService } from '../../../services'

@Component({
    selector: 'functional-groups',
    template: `
        <groups-view groupType="FunctionalGroup" viewName="functional-groups"
                    [groups]="groups" [(selectedGroup)]="selectedGroup">
            <div class="padded">
                <ul>
                    <li *ngFor="let user of selectedGroup?.users">
                        {{ user.firstName }} {{ user.lastName }}
                    </li>
                </ul>
            </div>
        </groups-view>
    `
})
export class FunctionalGroups implements OnInit, OnDestroy {

    constructor(private route: ActivatedRoute,
        private router: Router,
        private cdRef: ChangeDetectorRef,
        private loadingService: LoadingService){}

    // Model
    @Input() groups: Group[]
    selectedGroup : Group

    ngOnInit() {}
    ngOnDestroy() {}
}