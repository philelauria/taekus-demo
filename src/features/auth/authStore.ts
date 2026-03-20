import { makeAutoObservable, runInAction } from 'mobx'
import { User, LoginRequest } from '~/shared/types'
import { mockApi } from '~/shared/services/mockApi'
import { secureStorage } from '~/shared/services/deviceStorage'
import { MOCK_USER } from '~/shared/services/mockData'
import type { RootStore } from '~/stores/RootStore'

export class AuthStore {
    user: User | null = null
    isAuthenticated = false
    isLoading = false
    isRestoringSession = true
    error: string | null = null

    rootStore: RootStore

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
        makeAutoObservable(this, {
            rootStore: false,
        })
    }

    async login(credentials: LoginRequest) {
        this.isLoading = true
        this.error = null
        try {
            const response = await mockApi.login(credentials)
            await secureStorage.setAccessToken(response.accessToken)
            await secureStorage.setRefreshToken(response.refreshToken)

            runInAction(() => {
                this.isAuthenticated = true
                this.user = response.user
                this.isLoading = false
            })
        } catch (error: any) {
            runInAction(() => {
                this.error = error.message ?? 'Login failed'
                this.isLoading = false
            })
        }
    }

    async restoreSession() {
        this.isRestoringSession = true
        try {
            const token = await secureStorage.getAccessToken()
            if (!token) {
                runInAction(() => {
                    this.isRestoringSession = false
                })
                return
            }
            await new Promise((r) => setTimeout(r, 500))

            runInAction(() => {
                this.isAuthenticated = true
                this.user = MOCK_USER
                this.isRestoringSession = false
            })
        } catch {
            runInAction(() => {
                this.isAuthenticated = false
                this.user = null
                this.isRestoringSession = false
            })
        }
    }

    async logout() {
        await secureStorage.clearTokens()

        runInAction(() => {
            this.user = null
            this.isAuthenticated = false
            this.error = null
        })

        if (typeof this.rootStore.reset === 'function') {
            this.rootStore.reset()
        }
    }

    clearError() {
        this.error = null
    }
}
