import { Component, Input, ViewChild, ChangeDetectorRef } from '@angular/core'
import { NgModel } from '@angular/forms'
import { AbstractSection } from '../abstract.section'
import { LoadingService } from '../../../../../services'

@Component({
    selector: 'user-info-section',
    templateUrl: require('./user-info-section.component.html'),
    inputs: ['user', 'structure']
})
export class UserInfoSection extends AbstractSection {

    constructor(protected ls: LoadingService,
        protected cdRef: ChangeDetectorRef) {
        super(ls, cdRef)
    }

    @ViewChild("passwordMailInput") passwordMailInput : NgModel

    protected onUserChange(){
        if(this.passwordMailInput)
            this.passwordMailInput.reset()
    }

    toggleUserBlock() {
        this.ls.load('user.block')
        this.details.toggleBlock().then(() => {
            this.user.blocked = !this.user.blocked
        }).catch((err) => {
            console.error(err)
        }).then(() => {
            this.ls.done('user.block')
            this.cdRef.markForCheck()
        })
        this.cdRef.markForCheck()
    }

}