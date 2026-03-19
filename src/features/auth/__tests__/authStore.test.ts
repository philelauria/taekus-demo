import { RootStore } from '~/mobxStores/RootStore'

const mockUser = {
    id: 'usr-001',
    email: 'demo@taekus.com',
    firstName: 'Phil',
    lastName: 'Elauria',
}

const createStore = () => {
    const rootStore = new RootStore()
    return rootStore.authStore
}

describe('AuthStore', () => {
    it('should initialize with default state', () => {
        const store = createStore()
        expect(store.user).toBeNull()
        expect(store.isAuthenticated).toBe(false)
        expect(store.isLoading).toBe(false)
        expect(store.isRestoringSession).toBe(true)
        expect(store.error).toBeNull()
    })

    it('should clear error', () => {
        const store = createStore()
        store.error = 'Login failed'
        store.clearError()
        expect(store.error).toBeNull()
    })
})

describe('AuthStore.login', () => {
    it('should set loading on login start', () => {
        const store = createStore()
        store.login({ email: 'test@test.com', password: 'meh' })
        expect(store.isLoading).toBe(true)
        expect(store.error).toBeNull()
    })

    it('should set user and authenticated on success', async () => {
        const store = createStore()
        await store.login({ email: 'demo@taekus.com', password: 'demo' })
        expect(store.isLoading).toBe(false)
        expect(store.isAuthenticated).toBe(true)
        expect(store.user).toEqual(mockUser)
    })

    it('should set error on failure', async () => {
        const store = createStore()
        await store.login({ email: 'wrong@test.com', password: 'wrong' })
        expect(store.isLoading).toBe(false)
        expect(store.error).toBeTruthy()
    })
})

describe('AuthStore.restoreSession', () => {
    it('should not authenticate when no token', async () => {
        const store = createStore()
        await store.restoreSession()
        expect(store.isRestoringSession).toBe(false)
        expect(store.isAuthenticated).toBe(false)
        expect(store.user).toBeNull()
    })
})

describe('AuthStore.logout', () => {
    it('should clear auth state', async () => {
        const store = createStore()
        await store.login({ email: 'demo@taekus.com', password: 'demo' })
        expect(store.isAuthenticated).toBe(true)

        await store.logout()
        expect(store.isAuthenticated).toBe(false)
        expect(store.user).toBeNull()
        expect(store.error).toBeNull()
    })
})
