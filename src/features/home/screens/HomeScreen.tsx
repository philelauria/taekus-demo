import React, { useMemo } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'

import type { Card } from '~/shared/types'
import type { HomeStackParamList } from '~/navigation/types'
import { ScreenWrapper } from '~/shared/components/ScreenWrapper'
import { Text } from '~/shared/components/Text'
import { Card as UICard } from '~/shared/components/Card'
import { useTheme } from '~/shared/hooks/useTheme'
import { PaymentCardTile } from '~/features/home/components/PaymentCardTile'
import { useHomeScreenLogic } from '~/features/home/hooks/useHomeScreenLogic'

type HomeNav = NativeStackNavigationProp<HomeStackParamList, 'HomeScreen'>

const formatCurrency = (n: number) => `$${n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`

export const HomeScreen: React.FC = () => {
    const { theme } = useTheme()
    const navigation = useNavigation<HomeNav>()
    const { cards, rewards, isLoading, isRefreshing, error, refresh } = useHomeScreenLogic()

    const { creditCard, debitCard } = useMemo(() => {
        const credit = cards.find((c) => c.type === 'credit')
        const debit = cards.find((c) => c.type === 'debit')
        return { creditCard: credit, debitCard: debit }
    }, [cards])

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
                <Text variant="displaySmall">Home</Text>
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
                    <Text variant="titleMedium">Couldn’t load data</Text>
                    <Text
                        variant="bodyMedium"
                        color={theme.colors.textSecondary}
                        style={{ marginTop: theme.spacing.sm }}
                    >
                        {error}
                    </Text>
                </UICard>
            ) : (
                <>
                    {creditCard && (
                        <PaymentCardTile
                            card={creditCard}
                            onPress={() => goToCardDetail(creditCard)}
                        />
                    )}
                    {debitCard && (
                        <PaymentCardTile
                            card={debitCard}
                            onPress={() => goToCardDetail(debitCard)}
                        />
                    )}

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
