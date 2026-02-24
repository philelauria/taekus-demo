import authReducer, { login, logout, restoreSession, clearError } from '../slice'

const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    isRestoringSession: true,
    error: null,
}

const mockUser = {
    id: 'usr-001',
    email: 'demo@taekus.com',
    firstName: 'Phil',
    lastName: 'Elauria',
}

describe('auth slice', () => {
    it('should return initial state', () => {
        expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState)
    })

    it('should clear error', () => {
        const stateWithError = { ...initialState, error: 'Login failed' }
        expect(authReducer(stateWithError, clearError())).toEqual({
            ...stateWithError,
            error: null,
        })
    })
})

describe('login thunk', () => {
    it('should set loading on pending', () => {
        const state = authReducer(initialState, login.pending('', { email: '', password: '' }))
        expect(state.isLoading).toBe(true)
        expect(state.error).toBeNull()
    })

    it('should set user and authenticated on fulfilled', () => {
        const payload = {
            accessToken: 'fake-token',
            refreshToken: 'fake-refresh',
            expiresIn: 3600,
            user: mockUser,
        }
        const state = authReducer(
            initialState,
            login.fulfilled(payload, '', { email: '', password: '' }),
        )
        expect(state.isLoading).toBe(false)
        expect(state.isAuthenticated).toBe(true)
        expect(state.user).toEqual(mockUser)
    })

    it('should set error on rejected', () => {
        const state = authReducer(
            initialState,
            login.rejected(null, '', { email: '', password: '' }, 'Invalid credentials'),
        )
        expect(state.isLoading).toBe(false)
        expect(state.error).toBe('Invalid credentials')
    })
})

describe('restoreSession thunk', () => {
    it('should set restoring on pending', () => {
        const state = authReducer(
            { ...initialState, isRestoringSession: false },
            restoreSession.pending(''),
        )
        expect(state.isRestoringSession).toBe(true)
    })

    it('should authenticate when token exists', () => {
        const state = authReducer(initialState, restoreSession.fulfilled({ user: mockUser }, ''))
        expect(state.isRestoringSession).toBe(false)
        expect(state.isAuthenticated).toBe(true)
        expect(state.user).toEqual(mockUser)
    })

    it('should not authenticate when no token', () => {
        const state = authReducer(initialState, restoreSession.fulfilled(null, ''))
        expect(state.isRestoringSession).toBe(false)
        expect(state.isAuthenticated).toBe(false)
        expect(state.user).toBeNull()
    })
})

describe('logout thunk', () => {
    it('should clear auth state', () => {
        const loggedInState = {
            ...initialState,
            isAuthenticated: true,
            isRestoringSession: false,
            user: mockUser,
        }
        const state = authReducer(loggedInState, logout.fulfilled(undefined, ''))
        expect(state.isAuthenticated).toBe(false)
        expect(state.user).toBeNull()
        expect(state.error).toBeNull()
    })
})
