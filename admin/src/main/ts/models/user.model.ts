import { Model } from 'toolkit'
import { User } from './mappings/user'
import { UserDetailsModel } from './userdetails.model'
import { structureCollection } from './structure.collection'

export class UserModel extends Model<User> implements User {

    constructor() {
        super({})
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

    addStructure(structureId: string) {
        return this.http.put(`/directory/structure/${structureId}/link/${this.id}`).then(() => {
            let targetStructure = structureCollection.data.find(s => s.id === structureId)
            if(targetStructure) {
                this.structures.push({id: targetStructure.id, name: targetStructure.name})
                if(targetStructure.users.data.length > 0)
                    targetStructure.users.data.push(this)
            }
        })
    }

    removeStructure(structureId: string) {
        return this.http.delete(`/directory/structure/${structureId}/unlink/${this.id}`).then(() => {
            this.structures = this.structures.filter(s => s.id !== structureId)
            let targetStructure = structureCollection.data.find(s => s.id === structureId)
            if(targetStructure && targetStructure.users.data.length > 0) {
               targetStructure.users.data = targetStructure.users.data.filter(u => u.id !== this.id)
            }
        })
    }
}