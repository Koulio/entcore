import { Structure } from '../../../models/mappings'
import { StructureCollection, structures } from '../../../models'
import { ActivatedRoute } from '@angular/router'
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, Input, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'

@Component({
    selector: 'structure-home',
    template: `
    <div>
        <h1><i class="fa fa-cog"></i><s5l>admin.title</s5l></h1>
        <h3><s5l>structure.home.title</s5l>: {{ structure?.name }} </h3>
    </div>`,
     changeDetection: ChangeDetectionStrategy.OnPush
})
export class StructureHome implements OnInit, OnDestroy {

    private structures : StructureCollection = structures
    private structure: Structure
    private routeSubscriber: Subscription

    constructor(private route: ActivatedRoute, private cdRef: ChangeDetectorRef){}

    ngOnInit() {
        this.routeSubscriber = this.route.params.subscribe(p => {
            this.structure = this.structures.data.find(s => s.id === p['structureId'])
            this.cdRef.markForCheck()
        })
    }

    ngOnDestroy() {
        this.routeSubscriber.unsubscribe()
    }

}