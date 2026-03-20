import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text } from '~/shared/components/Text'

export const RewardsScreen: React.FC = () => {
    return (
        <SafeAreaView className="flex-1 bg-background">
            <View className="flex-1 justify-center items-center p-4">
                <Text variant="displaySmall" className="text-text-primary">
                    Rewards
                </Text>
                <Text variant="bodyMedium" className="text-text-secondary mt-2">
                    Points, tier status, and earning breakdown
                </Text>
            </View>
        </SafeAreaView>
    )
}
