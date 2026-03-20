import { makeAutoObservable, runInAction } from 'mobx'
import { Card, Transaction } from '~/shared/types'
import { mockApi } from '~/shared/services/mockApi'
import type { RootStore } from '~/mobxStores/RootStore'

export class CardDetailStore {
    card: Card | null = null
    transactions: Transaction[] = []
    isLoading = false
    isFetching = false
    isToggling = false

    rootStore: RootStore

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
        makeAutoObservable(this, { rootStore: false })
    }

    get isRefreshing() {
        return this.isFetching && !this.isLoading
    }

    async fetchData(cardId: string) {
        this.isFetching = true
        if (!this.card) this.isLoading = true

        try {
            const [cardsResponse, transactionsResponse] = await Promise.all([
                mockApi.getCards(),
                mockApi.getTransactions({ cardId }),
            ])

            runInAction(() => {
                this.card = cardsResponse.data.find((c) => c.id === cardId) ?? null
                this.transactions = transactionsResponse.data
                this.isLoading = false
                this.isFetching = false
            })
        } catch {
            runInAction(() => {
                this.isLoading = false
                this.isFetching = false
            })
        }
    }

    async toggleCardFreeze(cardId: string) {
        if (!this.card) return

        const previousStatus = this.card.status
        // optimistic update
        this.card = { ...this.card, status: previousStatus === 'active' ? 'frozen' : 'active' }
        this.isToggling = true

        try {
            const response = await mockApi.toggleCardFreeze(cardId)
            runInAction(() => {
                this.card = response.data
                this.isToggling = false
                // also update the card in HomeStore so navigation back shows correct state
                const homeCards = this.rootStore.homeStore.cards
                const index = homeCards.findIndex((c) => c.id === cardId)
                if (index !== -1) {
                    this.rootStore.homeStore.cards[index] = response.data
                }
            })
        } catch {
            // rollback
            runInAction(() => {
                if (this.card) {
                    this.card = { ...this.card, status: previousStatus }
                }
                this.isToggling = false
            })
        }
    }
}
