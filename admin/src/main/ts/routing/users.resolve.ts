import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot } from '@angular/router'

import { structures } from '../models'
import { LoadingService } from '../services'
import { User } from '../models/mappings'

@Injectable()
export class UsersResolve implements Resolve<User[]> {

    constructor(private loadingService: LoadingService){}

    resolve(route: ActivatedRouteSnapshot): Promise<User[]> {
        let currentStructure = structures.data.find(s => s.id === route.parent.params['structureId'])
        if(currentStructure.users.data.length > 0) {
            return Promise.resolve(currentStructure.users.data)
        } else {
            this.loadingService.load('portal-content')
            return currentStructure.users.sync().then(() => {
                this.loadingService.done('portal-content')
                return currentStructure.users.data
            }).catch(e => {
                console.error(e)
            })
        }
    }
}