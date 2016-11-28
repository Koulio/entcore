import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'
import { BundlesService } from 'sijil/dist'
import { User } from '../../../models/mappings'


export type UserFilter<T> = {
    type: string,
    label: string,
    comboModel: Array<T>,
    outputModel: Array<T>,
    filter: Array<T> | ((item: T) => boolean),
    setOutput: (output: Array<T>) => void
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
                <multi-combo
                    [comboModel]="filter.comboModel"
                    [outputModel]="filter.outputModel"
                    (outputModelChange)="filter.setOutput($event); onfilterschange.emit(_filters)"
                    [title]="filter.label | translate"
                    [display]="translateFunction"
                ></multi-combo>
                <div class="multi-combo-companion">
                    <div *ngFor="let item of filter.outputModel" (click)="deselect(filter, item)">
                        {{ item | translate }}
                        <i class="fa fa-trash"></i>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class UserFilters implements OnInit {

    constructor(private bundles: BundlesService){}

    ngOnInit() {}

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
        }
    ]
    @Output("filtersChange") onfilterschange: EventEmitter<{}> = new EventEmitter()

    private translateFunction = (key) => {
        return this.bundles.translate(key)
    }

    private deselect(filter, item) {
        filter.outputModel.splice(filter.outputModel.indexOf(item), 1)
        this.onfilterschange.emit(this._filters)
    }
}