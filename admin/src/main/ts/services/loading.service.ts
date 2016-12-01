import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable()
export class LoadingService {

    timer = 250

    private loading = new Set<any>()
    private timers = new Map<any, number>()

    private _trigger = new Subject()
    get trigger() {
        return this._trigger
    }

    isLoading(something, pending) : boolean  {
        return this.loading.has(something) ||
            (pending && this.timers.has(something))
    }

    load(something, timer?: number) : void {
        if(this.timers.has(something)){
            window.clearTimeout(this.timers.get(something))
        }
        this.timers.set(something, window.setTimeout(() => {
            this.loading.add(something)
            this.timers.delete(something)
            this.trigger.next(true)
        }, timer || this.timer))
    }

    done(something) : void {
        window.clearTimeout(this.timers.get(something))
        this.timers.delete(something)
        this.loading.delete(something)
        this.trigger.next(true)
    }

}