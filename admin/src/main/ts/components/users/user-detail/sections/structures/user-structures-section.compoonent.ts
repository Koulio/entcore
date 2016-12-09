import { Component, Input, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core'
import { AbstractControl } from '@angular/forms'
import { Router } from '@angular/router'

import { AbstractSection } from '../abstract.section'
import { LoadingService, UserListService } from '../../../../../services'
import { User } from '../../../../../models/mappings/user'
import { structureCollection, StructureCollection } from '../../../../../models'

@Component({
    selector: 'user-structures-section',
    template: `
        <panel-section section-title="users.details.section.structures" [folded]="true">
            <button (click)="showStructuresLightbox = true">
                <s5l>add.structure</s5l><i class="fa fa-plus-circle"></i>
            </button>
            <light-box class="inner-list"
                    [show]="showStructuresLightbox" (onClose)="showStructuresLightbox = false">
                <div class="padded">
                    <h3><s5l>add.structure</s5l></h3>
                    <list-component class="inner-list"
                        [model]="structureCollection.data"
                        [inputFilter]="filterByInput"
                        [filters]="filterStructures"
                        searchPlaceholder="search.structure"
                        sort="name"
                        [display]="display"
                        (inputChange)="inputFilter = $event"
                        [isDisabled]="disableStructure"
                        (onSelect)="wrapRequest(user?.addStructure, $event.id, 0, $event.id)">
                    </list-component>
                </div>
            </light-box>
            <ul class="actions-list">
                <li *ngFor="let structure of user?.structures">
                    <a class="action" [routerLink]="['/admin', structure.id, 'users', user.id]">
                        {{ structure.name }}
                    </a>
                    <i  class="fa fa-times action" (click)="wrapRequest(user?.removeStructure, structure.id, 0, structure.id)"
                        [tooltip]="'delete.this.structure' | translate"
                        [ngClass]="{ disabled: loadingService.isLoading(structure.id)}"></i>
                </li>
            </ul>
        </panel-section>
    `,
    inputs: ['user', 'structure']
})
export class UserStructuresSection extends AbstractSection {

    constructor(private userListService: UserListService,
            private router: Router,
            protected loadingService: LoadingService,
            protected cdRef: ChangeDetectorRef) {
        super(loadingService, cdRef)
    }

    private structureCollection : StructureCollection = structureCollection

    @ViewChild("codeInput") codeInput : AbstractControl

    protected onUserChange(){}

    private disableStructure = (s) => {
        return this.loadingService.isLoading(s.id)
    }

     // Filters
    private _inputFilter = ""
    set inputFilter(filter: string) {
        this._inputFilter = filter
    }
    get inputFilter() {
        return this._inputFilter
    }
    private filterByInput = (s: {id: string, name: string}) => {
        if(!this.inputFilter) return true
        return `${s.name}`.toLowerCase().indexOf(this.inputFilter.toLowerCase()) >= 0
    }
    private filterStructures = (s: {id: string, name: string}) => {
        return !this.user.structures.find(struct => s.id === struct.id)
    }

    // Display
    private display = (s: {id: string, name: string}): string => {
        return s.name
    }

    // Loading wrapper
    protected wrapRequest = (request, loadingLabel: string, delay: number, ...args) => {
        this.loadingService.load(loadingLabel, delay)
        request.bind(this.user)(...args).catch((err) => {
            console.error(err)
        }).then(() => {
            this.loadingService.done(loadingLabel)
            this.cdRef.markForCheck()
        })
        this.cdRef.markForCheck()
    }

    //Routing
    private routeToStructure(structureId: string) {
        //[routerLink]="['/admin', structure.id, 'users']" [queryParams]="{userId: user.id, refresh: 1}"
        this.router.navigate(['/admin', structureId, 'users', this.user.id])
    }

}