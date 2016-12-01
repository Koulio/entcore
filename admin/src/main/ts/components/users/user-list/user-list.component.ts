import { Component, Input, Output, OnInit, EventEmitter,
    ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core'
import { User } from '../../../models/mappings'
import { BundlesService } from 'sijil/dist'

@Component({
    selector: 'user-list',
    template: `
    <list-component [model]="userlist" [filters]="filters" [inputFilter]="filterByInput"
        [sort]="sortArray" [limit]="limit" searchPlaceholder="search.user"
        [isSelected]="isSelected" [display]="display"
        (inputChange)="userNameFilter = $event"
        (onSelect)="selectedUser = $event; onselect.emit($event)">
        <div toolbar class="user-toolbar">
             <i class="fa" aria-hidden="true"
                [ngClass]="{
                    'fa-sort-alpha-asc': sorts.alphabetical.sort === '+',
                    'fa-sort-alpha-desc': sorts.alphabetical.sort === '-',
                    'selected': sorts.alphabetical.selected
                }"
                [tooltip]="'sort.alphabetical' | translate" position="top"
                (click)="changeSorts('alphabetical')"></i>
            <i class="fa" aria-hidden="true"
                [ngClass]="{
                    'fa-sort-amount-asc': sorts.profile.sort === '+',
                    'fa-sort-amount-desc': sorts.profile.sort === '-',
                    'selected': sorts.profile.selected
                }"
                [tooltip]="'sort.profile' | translate" position="top"
                (click)="changeSorts('profile')"></i>
            <i class="fa fa-filter toolbar-right" aria-hidden="true"
                [class.selected]="listCompanion === 'user-filters'"
                [tooltip]="'filters' | translate" position="top"
                (click)="openfilters.emit('user-filters')"></i>
        </div>
    </list-component>
    `,
    styles: [`
        .user-toolbar {
            padding: 15px;
            font-size: 1.2em;
        }
        .user-toolbar i {
            cursor: pointer;
        }
    `],
    host: {
        '(document:scroll)': 'onDocumentScroll($event)',
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserList implements OnInit {

    constructor(private cdRef: ChangeDetectorRef,
        private bundlesService: BundlesService){}

    ngOnInit() {}

    @Input() userlist: User[] = []

    // Display
    private display = (user: User): string => {
        return `${ user.lastName.toUpperCase() } ${user.firstName} - ${this.bundlesService.translate(user.type)}`
    }

    @Input() listCompanion: string
    @Output("listCompanionChange") openfilters: EventEmitter<string> = new EventEmitter<string>()

    // Selection
    @Input() selectedUser: User
    @Output("selectedUserChange") onselect: EventEmitter<User> = new EventEmitter<User>()

    private selectUser(user: User) {
        this.selectedUser = user
        this.onselect.emit(user)
    }

    isSelected = (user: User) => {
        return this.selectedUser === user
    }

    // Limit
    private DEFAULT_INCREMENT: number = 100
    private limit = this.DEFAULT_INCREMENT
    resetLimit() {
        this.limit = this.DEFAULT_INCREMENT
    }

    // Filters
    @Input() filters: {}

    private _userNameFilter = ""
    private set userNameFilter(filter: string) {
        this._userNameFilter = filter
        this.resetLimit()
    }
    private get userNameFilter() {
        return this._userNameFilter
    }

    // Sorts
    private sorts = {
        alphabetical: {
            sort: '+',
            orderedValue: 'lastName',
            staticValues: ['+firstName'],
            selected: true },
        profile: {
            sort: '+',
            orderedValue: 'type',
            selected: false }
    }
    private sortArray : Array<string> =  ['+lastName', '+firstName', '+type']
    private changeSorts = function(target) {
        this.resetLimit()
        this.sorts[target].selected = true
        this.sorts[target].sort = this.sorts[target].sort === '+' ? '-' : '+'
        this.sortArray = [
            this.sorts[target].sort + this.sorts[target].orderedValue,
            ...(this.sorts[target].staticValues || []) ]

        for(let prop in this.sorts) {
            if(prop !== target) {
                this.sortArray = this.sortArray.concat([
                    this.sorts[prop].sort + this.sorts[prop].orderedValue,
                    ...(this.sorts[prop].staticValues || []) ])
                this.sorts[prop].selected = false
            }
        }
    }

    // Filtering
    private filterByInput = (user:User) => {
        if(!this.userNameFilter) return true
        return `${user.lastName} ${user.firstName}`.toLowerCase()
            .indexOf(this.userNameFilter.toLowerCase()) >= 0
    }

    // Scroll
    private ticking = false;
    private onDocumentScroll(event) {
        if (!this.ticking) {
            window.requestAnimationFrame(() => {
                 if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                    this.limit = Math.min(this.limit + this.DEFAULT_INCREMENT, this.userlist.length)
                    this.cdRef.markForCheck()
                }
                this.ticking = false;
            });
        }
        this.ticking = true;
    }

}