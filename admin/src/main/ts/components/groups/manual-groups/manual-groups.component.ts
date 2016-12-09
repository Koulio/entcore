import { Component, OnInit, OnDestroy } from '@angular/core'
import { GroupsDataService } from '../../../services/groups/groups.data.service'

@Component({
    selector: 'manual-groups',
    template: `
        <groups-view groupType="ManualGroup" viewName="manual"
                     [groups]="dataService.structure.groups.data" [(selectedGroup)]="dataService.group">
            <div class="padded">
                <group-users-list [groups]="groups" [selectedGroup]="dataService.group">
                    <em>{{ dataService.group?.users?.length }} {{ 'members' | translate | lowercase }}</em>
                </group-users-list>
            </div>
        </groups-view>
    `
})
export class ManualGroups implements OnInit, OnDestroy {

    constructor(private dataService: GroupsDataService) {}

    ngOnInit() {}
    ngOnDestroy() {}
}