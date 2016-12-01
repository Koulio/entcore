import { Component, Input, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core'
import { ActivatedRoute, Router, Params } from '@angular/router'

import { Group } from '../../../models/mappings'
import { LoadingService } from '../../../services'

@Component({
    selector: 'manual-groups',
    template: `
        <groups-view groupType="ManualGroup" viewName="manual-groups"
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
export class ManualGroups implements OnInit, OnDestroy {

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