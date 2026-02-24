import { LoginRequest, LoginResponse, GetTransactionsParams, ApiResponse } from '../types/api'
import { Card, Transaction, RewardsBalance } from '../types/models'

export interface ApiService {
    login(req: LoginRequest): Promise<LoginResponse>
    refreshToken(token: string): Promise<{ accessToken: string }>
    getCards(): Promise<ApiResponse<Card[]>>
    getTransactions(params?: GetTransactionsParams): Promise<ApiResponse<Transaction[]>>
    toggleCardFreeze(cardId: string): Promise<ApiResponse<Card>>
    getRewards(): Promise<ApiResponse<RewardsBalance>>
}
