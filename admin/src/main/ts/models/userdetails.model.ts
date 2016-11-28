import { Model } from 'toolkit'
import { UserDetails } from './mappings'

export class UserDetailsModel extends Model<UserDetails> implements UserDetails {

    constructor(){
        super({
            sync: '/directory/user/:id'
        })
    }

    id: string
    firstName: string
    lastName: string
    displayName: string
    externalId: string
    source: string
    email: string
    oldemail: string
    login: string
    profiles: Array<string>
    type: Array<string>
    mobile: string
    function: Array<string>
    children: Array<string>
    parents: Array<string>
    functionalGroups: Array<string>
    administrativeStructures: Array<string>

}