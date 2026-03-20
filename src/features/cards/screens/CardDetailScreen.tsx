import React, { useState, useCallback, useMemo, useEffect } from 'react'
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
import { PaymentCardTile } from '~/shared/components/PaymentCardTile'
import { formatCardExpiry } from '~/shared/services/format'
import { observer } from 'mobx-react-lite'
import { useStores } from '~/mobxStores/StoreProvider'

type CardDetailRoute = RouteProp<HomeStackParamList, 'CardDetail'>
type CardDetailNav = NativeStackNavigationProp<HomeStackParamList, 'CardDetail'>

export const CardDetailScreen: React.FC = observer(() => {
    const { cardDetailStore } = useStores()
    const route = useRoute<CardDetailRoute>()
    const navigation = useNavigation<CardDetailNav>()

    useEffect(() => {
        cardDetailStore.fetchData(route.params.card.id)
    }, [cardDetailStore, route.params.card.id])

    const [revealedNumber, setRevealedNumber] = useState<string | null>(null)
    const [revealedCvv, setRevealedCvv] = useState<string | null>(null)

    const displayCard = cardDetailStore.card ?? route.params.card
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
        await cardDetailStore.toggleCardFreeze(route.params.card.id)
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    }, [cardDetailStore, route.params.card.id])

    const goToTransaction = (transaction: Transaction) => {
        navigation.navigate('TransactionDetail', { transaction })
    }

    const renderHeader = useMemo(
        () => (
            <View className="gap-4 pb-3">
                <PaymentCardTile card={displayCard} onPress={() => {}} />

                <View className="flex-row gap-3">
                    <View className="flex-1">
                        <Button
                            label={isFrozen ? 'Unfreeze Card' : 'Freeze Card'}
                            variant={isFrozen ? 'primary' : 'danger'}
                            onPress={handleFreeze}
                            loading={cardDetailStore.isToggling}
                            fullWidth
                        />
                    </View>
                    <View className="flex-1">
                        <Button
                            label={revealedNumber ? 'Hide Number' : 'Reveal'}
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
                        <Text variant="bodySmall" className="text-text-secondary">
                            Card Number
                        </Text>
                        <Text variant="titleMedium" className="mt-1">
                            {revealedNumber}
                        </Text>
                        <View className="flex-row mt-3 gap-6">
                            <View>
                                <Text variant="bodySmall" className="text-text-secondary">
                                    Expiry
                                </Text>
                                <Text variant="titleMedium" className="text-text-primary mt-1">
                                    {formatCardExpiry(
                                        displayCard.expiryMonth,
                                        displayCard.expiryYear,
                                    )}
                                </Text>
                            </View>
                            <View>
                                <Text variant="bodySmall" className="text-text-secondary">
                                    CVV
                                </Text>
                                <Text variant="titleMedium" className="text-text-primary mt-1">
                                    {revealedCvv}
                                </Text>
                            </View>
                        </View>
                    </UICard>
                )}

                <Text variant="titleMedium" className="text-text-primary mt-2">
                    Recent Transactions
                </Text>
            </View>
        ),
        [displayCard, isFrozen, cardDetailStore.isToggling, revealedNumber, revealedCvv],
    )

    return (
        <ScreenWrapper>
            <FlatList
                data={cardDetailStore.transactions}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TransactionRow transaction={item} onPress={() => goToTransaction(item)} />
                )}
                ListHeaderComponent={renderHeader}
                ListEmptyComponent={
                    <Text variant="bodyMedium" className="text-text-secondary text-center pt-4">
                        {cardDetailStore.isLoading
                            ? 'Loading transactions...'
                            : 'No transactions yet'}
                    </Text>
                }
                refreshing={cardDetailStore.isRefreshing}
                onRefresh={() => cardDetailStore.fetchData(route.params.card.id)}
                contentContainerStyle={{ padding: 16 }}
            />
        </ScreenWrapper>
    )
})
