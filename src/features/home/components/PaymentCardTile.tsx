import React from 'react'
import { View } from 'react-native'

import type { Card as CardModel } from '~/shared/types'
import { Card } from '~/shared/components/Card'
import { Text } from '~/shared/components/Text'
import { useTheme } from '~/shared/hooks/useTheme'

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
    const { theme } = useTheme()

    const isCredit = card.type === 'credit'
    const isFrozen = card.status === 'frozen'

    const colors = card.colorScheme ?? {
        background: theme.colors.surface,
        foreground: theme.colors.textPrimary,
        subtle: theme.colors.textSecondary,
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
            style={{
                padding: 0,
                backgroundColor: 'transparent',
            }}
        >
            <View
                style={{
                    width: '100%',
                    height: 200,
                    borderRadius: theme.borderRadius.lg,
                    backgroundColor: bg,
                    padding: theme.spacing.lg,
                    overflow: 'hidden',
                    borderWidth: isCredit ? 0 : 1,
                    borderColor: theme.colors.borderLight,
                    justifyContent: 'space-between',
                }}
            >
                {/* Top row */}
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <View>
                        <Text variant="labelLarge" color={fg}>
                            {isCredit ? 'CREDIT' : 'DEBIT'}
                        </Text>
                        <Text
                            variant="bodySmall"
                            color={fgSubtle}
                            style={{ marginTop: theme.spacing.xs }}
                        >
                            {card.name}
                        </Text>
                    </View>
                    <Text variant="labelLarge" color={fg}>
                        {isCredit ? 'VISA' : 'MC'}
                    </Text>
                </View>

                {/* Middle — balance */}
                <View>
                    <Text variant="titleMedium" color={fg}>
                        {primaryLine}
                    </Text>
                    <Text
                        variant="bodySmall"
                        color={fgSubtle}
                        style={{ marginTop: theme.spacing.xs }}
                    >
                        {secondaryLine}
                    </Text>
                </View>

                {/* Bottom — card number + expiry */}
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                    }}
                >
                    <View>
                        <Text variant="bodySmall" color={fgSubtle}>
                            CARD NUMBER
                        </Text>
                        <Text
                            variant="titleMedium"
                            color={fg}
                            style={{ marginTop: theme.spacing.xs }}
                        >
                            •••• {card.lastFour}
                        </Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text variant="bodySmall" color={fgSubtle}>
                            EXP
                        </Text>
                        <Text
                            variant="titleMedium"
                            color={fg}
                            style={{ marginTop: theme.spacing.xs }}
                        >
                            {formatExpiry(card.expiryMonth, card.expiryYear)}
                        </Text>
                    </View>
                </View>

                {/* Frozen overlay */}
                {isFrozen && (
                    <View
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            borderRadius: theme.borderRadius.lg,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text variant="displaySmall" color="#FFFFFF">
                            FROZEN
                        </Text>
                    </View>
                )}
            </View>
        </Card>
    )
}
