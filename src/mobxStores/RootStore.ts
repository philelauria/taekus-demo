import { AuthStore } from '~/features/auth/authStore'
import { HomeStore } from '~/features/home/homeStore'
import { ActivityStore } from '~/features/transactions/activityStore'
import { CardDetailStore } from '~/features/cards/cardDetailStore'

export class RootStore {
    authStore: AuthStore
    homeStore: HomeStore
    activityStore: ActivityStore
    cardDetailStore: CardDetailStore

    constructor() {
        this.authStore = new AuthStore(this)
        this.homeStore = new HomeStore(this)
        this.activityStore = new ActivityStore(this)
        this.cardDetailStore = new CardDetailStore(this)
    }
}
