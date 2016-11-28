import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Input, OnInit,
    ElementRef, ViewChild } from '@angular/core'
import { Location } from '@angular/common'
import { Router, ActivatedRoute } from '@angular/router'

import { SessionModel, structures } from '../../models'
import { Session, Structure } from '../../models/mappings'

@Component({
    selector: 'admin-portal',
    templateUrl: require('./portal.component.html'),//'/admin/public/templates/admin-root.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Portal implements OnInit {

    private session: Session

    private structures: Structure[]
    private _currentStructure: Structure
    set currentStructure(struct: Structure){
        this._currentStructure = struct

        let replacerRegex = /^\/{0,1}admin(\/[^\/]+){0,1}/
        let newPath = window.location.pathname.replace(replacerRegex, `/admin/${struct.id}`)

        this.router.navigateByUrl(newPath)
    }
    get currentStructure(){ return this._currentStructure }

    @ViewChild("sidePanelOpener") private sidePanelOpener: ElementRef

    constructor(private cdRef: ChangeDetectorRef,
        private router: Router,
        private location: Location,
        private route: ActivatedRoute) {}

    ngOnInit() {
        SessionModel.getSession().then((session) => { this.session = session })

        let initialStructureId = this.route.snapshot.params['structureId']

        this.structures = structures.asTree()
        if(initialStructureId)
            this.currentStructure = structures.data.find(s => s.id === initialStructureId)
    }

}
