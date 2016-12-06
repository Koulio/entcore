import { Injectable } from '@angular/core'

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
export type UserFilterList<T> = UserFilter<T>[]

@Injectable()
export class UserlistFiltersService {

    constructor(){}

    filters : UserFilterList<any> = [
        {
            type: 'type',
            label: 'profiles.multi.combo.title',
            comboModel: [ 'Student', 'Teacher', 'Relative', 'Personnel', 'Guest' ],
            setOutput: (output: Array<string>) => {
                this.filters[0].outputModel = output
            },
            outputModel: [],
            filter: (type: string) => {
                let outputModel = this.filters[0].outputModel
                return outputModel.length === 0 || outputModel.indexOf(type) >= 0
            }
        },
        {
            type: 'code',
            label: 'code.multi.combo.title',
            comboModel: [ 'users.activated', 'users.not.activated' ],
            setOutput: (output: Array<string>) => {
                this.filters[1].outputModel = output
            },
            outputModel: [],
            filter: (code: string) => {
                let outputModel = this.filters[1].outputModel
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
                this.filters[2].outputModel = output
            },
            display: 'name',
            order: '+name',
            filterProp: 'name',
            outputModel: [],
            filter: (allClasses: {id: string, name: string}[]) => {
                let outputModel = this.filters[2].outputModel
                return outputModel.length === 0 ||
                    allClasses && allClasses.length > 0 &&
                    allClasses.some(c => {
                        return outputModel.find(o => o.id === c.id)
                    })
            }
        }
    ]

    getFormattedFilters() : Object {
        let formattedFilters = {}
        for(let i = 0; i < this.filters.length; i++) {
            let filter = this.filters[i]
            formattedFilters[filter.type] = filter.filter
        }
        return formattedFilters
    }
}