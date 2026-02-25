import React from 'react'
import { View, Pressable, StyleSheet } from 'react-native'
import type { Transaction } from '~/shared/types'
import { Text } from '~/shared/components/Text'
import { useTheme } from '~/shared/hooks/useTheme'
import { formatCurrency, formatDate, getCategoryIcon } from '~/shared/services/format'

type Props = {
    transaction: Transaction
    onPress: () => void
}

export const TransactionRow: React.FC<Props> = ({ transaction, onPress }) => {
    const { theme } = useTheme()

    const isCredit = transaction.type === 'credit'
    const amountColor = isCredit ? theme.colors.success : theme.colors.textPrimary
    const amountPrefix = isCredit ? '+' : '-'

    return (
        <Pressable
            onPress={onPress}
            accessibilityRole="button"
            accessibilityLabel={`${transaction.merchantName}, ${amountPrefix}${formatCurrency(transaction.amount)}`}
            style={({ pressed }) => [
                styles.container,
                {
                    paddingVertical: theme.spacing.md,
                    paddingHorizontal: theme.spacing.lg,
                    backgroundColor: pressed ? theme.colors.backgroundSecondary : 'transparent',
                },
            ]}
        >
            <View style={styles.iconContainer}>
                <Text variant="titleMedium">{getCategoryIcon(transaction.merchantCategory)}</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.topRow}>
                    <Text variant="bodyMedium" style={styles.merchantName} numberOfLines={1}>
                        {transaction.merchantName}
                    </Text>
                    <Text variant="bodyMedium" color={amountColor}>
                        {amountPrefix}
                        {formatCurrency(transaction.amount)}
                    </Text>
                </View>

                <View style={styles.bottomRow}>
                    <Text variant="bodySmall" color={theme.colors.textSecondary} numberOfLines={1}>
                        {transaction.description}
                    </Text>
                    <Text variant="bodySmall" color={theme.colors.textSecondary}>
                        {formatDate(transaction.date)}
                    </Text>
                </View>

                {transaction.status === 'pending' && (
                    <View
                        style={[
                            styles.pendingBadge,
                            {
                                backgroundColor:
                                    theme.colors.warningLight ?? theme.colors.warning + '20',
                                borderRadius: theme.borderRadius.sm,
                                marginTop: theme.spacing.xs,
                            },
                        ]}
                    >
                        <Text variant="bodySmall" color={theme.colors.warning}>
                            Pending
                        </Text>
                    </View>
                )}
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    content: {
        flex: 1,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 2,
    },
    merchantName: {
        flex: 1,
        marginRight: 12,
    },
    pendingBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 2,
    },
})
