import authReducer, { login, logout, restoreSession, clearError } from '../slice'

const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    isRestoringSession: true,
    error: null,
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
