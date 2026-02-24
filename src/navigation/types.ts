import type { Card, Transaction } from '~/shared/types'

export type AuthStackParamList = {
    Login: undefined
}

export type HomeStackParamList = {
    HomeScreen: undefined
    CardDetail: { card: Card }
    TransactionDetail: { transaction: Transaction }
}

export type ActivityStackParamList = {
    ActivityScreen: undefined
    TransactionDetail: { transaction: Transaction }
}

export type MainTabParamList = {
    Home: undefined
    Activity: undefined
    Rewards: undefined
    Settings: undefined
}
