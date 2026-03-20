import React, { useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Animated, { FadeInDown, Easing } from 'react-native-reanimated'
import type { Card } from '~/shared/types'
import type { HomeStackParamList } from '~/navigation/types'
import { ScreenWrapper } from '~/shared/components/ScreenWrapper'
import { Text } from '~/shared/components/Text'
import { Card as UICard } from '~/shared/components/Card'
import { PaymentCardTile } from '~/shared/components/PaymentCardTile'
import { observer } from 'mobx-react-lite'
import { useStores } from '~/stores/StoreProvider'

type HomeNav = NativeStackNavigationProp<HomeStackParamList, 'HomeScreen'>

const formatCurrency = (n: number) => `$${n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`

export const HomeScreen: React.FC = observer(() => {
    const navigation = useNavigation<HomeNav>()
    const { homeStore } = useStores()

    const goToCardDetail = (card: Card) => {
        navigation.navigate('CardDetail', { card })
    }

    useEffect(() => {
        homeStore.fetchData()
    }, [homeStore])

    return (
        <ScreenWrapper
            scroll
            refreshing={homeStore.isRefreshing}
            onRefresh={homeStore.fetchData}
            contentStyle={{ gap: 16 }}
        >
            <View>
                <Text variant="displaySmall" className="text-text-primary">
                    Accounts
                </Text>
                <Text variant="bodyMedium" className="text-text-secondary mt-2">
                    Tap a card to view details
                </Text>
            </View>

            {homeStore.isLoading ? (
                <View className="pt-4">
                    <ActivityIndicator />
                </View>
            ) : homeStore.error ? (
                <UICard variant="outlined">
                    <Text variant="titleMedium" className="text-text-primary">
                        Couldn't load data
                    </Text>
                    <Text variant="bodyMedium" className="text-text-secondary mt-2">
                        Something went wrong
                    </Text>
                </UICard>
            ) : (
                <>
                    {homeStore.creditCards.map((card, index) => (
                        <Animated.View
                            key={card.id}
                            entering={FadeInDown.delay(index * 100)
                                .duration(400)
                                .easing(Easing.out(Easing.ease))}
                        >
                            <PaymentCardTile
                                key={card.id}
                                card={card}
                                onPress={() => goToCardDetail(card)}
                            />
                        </Animated.View>
                    ))}
                    {homeStore.debitCards.map((card, index) => (
                        <Animated.View
                            key={card.id}
                            entering={FadeInDown.delay(index * 100)
                                .duration(400)
                                .easing(Easing.out(Easing.ease))}
                        >
                            <PaymentCardTile
                                key={card.id}
                                card={card}
                                onPress={() => goToCardDetail(card)}
                            />
                        </Animated.View>
                    ))}

                    {homeStore.rewards && (
                        <UICard variant="outlined">
                            <Text variant="titleMedium" className="text-text-primary">
                                Rewards
                            </Text>
                            <Text variant="displaySmall" className="text-text-primary mt-2">
                                {homeStore.rewards.points.toLocaleString()} pts
                            </Text>
                            <Text variant="bodySmall" className="text-text-secondary mt-2">
                                {formatCurrency(homeStore.rewards.cashValue)} value ·{' '}
                                {homeStore.rewards.pendingPoints.toLocaleString()} pending
                            </Text>
                        </UICard>
                    )}
                </>
            )}
        </ScreenWrapper>
    )
})
