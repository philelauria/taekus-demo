import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { User, LoginRequest } from '~/shared/types'
import { mockApi } from '~/shared/services/mockApi'
import { secureStorage } from '~/shared/services/deviceStorage'
import { MOCK_USER } from '~/shared/services/mockData'

interface AuthState {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
    isRestoringSession: boolean
    error: string | null
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    isRestoringSession: true,
    error: null,
}

export const login = createAsyncThunk(
    'auth/login',
    async (credentials: LoginRequest, { rejectWithValue }) => {
        try {
            const response = await mockApi.login(credentials)
            await secureStorage.setAccessToken(response.accessToken)
            await secureStorage.setRefreshToken(response.refreshToken)
            return response
        } catch (error: any) {
            return rejectWithValue(error.message ?? 'Login failed')
        }
    },
)

export const restoreSession = createAsyncThunk(
    'auth/restoreSession',
    async (_, { rejectWithValue }) => {
        try {
            const token = await secureStorage.getAccessToken()
            if (!token) return null
            await new Promise((r) => setTimeout(r, 500))
            return { user: MOCK_USER }
        } catch {
            return rejectWithValue('Session expired')
        }
    },
)

export const logout = createAsyncThunk('auth/logout', async () => {
    await secureStorage.clearTokens()
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError(state) {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isAuthenticated = true
                state.user = action.payload.user
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload as string
            })
            .addCase(restoreSession.pending, (state) => {
                state.isRestoringSession = true
            })
            .addCase(restoreSession.fulfilled, (state, action) => {
                state.isRestoringSession = false
                if (action.payload) {
                    state.isAuthenticated = true
                    state.user = action.payload.user
                }
            })
            .addCase(restoreSession.rejected, (state) => {
                state.isRestoringSession = false
                state.isAuthenticated = false
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
                state.isAuthenticated = false
                state.error = null
            })
    },
})

export const { clearError } = authSlice.actions

export const selectUser = (state: { auth: AuthState }) => state.auth.user
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated
export const selectAuthLoading = (state: { auth: AuthState }) => state.auth.isLoading
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error
export const selectIsRestoringSession = (state: { auth: AuthState }) =>
    state.auth.isRestoringSession

export default authSlice.reducer
