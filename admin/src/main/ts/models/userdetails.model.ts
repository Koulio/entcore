import { Model } from 'toolkit'

export class UserDetailsModel extends Model<UserDetailsModel> {

    constructor(source ?: UserDetailsModel) {
        super({
            sync: '/directory/user/:id',
            update: '/directory/user/:id'
        })
    }

    id?: string
    activationCode?: string
    firstName?: string
    lastName?: string
    displayName?: string
    externalId?: string
    source?: string
    email?: string
    birthDate?: string
    oldemail?: string
    login?: string
    blocked?: boolean
    zipCode: string
    city: string
    address: string
    homePhone: string
    mobile?: string
    profiles?: Array<string>
    type?: Array<string>
    functions?: Array<[string, Array<string>]>
    children?: Array<string>
    parents?: Array<string>
    functionalGroups?: Array<string>
    administrativeStructures?: Array<string>
    deleteDate: number

    toggleBlock() {
        return this.http.put(`/auth/block/${this.id}`, { block: !this.blocked }).then(() => {
                this.blocked = !this.blocked
            })
    }

    sendResetPassword(email: string) {
        let payload = new window['URLSearchParams']()
        payload.append('login', this.login)
        payload.append('email', email);
        return this.http.post('/auth/sendResetPassword', payload)
    }

    toJSON() {
        return {
            firstName:      this.firstName,
            lastName:       this.lastName,
            displayName:    this.displayName,
            birthDate:      this.birthDate,
            address:        this.address,
            city:           this.city,
            zipCode:        this.zipCode,
            email:          this.email,
            homePhone:      this.homePhone,
            mobile:         this.mobile
        }
    }
}