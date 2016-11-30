import { Component, Input, ViewChild, ChangeDetectorRef } from '@angular/core'
import { NgForm } from '@angular/forms'
import { AbstractSection } from '../abstract.section'
import { LoadingService } from '../../../../../services'

@Component({
    selector: 'user-administrative-section',
    templateUrl: require('./user-administrative-section.component.html'),
    inputs: ['user', 'structure']
})
export class UserAdministrativeSection extends AbstractSection {

    constructor(protected loadingService: LoadingService,
        protected cdRef: ChangeDetectorRef) {
        super(loadingService, cdRef)
    }

    @ViewChild("administrativeForm") administrativeForm : NgForm

    protected onUserChange(){
        if(this.administrativeForm)
            this.administrativeForm.reset()
    }

}