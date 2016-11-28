import { Component, Input } from '@angular/core'
import { User } from '../../../models/mappings'
import { UserDetailsModel } from '../../../models'
import { LoadingService } from '../../../services'

@Component({
    selector: 'user-detail',
    templateUrl: require('./user-detail.component.html')
})
export class UserDetail {

    constructor(private loadingService: LoadingService){}

    @Input()
    set user(user: User){
        if(user){
            this._user = user
            this.details = user.userDetails
        }
    }
    get user(){ return this._user }
    private _user : User
    private details : UserDetailsModel

}