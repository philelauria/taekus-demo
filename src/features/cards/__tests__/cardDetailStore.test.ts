import { RootStore } from '~/stores/RootStore'

const createStores = async () => {
    const rootStore = new RootStore()
    // fetch home data first so HomeStore has cards for cross-store sync test
    await rootStore.homeStore.fetchData()
    return rootStore
}

describe('CardDetailStore', () => {
    it('should initialize with default state', () => {
        const rootStore = new RootStore()
        const store = rootStore.cardDetailStore
        expect(store.activeCardId).toBeNull()
        expect(store.card).toBeNull()
        expect(store.transactions).toEqual([])
        expect(store.hasLoaded).toBe(false)
        expect(store.isLoading).toBe(false)
        expect(store.isFetching).toBe(false)
        expect(store.isToggling).toBe(false)
    })
})

describe('CardDetailStore.fetchData', () => {
    it('should load card and transactions', async () => {
        const rootStore = await createStores()
        const store = rootStore.cardDetailStore
        const cardId = rootStore.homeStore.cards[0].id

        await store.fetchData(cardId)
        expect(store.card).not.toBeNull()
        expect(store.card?.id).toBe(cardId)
        expect(store.isLoading).toBe(false)
        expect(store.isFetching).toBe(false)
    })
})

describe('CardDetailStore.toggleCardFreeze', () => {
    it('should optimistically update card status', async () => {
        const rootStore = await createStores()
        const store = rootStore.cardDetailStore
        const cardId = rootStore.homeStore.cards[0].id

        await store.fetchData(cardId)
        const originalStatus = store.card?.status

        // start the toggle but don't await yet
        const togglePromise = store.toggleCardFreeze(cardId)

        // optimistic update should be immediate
        expect(store.card?.status).not.toBe(originalStatus)
        expect(store.isToggling).toBe(true)

        await togglePromise
        expect(store.isToggling).toBe(false)
    })

    it('should toggle between active and frozen', async () => {
        const rootStore = await createStores()
        const store = rootStore.cardDetailStore
        const cardId = rootStore.homeStore.cards[0].id

        await store.fetchData(cardId)
        const originalStatus = store.card?.status

        await store.toggleCardFreeze(cardId)
        expect(store.card?.status).not.toBe(originalStatus)

        await store.toggleCardFreeze(cardId)
        expect(store.card?.status).toBe(originalStatus)
    })

    it('should sync updated card to HomeStore', async () => {
        const rootStore = await createStores()
        const store = rootStore.cardDetailStore
        const cardId = rootStore.homeStore.cards[0].id

        await store.fetchData(cardId)
        const originalStatus = rootStore.homeStore.cards[0].status

        await store.toggleCardFreeze(cardId)

        const homeCard = rootStore.homeStore.cards.find((c) => c.id === cardId)
        expect(homeCard?.status).not.toBe(originalStatus)
    })
})
