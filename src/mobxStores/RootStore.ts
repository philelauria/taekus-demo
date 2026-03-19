import { AuthStore } from '~/features/auth/authStore'

export class RootStore {
    authStore: AuthStore

    constructor() {
        this.authStore = new AuthStore(this)
    }
}
