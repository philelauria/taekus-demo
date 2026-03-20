import { AuthStore } from '~/features/auth/authStore'
import { HomeStore } from '~/features/home/homeStore'

export class RootStore {
    authStore: AuthStore
    homeStore: HomeStore

    constructor() {
        this.authStore = new AuthStore(this)
        this.homeStore = new HomeStore(this)
    }
}
