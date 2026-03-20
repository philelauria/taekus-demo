import { makeAutoObservable, runInAction } from 'mobx'
import { Card, RewardsBalance } from '~/shared/types'
import { mockApi } from '~/shared/services/mockApi'
import type { RootStore } from '~/mobxStores/RootStore'

export class HomeStore {
    cards: Card[] = []
    rewards: RewardsBalance | null = null
    isLoading = false
    isFetching = false
    error: string | null = null

    rootStore: RootStore

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
        makeAutoObservable(this, { rootStore: false })
    }

    get creditCards() {
        return this.cards.filter((c) => c.type === 'credit')
    }

    get debitCards() {
        return this.cards.filter((c) => c.type === 'debit')
    }

    get isRefreshing() {
        return this.isFetching && !this.isLoading
    }

    async fetchData() {
        this.isFetching = true
        if (this.cards.length === 0) this.isLoading = true
        this.error = null

        try {
            const [cardsResponse, rewardsResponse] = await Promise.all([
                mockApi.getCards(),
                mockApi.getRewards(),
            ])

            runInAction(() => {
                this.cards = cardsResponse.data
                this.rewards = rewardsResponse.data
                this.isLoading = false
                this.isFetching = false
            })
        } catch (e: any) {
            runInAction(() => {
                this.error = e.message ?? 'Failed to load data'
                this.isLoading = false
                this.isFetching = false
            })
        }
    }
}
