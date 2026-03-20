import { RootStore } from '~/stores/RootStore'

const createStore = () => {
    const rootStore = new RootStore()
    return rootStore.homeStore
}

describe('HomeStore', () => {
    it('should initialize with default state', () => {
        const store = createStore()
        expect(store.cards).toEqual([])
        expect(store.rewards).toBeNull()
        expect(store.hasLoaded).toBe(false)
        expect(store.isLoading).toBe(false)
        expect(store.isFetching).toBe(false)
        expect(store.error).toBeNull()
    })

    it('should compute creditCards and debitCards', () => {
        const store = createStore()
        store.cards = [
            { id: '1', type: 'credit' },
            { id: '2', type: 'debit' },
            { id: '3', type: 'credit' },
        ] as any
        expect(store.creditCards).toHaveLength(2)
        expect(store.debitCards).toHaveLength(1)
    })

    it('should compute isRefreshing correctly', () => {
        const store = createStore()
        expect(store.isRefreshing).toBe(false)

        store.isFetching = true
        store.isLoading = true
        expect(store.isRefreshing).toBe(false)

        store.isLoading = false
        expect(store.isRefreshing).toBe(true)
    })
})

describe('HomeStore.fetchData', () => {
    it('should set loading on first fetch', () => {
        const store = createStore()
        store.fetchData()
        expect(store.isFetching).toBe(true)
        expect(store.isLoading).toBe(true)
    })

    it('should not set isLoading when data has already loaded', () => {
        const store = createStore()
        store.hasLoaded = true
        store.fetchData()
        expect(store.isFetching).toBe(true)
        expect(store.isLoading).toBe(false)
    })

    it('should load cards and rewards on success', async () => {
        const store = createStore()
        await store.fetchData()
        expect(store.cards.length).toBeGreaterThan(0)
        expect(store.rewards).not.toBeNull()
        expect(store.hasLoaded).toBe(true)
        expect(store.isLoading).toBe(false)
        expect(store.isFetching).toBe(false)
        expect(store.error).toBeNull()
    })
})

describe('HomeStore computed values after fetch', () => {
    it('should separate credit and debit cards from fetched data', async () => {
        const store = createStore()
        await store.fetchData()
        const total = store.creditCards.length + store.debitCards.length
        expect(total).toBe(store.cards.length)
        store.creditCards.forEach((c) => expect(c.type).toBe('credit'))
        store.debitCards.forEach((c) => expect(c.type).toBe('debit'))
    })
})
