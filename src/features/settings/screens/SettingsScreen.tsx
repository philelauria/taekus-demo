import React, { useState } from 'react'
import { Alert, View } from 'react-native'
import { observer } from 'mobx-react-lite'
import { useColorScheme } from 'nativewind'
import { ScreenWrapper } from '~/shared/components/ScreenWrapper'
import { Text } from '~/shared/components/Text'
import { Button } from '~/shared/components/Button'
import { Card as UICard } from '~/shared/components/Card'
import { useStores } from '~/stores/StoreProvider'

type ThemeMode = 'system' | 'light' | 'dark'

export const SettingsScreen: React.FC = observer(() => {
    const { colorScheme, setColorScheme } = useColorScheme()
    const { authStore } = useStores()
    const [themeMode, setThemeMode] = useState<ThemeMode>('system')

    const themeModes: ThemeMode[] = ['system', 'light', 'dark']

    const handleThemeChange = (mode: ThemeMode) => {
        setThemeMode(mode)
        setColorScheme(mode)
    }

    const handleLogout = () => {
        Alert.alert('Log out?', "You'll return to the login screen.", [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Log out', style: 'destructive', onPress: () => authStore.logout() },
        ])
    }

    return (
        <ScreenWrapper contentStyle={{ gap: 16 }}>
            <View>
                <Text variant="displaySmall" className="text-text-primary">
                    Settings
                </Text>
                <Text variant="bodyMedium" className="text-text-secondary mt-2">
                    Profile & preferences
                </Text>
            </View>

            <UICard variant="outlined">
                <View className="gap-1">
                    <Text variant="titleMedium" className="text-text-primary">
                        {authStore.user?.firstName ?? 'Demo User'}
                    </Text>
                    <Text variant="bodyMedium" className="text-text-secondary">
                        {authStore.user?.email ?? 'demo@taekus.com'}
                    </Text>
                </View>
            </UICard>

            <UICard variant="outlined">
                <Text variant="titleMedium" className="text-text-primary">
                    Appearance
                </Text>
                <View className="flex-row gap-2 mt-3">
                    {themeModes.map((mode) => (
                        <View key={mode} style={{ flex: 1 }}>
                            <Button
                                label={mode.charAt(0).toUpperCase() + mode.slice(1)}
                                variant={themeMode === mode ? 'primary' : 'secondary'}
                                size="sm"
                                onPress={() => handleThemeChange(mode)}
                            />
                        </View>
                    ))}
                </View>
            </UICard>

            <Button label="Log out" variant="danger" fullWidth onPress={handleLogout} />
        </ScreenWrapper>
    )
})
