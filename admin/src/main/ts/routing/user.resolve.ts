import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router'

import { structureCollection } from '../models'
import { LoadingService } from '../services'
import { User } from '../models/mappings'

@Injectable()
export class UserResolve implements Resolve<User | Error> {

    constructor(private ls: LoadingService, private router: Router){}

    resolve(route: ActivatedRouteSnapshot): Promise<User> {
        this.ls.load('users-content')

        let structure = structureCollection.data.find(s => s.id === route.parent.parent.params['structureId'])
        let user = structure &&
            structure.users.data.find(u => u.id === route.params['userId'])

        if(user) {
             return user.userDetails.sync()
                .catch((err) => {
                    this.router.navigate(['/admin', structure.id, 'users'], {replaceUrl: true})
                }).then(() => {
                    this.ls.done('users-content')
                    return user
                })
        } else {
            this.router.navigate(['/admin', structure.id, 'users'], {replaceUrl: true})
        }
    }
}