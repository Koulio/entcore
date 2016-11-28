import { Component, Input } from '@angular/core'

@Component({
    selector: 'user-error',
    template: `
        <div class="panel-header">
            <h3>user.error</h3>
        </div>
        <div class="padded">
            <div>{{error}}</div>
        </div>
    `
})
export class UserError{

    @Input() error : Error

}