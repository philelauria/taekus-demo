import { RootStore } from '~/stores/RootStore'

const mockUser = {
    id: 'usr-001',
    email: 'demo@taekus.com',
    firstName: 'Phil',
    lastName: 'Elauria',
}

const createStore = () => {
    const rootStore = new RootStore()
    return { authStore: rootStore.authStore, rootStore }
}

describe('AuthStore', () => {
    it('should initialize with default state', () => {
        const { authStore } = createStore()
        expect(authStore.user).toBeNull()
        expect(authStore.isAuthenticated).toBe(false)
        expect(authStore.isLoading).toBe(false)
        expect(authStore.isRestoringSession).toBe(true)
        expect(authStore.error).toBeNull()
    })

    it('should clear error', () => {
        const { authStore } = createStore()
        authStore.error = 'Login failed'
        authStore.clearError()
        expect(authStore.error).toBeNull()
    })
})

describe('AuthStore.login', () => {
    it('should set loading on login start', () => {
        const { authStore } = createStore()
        authStore.login({ email: 'test@test.com', password: 'meh' })
        expect(authStore.isLoading).toBe(true)
        expect(authStore.error).toBeNull()
    })

    it('should set user and authenticated on success', async () => {
        const { authStore } = createStore()
        await authStore.login({ email: 'demo@taekus.com', password: 'demo' })
        expect(authStore.isLoading).toBe(false)
        expect(authStore.isAuthenticated).toBe(true)
        expect(authStore.user).toEqual(mockUser)
    })

    it('should set error on failure', async () => {
        const { authStore } = createStore()
        await authStore.login({ email: 'wrong@test.com', password: 'wrong' })
        expect(authStore.isLoading).toBe(false)
        expect(authStore.error).toBeTruthy()
    })
})

describe('AuthStore.restoreSession', () => {
    it('should not authenticate when no token', async () => {
        const { authStore } = createStore()
        await authStore.restoreSession()
        expect(authStore.isRestoringSession).toBe(false)
        expect(authStore.isAuthenticated).toBe(false)
        expect(authStore.user).toBeNull()
    })
})

describe('AuthStore.logout', () => {
    it('should clear auth state and trigger global data reset', async () => {
        const { authStore, rootStore } = createStore()
        const resetSpy = jest.spyOn(rootStore, 'reset')

        await authStore.login({ email: 'demo@taekus.com', password: 'demo' })
        expect(authStore.isAuthenticated).toBe(true)

        await authStore.logout()
        expect(authStore.isAuthenticated).toBe(false)
        expect(authStore.user).toBeNull()
        expect(authStore.error).toBeNull()

        expect(resetSpy).toHaveBeenCalledTimes(1)
    })
})
