import { makeAutoObservable, runInAction } from 'mobx'
import { Card, Transaction } from '~/shared/types'
import { mockApi } from '~/shared/services/mockApi'
import type { RootStore } from '~/stores/RootStore'

export class CardDetailStore {
    activeCardId: string | null = null
    card: Card | null = null
    transactions: Transaction[] = []
    hasLoaded = false
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

        // cache invalidation in case user sets a card detail to card A, then goes back and swtiches to card B
        if (this.activeCardId !== cardId) {
            this.card = null
            this.transactions = []
            this.hasLoaded = false
            this.activeCardId = cardId
        }

        if (!this.hasLoaded) this.isLoading = true

        try {
            const [cardsResponse, transactionsResponse] = await Promise.all([
                mockApi.getCards(),
                mockApi.getTransactions({ cardId }),
            ])

            runInAction(() => {
                this.card = cardsResponse.data.find((c) => c.id === cardId) ?? null
                this.transactions = transactionsResponse.data
                this.hasLoaded = true
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

    reset() {
        this.card = null
        this.transactions = []
        this.hasLoaded = false
        this.isLoading = false
        this.isFetching = false
        this.isToggling = false
    }
}
