import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core'
import { BundlesService } from 'sijil/dist'
import { User } from '../../../models/mappings'
import { StructureModel } from '../../../models'
import { UserlistFiltersService } from '../../../services/userlist.filters.service'

export type UserFilter<T> = {
    type: string,
    label: string,
    comboModel: Array<T>,
    outputModel: Array<T>,
    filter: Array<T> | ((item: T) => boolean),
    setOutput: (output: Array<T>) => void,
    filterProp?: boolean | string,
    display?: string,
    order?: string
};
export type UserFilterList<T> = Array<UserFilter<T>>;

@Component({
    selector: 'user-filters',
    template: `
        <div class="panel-header">
            <i class="fa fa-filter"></i>
            <span><s5l>filters</s5l></span>
        </div>
        <div class="padded">
            <div *ngFor="let filter of _filters">
                <div *ngIf="filter.comboModel.length > 0">
                    <multi-combo
                        [comboModel]="filter.comboModel"
                        [outputModel]="filter.outputModel"
                        (outputModelChange)="filter.setOutput($event); onfilterschange.emit(_filters)"
                        [title]="filter.label | translate"
                        [display]="filter.display || translateFunction"
                        [orderBy]="filter.order || orderer"
                        [filter]="filter.filterProp"
                    ></multi-combo>
                    <div class="multi-combo-companion">
                        <div *ngFor="let item of filter.outputModel" (click)="deselect(filter, item)">
                            <span *ngIf="filter.display">
                                {{ item[filter.display] }}
                            </span>
                            <span *ngIf="!filter.display">
                                {{ item | translate }}
                            </span>
                            <i class="fa fa-trash"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFilters implements OnInit, OnDestroy {

    constructor(private bundles: BundlesService, private listFilters: UserlistFiltersService){}

    ngOnInit() {}
    ngOnDestroy() {}

    @Input()
    get structure(){ return this._structure }
    set structure(s) {
        this._structure = s
        this._filters[2].comboModel = s.classes
    }
    private _structure: StructureModel
    @Input()
    set filters(filters: UserFilterList<any>) {
        if(filters) {
            this._filters = filters
        }
    }
    private _filters : UserFilterList<any> = [
        {
            type: 'type',
            label: 'profiles.multi.combo.title',
            comboModel: [ 'Student', 'Teacher', 'Relative', 'Personnel', 'Guest' ],
            setOutput: (output: Array<string>) => {
                this._filters[0].outputModel = output
            },
            outputModel: [],
            filter: (type: string) => {
                let outputModel = this._filters[0].outputModel
                return outputModel.length === 0 || outputModel.indexOf(type) >= 0
            }
        },
        {
            type: 'code',
            label: 'code.multi.combo.title',
            comboModel: [ 'users.activated', 'users.not.activated' ],
            setOutput: (output: Array<string>) => {
                this._filters[1].outputModel = output
            },
            outputModel: [],
            filter: (code: string) => {
                let outputModel = this._filters[1].outputModel
                return outputModel.length === 0 ||
                    outputModel.indexOf('users.activated') >= 0 && !code ||
                    outputModel.indexOf('users.not.activated') >= 0 && !(!code)
            }
        },
        {
            type: 'allClasses',
            label: 'classes.multi.combo.title',
            comboModel: [],
            setOutput: (output: Array<string>) => {
                this._filters[2].outputModel = output
            },
            display: 'name',
            order: '+name',
            filterProp: 'name',
            outputModel: [],
            filter: (allClasses: {id: string, name: string}[]) => {
                let outputModel = this._filters[2].outputModel
                return outputModel.length === 0 ||
                    allClasses && allClasses.length > 0 &&
                    allClasses.some(c => {
                        return outputModel.find(o => o.id === c.id)
                    })
            }
        }
    ]
    private orderer(a){
        return a
    }
    @Output("filtersChange") onfilterschange: EventEmitter<{}> = new EventEmitter()

    private translateFunction = (key) => {
        return this.bundles.translate(key)
    }

    private deselect(filter, item) {
        filter.outputModel.splice(filter.outputModel.indexOf(item), 1)
        this.onfilterschange.emit(this._filters)
    }
}