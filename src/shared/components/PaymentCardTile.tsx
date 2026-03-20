import React, { useEffect } from 'react'
import { View } from 'react-native'
import type { Card as CardModel } from '~/shared/types'
import { Card } from '~/shared/components/Card'
import { Text } from '~/shared/components/Text'
import { useColors } from '~/shared/hooks/useColors'
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'

const formatCurrency = (n: number) => `$${n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`

const formatExpiry = (month: number, year: number) => {
    const mm = String(month).padStart(2, '0')
    const yy = String(year).slice(-2)
    return `${mm}/${yy}`
}

type Props = {
    card: CardModel
    onPress: () => void
}

export const PaymentCardTile: React.FC<Props> = ({ card, onPress }) => {
    const themeColors = useColors()
    const isCredit = card.type === 'credit'
    const isFrozen = card.status === 'frozen'

    const frozenOpacity = useSharedValue(isFrozen ? 1 : 0)

    useEffect(() => {
        frozenOpacity.value = withTiming(isFrozen ? 1 : 0, { duration: 3000 })
    }, [isFrozen])

    const frozenStyle = useAnimatedStyle(() => ({
        opacity: frozenOpacity.value,
    }))

    const colors = card.colorScheme ?? {
        background: themeColors.surface,
        foreground: themeColors.textPrimary,
        subtle: themeColors.textSecondary,
        accent: 'rgba(0,0,0,0.05)',
    }

    const bg = colors.background
    const fg = colors.foreground
    const fgSubtle = colors.subtle

    const primaryLine = isCredit
        ? `${formatCurrency(card.availableCredit)} available`
        : `${formatCurrency(card.availableBalance)} balance`

    const secondaryLine = isCredit
        ? `Limit ${formatCurrency(card.creditLimit)}`
        : `Status ${isFrozen ? 'Frozen' : 'Active'}`

    return (
        <Card
            variant="default"
            onPress={onPress}
            style={{ padding: 0, backgroundColor: 'transparent' }}
        >
            <View
                style={{
                    width: '100%',
                    height: 200,
                    borderRadius: 12,
                    backgroundColor: bg,
                    padding: 16,
                    overflow: 'hidden',
                    borderWidth: isCredit ? 0 : 1,
                    borderColor: themeColors.borderLight,
                }}
                className="justify-between"
            >
                <View className="flex-row justify-between items-center">
                    <View>
                        <Text variant="labelLarge" style={{ color: fg }}>
                            {isCredit ? 'CREDIT' : 'DEBIT'}
                        </Text>
                        <Text variant="bodySmall" className="mt-1" style={{ color: fgSubtle }}>
                            {card.name}
                        </Text>
                    </View>
                    <Text variant="labelLarge" style={{ color: fg }}>
                        {isCredit ? 'VISA' : 'MC'}
                    </Text>
                </View>

                <View>
                    <Text variant="titleMedium" style={{ color: fg }}>
                        {primaryLine}
                    </Text>
                    <Text variant="bodySmall" className="mt-1" style={{ color: fgSubtle }}>
                        {secondaryLine}
                    </Text>
                </View>

                <View className="flex-row justify-between items-end">
                    <View>
                        <Text variant="bodySmall" style={{ color: fgSubtle }}>
                            CARD NUMBER
                        </Text>
                        <Text variant="titleMedium" className="mt-1" style={{ color: fg }}>
                            •••• {card.lastFour}
                        </Text>
                    </View>
                    <View className="items-end">
                        <Text variant="bodySmall" style={{ color: fgSubtle }}>
                            EXP
                        </Text>
                        <Text variant="titleMedium" className="mt-1" style={{ color: fg }}>
                            {formatExpiry(card.expiryMonth, card.expiryYear)}
                        </Text>
                    </View>
                </View>

                <Animated.View
                    pointerEvents={isFrozen ? 'auto' : 'none'}
                    className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center"
                    style={[
                        {
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            borderRadius: 12,
                        },
                        frozenStyle,
                    ]}
                >
                    <Text variant="displaySmall" style={{ color: '#FFFFFF' }}>
                        FROZEN
                    </Text>
                </Animated.View>
            </View>
        </Card>
    )
}
