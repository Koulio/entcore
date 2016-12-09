import { Component, OnInit, OnDestroy } from '@angular/core'
import { GroupsDataService } from '../../../services/groups/groups.data.service'

@Component({
    selector: 'functional-groups',
    template: `
        <groups-view groupType="FunctionalGroup" viewName="functional"
                     [groups]="dataService.structure.groups.data" [(selectedGroup)]="dataService.group">
            <div class="padded">
                <group-users-list [groups]="groups" [selectedGroup]="dataService.group">
                </group-users-list>
            </div>
        </groups-view>
    `
})
export class FunctionalGroups implements OnInit, OnDestroy {

    constructor(private dataService: GroupsDataService) {}

    ngOnInit() {}
    ngOnDestroy() {}
}