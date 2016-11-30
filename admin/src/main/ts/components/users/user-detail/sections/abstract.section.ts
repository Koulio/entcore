import { Input, ViewChild, ChangeDetectorRef } from '@angular/core'
import { User } from '../../../../models/mappings'
import { UserDetailsModel, StructureModel, structureCollection } from '../../../../models'
import { LoadingService } from '../../../../services'

export abstract class AbstractSection {

    constructor(protected loadingService: LoadingService,
        protected cdRef: ChangeDetectorRef){}

    get user(){ return this._user }
    set user(u: User){
        this._user = u
        this.details = u.userDetails
        this.onUserChange()
    }
    protected _user : User
    protected details: UserDetailsModel
    structure: StructureModel

    protected now : string = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
    protected emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    protected getStructure(id: string) {
        return structureCollection.data.find(s => s.id === id)
    }

    protected isContextAdml() {
        return this.details.functions &&
            this.details.functions[0][0] &&
            this.details.functions[0][1].find(id => this.structure.id === id)
    }

    protected wrapRequest(request, loadingLabel: string, ...args) {
        this.loadingService.load(loadingLabel)
        request.bind(this.details)(...args).then(() => {
            this.cdRef.markForCheck()
        }).catch((err) => {
            console.error(err)
        }).then(() => {
            this.loadingService.done(loadingLabel)
        })
    }

    protected abstract onUserChange()

}