import { Component, Input, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core'
import { ActivatedRoute, Router, Params } from '@angular/router'

import { Group } from '../../../models/mappings'
import { LoadingService } from '../../../services'
import { BundlesService } from 'sijil/dist'

@Component({
    selector: 'profile-groups',
    template: `
        <groups-view groupType="ProfileGroup" viewName="profile-groups"
                    [groups]="groups" [(selectedGroup)]="selectedGroup">
            <div class="padded">
                <group-users-list [groups]="groups" [selectedGroup]="selectedGroup">
                </group-users-list>
            </div>
        </groups-view>
    `
})
export class ProfileGroups implements OnInit, OnDestroy {

    constructor(private route: ActivatedRoute, private router: Router, private bundles: BundlesService,
            private cdRef: ChangeDetectorRef, private loadingService: LoadingService) {}

    // Model
    @Input() groups: Group[]
    @Input() selectedGroup : Group

    ngOnInit() {}
    ngOnDestroy() {}
}