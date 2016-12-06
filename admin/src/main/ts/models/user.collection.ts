import { UserModel } from './user.model'
import { Collection } from 'toolkit'

export class UserCollection extends Collection<UserModel> {

    constructor(){
        super({
            sync: '/directory/user/admin/list?structureId=:structureId'
        }, UserModel)
    }

    public structureId : string

}