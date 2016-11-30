import { UserCollection } from './user.collection';
import { Model } from 'toolkit'

export class StructureModel extends Model<StructureModel> {

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
    children?: StructureModel[]
    users: UserCollection
    classes: Array<{id: string, name: string}> = []

    constructor() {
        super({})
        this.users = new UserCollection()
    }

    quickSearchUsers(input: string) {
        return this.http.get(`/admin/api/structure/${this.id}/quicksearch/users`, {
            params: { input: input }
        })
    }

    syncClasses() {
        return this.http.get('/directory/class/admin/list', {
            params: { structureId: this.id }
        }).then(res => {
            this.classes = res.data
        })
    }
}