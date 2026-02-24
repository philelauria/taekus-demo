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
        : `Status ${card.status === 'frozen' ? 'Frozen' : 'Active'}`

    const frozenBannerHeight = card.status === 'frozen' ? 36 : 0
    const bottomRowHeight = 58
    const bottomInset = theme.spacing.lg + frozenBannerHeight

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
                    aspectRatio: 1.586,
                    minHeight: 200,
                    borderRadius: theme.borderRadius.lg,
                    backgroundColor: bg,
                    padding: theme.spacing.lg,
                    paddingBottom: theme.spacing.lg + bottomRowHeight + frozenBannerHeight,
                    overflow: 'hidden',
                    borderWidth: isCredit ? 0 : 1,
                    borderColor: theme.colors.borderLight,
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

                {/* Chip */}
                <View
                    style={{
                        width: 44,
                        height: 34,
                        borderRadius: 8,
                        borderWidth: 1,
                        borderColor: isCredit ? 'rgba(255,255,255,0.35)' : theme.colors.border,
                        backgroundColor: isCredit ? 'rgba(255,255,255,0.12)' : theme.colors.surface,
                        marginTop: theme.spacing.md,
                    }}
                />

                {/* Middle */}
                <View style={{ marginTop: theme.spacing.md }}>
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

                {/* Bottom row (absolute) */}
                <View
                    style={{
                        position: 'absolute',
                        left: theme.spacing.lg,
                        right: theme.spacing.lg,
                        bottom: bottomInset,
                    }}
                >
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
                </View>

                {/* Frozen banner */}
                {card.status === 'frozen' && (
                    <View
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            bottom: 0,
                            height: frozenBannerHeight,
                            justifyContent: 'center',
                            backgroundColor: isCredit ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0.10)',
                        }}
                    >
                        <Text variant="labelLarge" color={fg} align="center">
                            FROZEN
                        </Text>
                    </View>
                )}
            </View>
        </Card>
    )
}
