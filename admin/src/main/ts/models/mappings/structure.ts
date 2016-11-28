import { UserCollection } from './../user.collection';
import { Serializable } from './serializable'

export class Structure extends Serializable {

    _id?: string
    set id(id: string) {
        this.users.structureId = id
        this._id = id
    }
    get id() { return this._id }

    UAI?: string
    externalId?: string
    name?: string
    parents?: [{ id: string, name: string }]

    protected _json_fields = ['UAI', 'externalId', 'name']

    children?: Structure[]
    users: UserCollection

    constructor() {
        super()
        this.users = new UserCollection()
    }
}