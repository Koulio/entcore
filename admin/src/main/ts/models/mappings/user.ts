import { Serializable } from './serializable'
import { UserDetailsModel } from '../userdetails.model'

export class User {

    constructor() {
        this.userDetails = new UserDetailsModel()
    }

    private _id: string
    get id(){ return this._id }
    set id(id) {
        this._id = id
        this.userDetails.id = id
    }
    type: string
    externalId: string
    code: string
    login: string
    firstName: string
    lastName: string
    displayName: string
    source: string
    attachmentId: string
    birthDate: string
    aafFunction: string[]
    structures: { id: string, name: string }[]
    allClasses: { id: string, name: string}[]
    functions: [string, string]
    parents: { id: string, firstName: string,  lastName: string }[]
    children: { id: string, firstName: string,  lastName: string, attachmentId: string }[]
    //parent1ExternalId: string[]
    //parent2ExternalId: string

    userDetails: UserDetailsModel

}