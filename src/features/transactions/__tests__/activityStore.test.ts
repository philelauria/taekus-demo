import { RootStore } from '~/stores/RootStore'

const createStore = () => {
    const rootStore = new RootStore()
    return rootStore.activityStore
}

describe('ActivityStore', () => {
    it('should initialize with default state', () => {
        const store = createStore()
        expect(store.search).toBe('')
        expect(store.transactions).toEqual([])
        expect(store.totalCount).toBe(0)
        expect(store.hasLoaded).toBe(false)
        expect(store.isLoading).toBe(false)
        expect(store.isFetching).toBe(false)
    })
})

describe('ActivityStore.fetchTransactions', () => {
    it('should bypass isLoading on subsequent background fetches', async () => {
        const store = createStore()

        store.fetchTransactions()
        expect(store.isLoading).toBe(true)

        await store.fetchTransactions()
        expect(store.hasLoaded).toBe(true)

        store.fetchTransactions()
        expect(store.isLoading).toBe(false)
        expect(store.isFetching).toBe(true)
    })

    it('should trigger fetch when search is updated', () => {
        const store = createStore()
        const fetchSpy = jest.spyOn(store, 'fetchTransactions')

        store.setSearch('I need coffee')

        expect(store.search).toBe('I need coffee')
        expect(fetchSpy).toHaveBeenCalledTimes(1)
    })
})
