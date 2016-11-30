import { Component, Input, ViewChild, ChangeDetectorRef } from '@angular/core'
import { AbstractControl } from '@angular/forms'
import { AbstractSection } from '../abstract.section'
import { LoadingService } from '../../../../../services'

@Component({
    selector: 'user-info-section',
    templateUrl: require('./user-info-section.component.html'),
    inputs: ['user', 'structure']
})
export class UserInfoSection extends AbstractSection {

    constructor(protected loadingService: LoadingService,
        protected cdRef: ChangeDetectorRef) {
        super(loadingService, cdRef)
    }

    @ViewChild("codeInput") codeInput : AbstractControl

    protected onUserChange(){
        if(this.codeInput)
            this.codeInput.reset()
    }

}