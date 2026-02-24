import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text } from '~/shared/components/Text'
import { useTheme } from '~/shared/hooks/useTheme'

export const RewardsScreen: React.FC = () => {
    const { theme } = useTheme()

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: theme.spacing.lg,
                }}
            >
                <Text variant="displaySmall">Rewards</Text>
                <Text
                    variant="bodyMedium"
                    color={theme.colors.textSecondary}
                    style={{ marginTop: theme.spacing.sm }}
                >
                    Points, tier status, and earning breakdown
                </Text>
            </View>
        </SafeAreaView>
    )
}
