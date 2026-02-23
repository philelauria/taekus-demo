export interface User {
    id: string
    email: string
    firstName: string
    lastName: string
    avatarUrl?: string
}

export type CardType = 'credit' | 'debit'
export type CardStatus = 'active' | 'frozen'

interface CardBase {
    id: string
    name: string
    lastFour: string
    status: CardStatus
    cardNumber?: string
    expiryMonth: number
    expiryYear: number
    cvv?: string
}

interface CreditCard extends CardBase {
    type: 'credit'
    balance: number
    creditLimit: number
    availableCredit: number
    minimumPayment: number
    paymentDueDate: string
    apr: number
}

interface DebitCard extends CardBase {
    type: 'debit'
    availableBalance: number
}

export type Card = CreditCard | DebitCard

export type MerchantCategory =
    | 'travel'
    | 'dining'
    | 'shopping'
    | 'transport'
    | 'entertainment'
    | 'groceries'
    | 'bills'
    | 'transfer'
    | 'other'

export interface Transaction {
    id: string
    cardId: string
    amount: number
    type: 'credit' | 'debit'
    status: 'pending' | 'completed' | 'failed'
    merchantName: string
    merchantCategory: MerchantCategory
    description: string
    date: string
    rewardsEarned?: number
}

export type RewardsTier = 'standard' | 'gold' | 'platinum'

export interface CategoryEarning {
    category: MerchantCategory
    points: number
    multiplier: number
}

export interface RewardsBalance {
    points: number
    cashValue: number
    tier: RewardsTier
    pendingPoints: number
    yearToDate: number
    categoryEarnings: CategoryEarning[]
}
