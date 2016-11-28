import { User } from './mappings/user'
import { Collection } from 'toolkit'

export class UserCollection extends Collection<User> {

    constructor(){
        super({
            sync: '/directory/user/admin/list?structureId=:structureId'
        }, User)
    }

    public structureId : string

}