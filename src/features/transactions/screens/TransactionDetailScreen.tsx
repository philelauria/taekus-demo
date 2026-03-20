import React from 'react'
import { View } from 'react-native'
import { useRoute, RouteProp } from '@react-navigation/native'
import type { HomeStackParamList } from '~/navigation/types'
import { ScreenWrapper } from '~/shared/components/ScreenWrapper'
import { Text } from '~/shared/components/Text'
import { Card as UICard } from '~/shared/components/Card'
import { useColors } from '~/shared/hooks/useColors'
import { formatCurrency, formatDateTime, getCategoryIcon } from '~/shared/services/format'

type TransactionDetailRoute = RouteProp<HomeStackParamList, 'TransactionDetail'>

export const TransactionDetailScreen: React.FC = () => {
    const colors = useColors()
    const route = useRoute<TransactionDetailRoute>()
    const { transaction } = route.params

    const isCredit = transaction.type === 'credit'
    const amountColor = isCredit ? colors.success : colors.textPrimary
    const amountPrefix = isCredit ? '+' : '-'

    return (
        <ScreenWrapper scroll>
            <View className="items-center py-5">
                <Text variant="displaySmall" className="text-text-primary">
                    {getCategoryIcon(transaction.merchantCategory)}
                </Text>
                <Text variant="titleMedium" className="text-text-primary mt-3">
                    {transaction.merchantName}
                </Text>
                <Text variant="displaySmall" className="mt-2" style={{ color: amountColor }}>
                    {amountPrefix}
                    {formatCurrency(transaction.amount)}
                </Text>
                {transaction.status === 'pending' && (
                    <View className="bg-warning-light rounded px-3 py-1 mt-2">
                        <Text variant="bodySmall" className="text-warning">
                            Pending
                        </Text>
                    </View>
                )}
            </View>

            <UICard variant="outlined" className="gap-3">
                <DetailRow label="Description" value={transaction.description} />
                <DetailRow label="Date" value={formatDateTime(transaction.date)} />
                <DetailRow label="Category" value={transaction.merchantCategory} />
                <DetailRow label="Status" value={transaction.status} />
                {transaction.rewardsEarned ? (
                    <DetailRow
                        label="Rewards Earned"
                        value={`${transaction.rewardsEarned.toLocaleString()} pts`}
                    />
                ) : null}
            </UICard>
        </ScreenWrapper>
    )
}

const DetailRow: React.FC<{
    label: string
    value: string
}> = ({ label, value }) => (
    <View>
        <Text variant="bodySmall" className="text-text-secondary">
            {label}
        </Text>
        <Text variant="bodyMedium" className="text-text-primary" style={{ marginTop: 2 }}>
            {value}
        </Text>
    </View>
)
