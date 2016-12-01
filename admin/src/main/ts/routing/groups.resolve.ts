import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot } from '@angular/router'
import { structureCollection, GroupCollection } from '../models'
import { Group } from '../models/mappings'
import { LoadingService } from '../services'

@Injectable()
export class GroupsResolve implements Resolve<Group[]> {

    constructor(private loadingService: LoadingService){}

    resolve(route: ActivatedRouteSnapshot): Promise<Group[]> {
        let currentStructure = structureCollection.data.find(s => s.id === route.parent.params['structureId'])
        if(currentStructure.groups.data.length > 0) {
            return Promise.resolve(currentStructure.groups.data)
        } else {
            this.loadingService.load('portal-content')
            return currentStructure.groups.sync().then(() => {
                this.loadingService.done('portal-content')
                return currentStructure.groups.data
            }).catch(e => {
                this.loadingService.done('portal-content')
                console.error(e)
            })
        }
    }

}