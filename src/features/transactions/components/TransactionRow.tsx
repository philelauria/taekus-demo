import React, { useState } from 'react'
import { View, Pressable, StyleSheet } from 'react-native'
import type { Transaction } from '~/shared/types'
import { Text } from '~/shared/components/Text'
import { useColors } from '~/shared/hooks/useColors'
import { formatCurrency, formatDate, getCategoryIcon } from '~/shared/services/format'

type Props = {
    transaction: Transaction
    onPress: () => void
}

export const TransactionRow: React.FC<Props> = ({ transaction, onPress }) => {
    const colors = useColors()
    const [pressed, setPressed] = useState(false)

    const isCredit = transaction.type === 'credit'
    const amountColor = isCredit ? colors.success : colors.textPrimary
    const amountPrefix = isCredit ? '+' : '-'

    return (
        <Pressable
            onPress={onPress}
            onPressIn={() => setPressed(true)}
            onPressOut={() => setPressed(false)}
            accessibilityRole="button"
            accessibilityLabel={`${transaction.merchantName}, ${amountPrefix}${formatCurrency(transaction.amount)}`}
            className="flex-row items-center py-3 px-4"
            style={StyleSheet.flatten([
                { backgroundColor: pressed ? colors.backgroundSecondary : 'transparent' },
            ])}
        >
            <View className="w-10 h-10 justify-center items-center mr-3">
                <Text variant="titleMedium" className="text-text-primary">
                    {getCategoryIcon(transaction.merchantCategory)}
                </Text>
            </View>

            <View className="flex-1">
                <View className="flex-row justify-between items-center">
                    <Text
                        variant="bodyMedium"
                        className="text-text-primary flex-1 mr-3"
                        numberOfLines={1}
                    >
                        {transaction.merchantName}
                    </Text>
                    <Text variant="bodyMedium" style={{ color: amountColor }}>
                        {amountPrefix}
                        {formatCurrency(transaction.amount)}
                    </Text>
                </View>

                <View className="flex-row justify-between items-center mt-0.5">
                    <Text variant="bodySmall" className="text-text-secondary" numberOfLines={1}>
                        {transaction.description}
                    </Text>
                    <Text variant="bodySmall" className="text-text-secondary">
                        {formatDate(transaction.date)}
                    </Text>
                </View>

                {transaction.status === 'pending' && (
                    <View className="self-start bg-warning-light rounded px-2 py-0.5 mt-1">
                        <Text variant="bodySmall" className="text-warning">
                            Pending
                        </Text>
                    </View>
                )}
            </View>
        </Pressable>
    )
}
