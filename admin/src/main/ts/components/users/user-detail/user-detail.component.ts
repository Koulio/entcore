import { Component, Input, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core'
import { AbstractControl, NgForm } from '@angular/forms'
import { User } from '../../../models/mappings'
import { UserDetailsModel } from '../../../models'
import { LoadingService } from '../../../services'
import { structureCollection, StructureModel } from '../../../models'

@Component({
    selector: 'user-detail',
    templateUrl: require('./user-detail.component.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetail {

    constructor(private loadingService: LoadingService,
        private cdRef: ChangeDetectorRef){}

    @ViewChild("codeInput") codeInput : AbstractControl
    @ViewChild("administrativeForm") administrativeForm : NgForm

    @Input()
    set user(user: User){
        if(user) {
            this._user = user
            this.details = user.userDetails
            if(this.codeInput)
                this.codeInput.reset()
            if(this.administrativeForm)
                this.administrativeForm.reset()
        }
    }
    get user(){ return this._user }
    private _user : User
    private details : UserDetailsModel
    @Input() structure: StructureModel
    private now : string = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
    private emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    private getStructure(id: string) {
        return structureCollection.data.find(s => s.id === id)
    }

    private isContextAdml() {
        return this.details && this.details.functions &&
            this.details.functions[0][0] &&
            this.details.functions[0][1].find(id => this.structure.id === id)
    }
}