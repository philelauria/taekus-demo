import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Animated, { FadeInDown, Easing } from 'react-native-reanimated'
import type { Card } from '~/shared/types'
import type { HomeStackParamList } from '~/navigation/types'
import { ScreenWrapper } from '~/shared/components/ScreenWrapper'
import { Text } from '~/shared/components/Text'
import { Card as UICard } from '~/shared/components/Card'
import { useTheme } from '~/shared/hooks/useTheme'
import { PaymentCardTile } from '~/shared/components/PaymentCardTile'
import { useHomeData } from '~/features/home/hooks/useHomeData'

type HomeNav = NativeStackNavigationProp<HomeStackParamList, 'HomeScreen'>

const formatCurrency = (n: number) => `$${n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`

export const HomeScreen: React.FC = () => {
    const { theme } = useTheme()
    const navigation = useNavigation<HomeNav>()
    const { creditCards, debitCards, rewards, isLoading, isRefreshing, error, refresh } =
        useHomeData()

    const goToCardDetail = (card: Card) => {
        navigation.navigate('CardDetail', { card })
    }

    return (
        <ScreenWrapper
            scroll
            refreshing={isRefreshing}
            onRefresh={refresh}
            contentStyle={{ gap: theme.spacing.lg }}
        >
            <View>
                <Text variant="displaySmall">Accounts</Text>
                <Text
                    variant="bodyMedium"
                    color={theme.colors.textSecondary}
                    style={{ marginTop: theme.spacing.sm }}
                >
                    Tap a card to view details
                </Text>
            </View>

            {isLoading ? (
                <View style={{ paddingTop: theme.spacing.lg }}>
                    <ActivityIndicator />
                </View>
            ) : error ? (
                <UICard variant="outlined">
                    <Text variant="titleMedium">Couldn't load data</Text>
                    <Text
                        variant="bodyMedium"
                        color={theme.colors.textSecondary}
                        style={{ marginTop: theme.spacing.sm }}
                    >
                        Something went wrong
                    </Text>
                </UICard>
            ) : (
                <>
                    {creditCards.map((card, index) => (
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
                    {debitCards.map((card, index) => (
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

                    {rewards && (
                        <UICard variant="outlined">
                            <Text variant="titleMedium">Rewards</Text>
                            <Text variant="displaySmall" style={{ marginTop: theme.spacing.sm }}>
                                {rewards.points.toLocaleString()} pts
                            </Text>
                            <Text
                                variant="bodySmall"
                                color={theme.colors.textSecondary}
                                style={{ marginTop: theme.spacing.sm }}
                            >
                                {formatCurrency(rewards.cashValue)} value ·{' '}
                                {rewards.pendingPoints.toLocaleString()} pending
                            </Text>
                        </UICard>
                    )}
                </>
            )}
        </ScreenWrapper>
    )
}
