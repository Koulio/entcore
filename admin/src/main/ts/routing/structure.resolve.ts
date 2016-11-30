import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot } from '@angular/router'

import { StructureModel } from '../models'
import { structureCollection } from '../models'
import { LoadingService } from '../services'

@Injectable()
export class StructureResolve implements Resolve<StructureModel> {

    constructor(private loadingService: LoadingService){}

    resolve(route: ActivatedRouteSnapshot): Promise<StructureModel> {
        let target = structureCollection.data.find(s => s.id === route.params['structureId'])
        if(!target){
            return new Promise((res, rej) => {
                rej('structure.not.found')
            })
        }

        this.loadingService.load('portal-content')
        return target.syncClasses().catch(err =>{
            console.error(err)
        }).then(() => {
            this.loadingService.done('portal-content')
            return Promise.resolve(target)
        })
    }
}