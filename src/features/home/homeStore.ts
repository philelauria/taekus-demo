import { makeAutoObservable, runInAction } from 'mobx'
import { Card, RewardsBalance } from '~/shared/types'
import { mockApi } from '~/shared/services/mockApi'
import type { RootStore } from '~/stores/RootStore'

export class HomeStore {
    cards: Card[] = []
    rewards: RewardsBalance | null = null
    hasLoaded = false
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
        if (!this.hasLoaded) this.isLoading = true
        this.error = null

        try {
            const [cardsResponse, rewardsResponse] = await Promise.all([
                mockApi.getCards(),
                mockApi.getRewards(),
            ])

            runInAction(() => {
                this.cards = cardsResponse.data
                this.rewards = rewardsResponse.data
                this.hasLoaded = true
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

    reset() {
        this.cards = []
        this.rewards = null
        this.hasLoaded = false
        this.isLoading = false
        this.isFetching = false
        this.error = null
    }
}
