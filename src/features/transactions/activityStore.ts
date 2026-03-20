import { makeAutoObservable, runInAction } from 'mobx'
import { Transaction } from '~/shared/types'
import { mockApi } from '~/shared/services/mockApi'
import type { RootStore } from '~/stores/RootStore'

export class ActivityStore {
    search = ''
    transactions: Transaction[] = []
    totalCount = 0
    hasLoaded = false
    isLoading = false
    isFetching = false

    rootStore: RootStore

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
        makeAutoObservable(this, { rootStore: false })
    }

    get isRefreshing() {
        return this.isFetching && !this.isLoading
    }

    setSearch(value: string) {
        this.search = value
        this.fetchTransactions()
    }

    async fetchTransactions() {
        this.isFetching = true
        if (!this.hasLoaded) this.isLoading = true

        try {
            const params = this.search.trim()
                ? { search: this.search.trim(), limit: 10000 }
                : { limit: 10000 }
            const response = await mockApi.getTransactions(params)

            runInAction(() => {
                this.transactions = response.data
                this.totalCount = response.meta?.totalCount ?? response.data.length
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

    reset() {
        this.search = ''
        this.transactions = []
        this.totalCount = 0
        this.hasLoaded = false
        this.isLoading = false
        this.isFetching = false
    }
}
