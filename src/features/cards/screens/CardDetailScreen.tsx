import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text } from '~/shared/components/Text'
import { useTheme } from '~/shared/hooks/useTheme'

export const CardDetailScreen: React.FC = () => {
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
                <Text variant="displaySmall">Card Detail</Text>
                <Text
                    variant="bodyMedium"
                    color={theme.colors.textSecondary}
                    style={{ marginTop: theme.spacing.sm }}
                >
                    Card info, transactions, freeze/unfreeze
                </Text>
            </View>
        </SafeAreaView>
    )
}
