import { Structure } from './mappings/structure'
import { Collection } from 'toolkit'
import { UserCollection } from './user.collection'

export class StructureCollection extends Collection<Structure>{

    constructor(){
        super({
            sync: '/directory/structure/admin/list',
            create: '/directory/school',
            update: '/directory/structure/:id'
        }, Structure)
    }

    public asTree() {
        let childrenMap = new Map<string, Structure[]>()
        this.data.forEach(structure => {
            structure.parents && structure.parents.forEach(parent => {
                childrenMap.has(parent.id) ?
                    childrenMap.get(parent.id).push(structure) :
                    childrenMap.set(parent.id, [structure])
            })
        })
        this.data.forEach(structure => {
            if(childrenMap.has(structure.id))
                structure.children = childrenMap.get(structure.id)
        })
        let result = this.data.filter(structure => {
            return !structure.parents || structure.parents.length === 0
        })
        return result
    }
}

export let structures = new StructureCollection()