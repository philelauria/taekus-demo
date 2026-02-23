import { User, Card, Transaction, RewardsBalance } from './models'

export interface ApiResponse<T> {
    data: T
    meta?: {
        page?: number
        totalPages?: number
        totalCount?: number
    }
}

export interface ApiError {
    code: string
    message: string
    field?: string
}

export interface LoginRequest {
    email: string
    password: string
}

export interface LoginResponse {
    accessToken: string
    refreshToken: string
    expiresIn: number
    user: User
}

export interface GetTransactionsParams {
    cardId?: string
    page?: number
    limit?: number
    search?: string
}

export type GetCardsResponse = ApiResponse<Card[]>
export type GetTransactionsResponse = ApiResponse<Transaction[]>
export type GetRewardsResponse = ApiResponse<RewardsBalance>
export type ToggleFreezeResponse = ApiResponse<Card>
