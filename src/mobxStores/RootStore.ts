import { AuthStore } from '~/features/auth/authStore'
import { HomeStore } from '~/features/home/homeStore'
import { ActivityStore } from '~/features/transactions/activityStore'

export class RootStore {
    authStore: AuthStore
    homeStore: HomeStore
    activityStore: ActivityStore

    constructor() {
        this.authStore = new AuthStore(this)
        this.homeStore = new HomeStore(this)
        this.activityStore = new ActivityStore(this)
    }
}
