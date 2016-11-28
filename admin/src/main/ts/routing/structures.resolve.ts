import { Injectable } from '@angular/core'
import { Resolve } from '@angular/router'

import { structures } from '../models'

@Injectable()
export class StructuresResolve implements Resolve<void> {

    constructor(){}

    resolve(): Promise<any> {
        return structures.sync()
    }
}