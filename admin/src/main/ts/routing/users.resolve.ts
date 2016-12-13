import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot } from '@angular/router'

import { structureCollection } from '../models'
import { LoadingService } from '../services'
import { User } from '../models/mappings'

@Injectable()
export class UsersResolve implements Resolve<User[]> {

    constructor(private ls: LoadingService){}

    resolve(route: ActivatedRouteSnapshot): Promise<User[]> {
        let currentStructure = structureCollection.data.find(s => s.id === route.parent.params['structureId'])
        if(currentStructure.users.data.length > 0) {
            return Promise.resolve(currentStructure.users.data)
        } else {
            this.ls.load('portal-content')
            return currentStructure.users.sync().then(() => {
                this.ls.done('portal-content')
                return currentStructure.users.data
            }).catch(e => {
                this.ls.done('portal-content')
                console.error(e)
            })
        }
    }
}