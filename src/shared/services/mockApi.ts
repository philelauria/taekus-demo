import { ApiService } from './ApiService'
import { LoginRequest, LoginResponse, GetTransactionsParams, ApiResponse } from '../types/api'
import { Card, Transaction, RewardsBalance } from '../types/models'
import {
    MOCK_USER,
    MOCK_CARDS,
    MOCK_TRANSACTIONS,
    MOCK_TRANSACTIONS_LARGE,
    MOCK_REWARDS,
} from './mockData'

const DEMO_EMAIL = 'demo@taekus.com'
const DEMO_PASSWORD = 'demo'

const delay = (ms?: number) =>
    new Promise((resolve) => setTimeout(resolve, ms ?? 300 + Math.random() * 500))

// Mutable copy so freeze/unfreeze persists during the session
let cards = [...MOCK_CARDS]

export const mockApi: ApiService = {
    login: async (req: LoginRequest): Promise<LoginResponse> => {
        await delay(600)

        const email = req.email?.trim().toLowerCase()
        const password = req.password?.trim()

        if (!req.email || !req.password) {
            throw { code: 'INVALID_CREDENTIALS', message: 'Email and password are required' }
        }

        if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
            throw {
                code: 'INVALID_CREDENTIALS',
                message: `Invalid email or password\nEmail: ${DEMO_EMAIL}\nPassword: ${DEMO_PASSWORD}`,
            }
        }

        return {
            accessToken: `fake-jwt-${Date.now()}`,
            refreshToken: `fake-refresh-${Date.now()}`,
            expiresIn: 3600,
            user: MOCK_USER,
        }
    },

    refreshToken: async (token: string): Promise<{ accessToken: string }> => {
        await delay(300)
        return { accessToken: `fake-jwt-refreshed-${Date.now()}` }
    },

    getCards: async (): Promise<ApiResponse<Card[]>> => {
        await delay()
        return { data: cards.map((c) => ({ ...c })) }
    },

    getTransactions: async (
        params?: GetTransactionsParams,
    ): Promise<ApiResponse<Transaction[]>> => {
        await delay()
        const useLarge = !params?.cardId
        let transactions = useLarge ? [...MOCK_TRANSACTIONS_LARGE] : [...MOCK_TRANSACTIONS]

        if (params?.cardId) {
            transactions = transactions.filter((t) => t.cardId === params.cardId)
        }

        if (params?.search) {
            const query = params.search.toLowerCase()
            transactions = transactions.filter(
                (t) =>
                    t.merchantName.toLowerCase().includes(query) ||
                    t.description.toLowerCase().includes(query),
            )
        }

        const page = params?.page ?? 1
        const limit = params?.limit ?? 20
        const start = (page - 1) * limit
        const paginated = transactions.slice(start, start + limit)

        return {
            data: paginated,
            meta: {
                page,
                totalPages: Math.ceil(transactions.length / limit),
                totalCount: transactions.length,
            },
        }
    },

    toggleCardFreeze: async (cardId: string): Promise<ApiResponse<Card>> => {
        await delay(500)
        const index = cards.findIndex((c) => c.id === cardId)
        if (index === -1) {
            throw { code: 'NOT_FOUND', message: `Card ${cardId} not found` }
        }
        const current = cards[index]
        const newStatus = current.status === 'active' ? 'frozen' : 'active'
        const updated = { ...current, status: newStatus } as Card
        cards = cards.map((c) => (c.id === cardId ? updated : c))
        return { data: { ...updated } }
    },

    getRewards: async (): Promise<ApiResponse<RewardsBalance>> => {
        await delay()
        return { data: MOCK_REWARDS }
    },
}
