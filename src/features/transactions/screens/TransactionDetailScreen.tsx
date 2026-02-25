import React from 'react'
import { View } from 'react-native'
import { useRoute, RouteProp } from '@react-navigation/native'

import type { HomeStackParamList } from '~/navigation/types'
import { ScreenWrapper } from '~/shared/components/ScreenWrapper'
import { Text } from '~/shared/components/Text'
import { Card as UICard } from '~/shared/components/Card'
import { useTheme } from '~/shared/hooks/useTheme'
import { formatCurrency, formatDateTime, getCategoryIcon } from '~/shared/services/format'

type TransactionDetailRoute = RouteProp<HomeStackParamList, 'TransactionDetail'>

export const TransactionDetailScreen: React.FC = () => {
    const { theme } = useTheme()
    const route = useRoute<TransactionDetailRoute>()
    const { transaction } = route.params

    const isCredit = transaction.type === 'credit'
    const amountColor = isCredit ? theme.colors.success : theme.colors.textPrimary
    const amountPrefix = isCredit ? '+' : '-'

    return (
        <ScreenWrapper scroll>
            <View style={{ alignItems: 'center', paddingVertical: theme.spacing.xl }}>
                <Text variant="displaySmall">{getCategoryIcon(transaction.merchantCategory)}</Text>
                <Text variant="titleMedium" style={{ marginTop: theme.spacing.md }}>
                    {transaction.merchantName}
                </Text>
                <Text
                    variant="displaySmall"
                    color={amountColor}
                    style={{ marginTop: theme.spacing.sm }}
                >
                    {amountPrefix}
                    {formatCurrency(transaction.amount)}
                </Text>
                {transaction.status === 'pending' && (
                    <View
                        style={{
                            backgroundColor: theme.colors.warning + '20',
                            borderRadius: theme.borderRadius.sm,
                            paddingHorizontal: theme.spacing.md,
                            paddingVertical: theme.spacing.xs,
                            marginTop: theme.spacing.sm,
                        }}
                    >
                        <Text variant="bodySmall" color={theme.colors.warning}>
                            Pending
                        </Text>
                    </View>
                )}
            </View>

            <UICard variant="outlined" style={{ gap: theme.spacing.md }}>
                <DetailRow label="Description" value={transaction.description} theme={theme} />
                <DetailRow label="Date" value={formatDateTime(transaction.date)} theme={theme} />
                <DetailRow label="Category" value={transaction.merchantCategory} theme={theme} />
                <DetailRow label="Status" value={transaction.status} theme={theme} />
                {transaction.rewardsEarned ? (
                    <DetailRow
                        label="Rewards Earned"
                        value={`${transaction.rewardsEarned.toLocaleString()} pts`}
                        theme={theme}
                    />
                ) : null}
            </UICard>
        </ScreenWrapper>
    )
}

const DetailRow: React.FC<{
    label: string
    value: string
    theme: any
}> = ({ label, value, theme }) => (
    <View>
        <Text variant="bodySmall" color={theme.colors.textSecondary}>
            {label}
        </Text>
        <Text variant="bodyMedium" style={{ marginTop: 2 }}>
            {value}
        </Text>
    </View>
)
