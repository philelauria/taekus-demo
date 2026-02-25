import React, { useState, useCallback } from 'react'
import { View, FlatList } from 'react-native'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import * as LocalAuthentication from 'expo-local-authentication'
import * as Haptics from 'expo-haptics'

import type { HomeStackParamList } from '~/navigation/types'
import type { Transaction } from '~/shared/types'
import { ScreenWrapper } from '~/shared/components/ScreenWrapper'
import { Text } from '~/shared/components/Text'
import { Button } from '~/shared/components/Button'
import { Card as UICard } from '~/shared/components/Card'
import { TransactionRow } from '~/features/transactions/components/TransactionRow'
import { PaymentCardTile } from '~/features/home/components/PaymentCardTile'
import { useTheme } from '~/shared/hooks/useTheme'
import { useCardDetailData } from '~/features/cards/hooks/useCardDetailData'
import { formatCurrency, formatCardExpiry } from '~/shared/services/format'

type CardDetailRoute = RouteProp<HomeStackParamList, 'CardDetail'>
type CardDetailNav = NativeStackNavigationProp<HomeStackParamList, 'CardDetail'>

export const CardDetailScreen: React.FC = () => {
    const { theme } = useTheme()
    const route = useRoute<CardDetailRoute>()
    const navigation = useNavigation<CardDetailNav>()

    const { card, transactions, isLoading, isRefreshing, isToggling, handleToggleFreeze, refetch } =
        useCardDetailData(route.params.card.id)

    const [revealedNumber, setRevealedNumber] = useState<string | null>(null)
    const [revealedCvv, setRevealedCvv] = useState<string | null>(null)

    const displayCard = card ?? route.params.card
    const isFrozen = displayCard.status === 'frozen'

    const handleRevealCard = useCallback(async () => {
        const result = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Verify identity to reveal card details',
            cancelLabel: 'Cancel',
            disableDeviceFallback: false,
        })

        if (result.success) {
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
            setRevealedNumber('4821 7293 0058 4821')
            setRevealedCvv('847')
        }
    }, [])

    const handleFreeze = useCallback(async () => {
        await handleToggleFreeze()
        await Haptics.impactAsync(Haptics.ImpactFeedbackType.Medium)
    }, [handleToggleFreeze])

    const goToTransaction = (transaction: Transaction) => {
        navigation.navigate('TransactionDetail', { transaction })
    }

    const renderHeader = () => (
        <View style={{ gap: theme.spacing.lg, paddingBottom: theme.spacing.md }}>
            <PaymentCardTile card={displayCard} onPress={() => {}} />

            <View style={{ flexDirection: 'row', gap: theme.spacing.md }}>
                <View style={{ flex: 1 }}>
                    <Button
                        label={isFrozen ? 'Unfreeze Card' : 'Freeze Card'}
                        variant={isFrozen ? 'primary' : 'danger'}
                        onPress={handleFreeze}
                        loading={isToggling}
                        fullWidth
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Button
                        label={revealedNumber ? 'Hide Number' : 'Show Number'}
                        variant="secondary"
                        onPress={
                            revealedNumber
                                ? () => {
                                      setRevealedNumber(null)
                                      setRevealedCvv(null)
                                  }
                                : handleRevealCard
                        }
                        fullWidth
                    />
                </View>
            </View>

            {revealedNumber && (
                <UICard variant="outlined">
                    <Text variant="bodySmall" color={theme.colors.textSecondary}>
                        Card Number
                    </Text>
                    <Text variant="titleMedium" style={{ marginTop: theme.spacing.xs }}>
                        {revealedNumber}
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: theme.spacing.md,
                            gap: theme.spacing['2xl'],
                        }}
                    >
                        <View>
                            <Text variant="bodySmall" color={theme.colors.textSecondary}>
                                Expiry
                            </Text>
                            <Text variant="titleMedium" style={{ marginTop: theme.spacing.xs }}>
                                {formatCardExpiry(displayCard.expiryMonth, displayCard.expiryYear)}
                            </Text>
                        </View>
                        <View>
                            <Text variant="bodySmall" color={theme.colors.textSecondary}>
                                CVV
                            </Text>
                            <Text variant="titleMedium" style={{ marginTop: theme.spacing.xs }}>
                                {revealedCvv}
                            </Text>
                        </View>
                    </View>
                </UICard>
            )}

            <Text variant="titleMedium" style={{ marginTop: theme.spacing.sm }}>
                Recent Transactions
            </Text>
        </View>
    )

    return (
        <ScreenWrapper>
            <FlatList
                data={transactions}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TransactionRow transaction={item} onPress={() => goToTransaction(item)} />
                )}
                ListHeaderComponent={renderHeader}
                ListEmptyComponent={
                    <Text
                        variant="bodyMedium"
                        color={theme.colors.textSecondary}
                        align="center"
                        style={{ paddingTop: theme.spacing.lg }}
                    >
                        {isLoading ? 'Loading transactions...' : 'No transactions yet'}
                    </Text>
                }
                refreshing={isRefreshing}
                onRefresh={refetch}
                contentContainerStyle={{ padding: theme.spacing.lg }}
            />
        </ScreenWrapper>
    )
}
