import { User } from './user'
import http from 'axios'

export class Group {
    id?: string
    name?: string
    displayName?: string
    type?: string
    classes?: {id: string, name: string}[]
    users: {id: string, firstName: string, lastName: string, type: string, login: string, username: string}[]

    syncUsers() {
        return http.get(`/directory/user/group/${this.id}`).then(res => {
            this.users = res.data
        })
    }
}