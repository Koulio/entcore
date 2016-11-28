import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot } from '@angular/router'

import { Structure } from '../models/mappings'
import { structures } from '../models'
import { LoadingService } from '../services'

@Injectable()
export class StructureResolve implements Resolve<Structure> {

    constructor(private loadingService: LoadingService){}

    resolve(route: ActivatedRouteSnapshot): Promise<Structure> {
        return new Promise((res, rej) => {
            let target = structures.data.find(s => s.id === route.params['structureId'])
            if(target){ res(target) } else { rej() }
        })
    }
}