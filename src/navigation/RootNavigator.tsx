import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import * as SplashScreen from 'expo-splash-screen'
import { observer } from 'mobx-react-lite'
import { useColorScheme } from 'nativewind'
import { AuthStack } from './AuthStack'
import { BottomTabs } from './BottomTabs'
import { useStores } from '~/stores/StoreProvider'
import { useColors } from '~/shared/hooks/useColors'

SplashScreen.preventAutoHideAsync()

export const RootNavigator: React.FC = observer(() => {
    const { authStore } = useStores()
    const colors = useColors()
    const { colorScheme } = useColorScheme()

    useEffect(() => {
        authStore.restoreSession()
    }, [authStore])

    useEffect(() => {
        if (!authStore.isRestoringSession) {
            SplashScreen.hideAsync()
        }
    }, [authStore.isRestoringSession])

    if (authStore.isRestoringSession) {
        return null
    }

    return (
        <NavigationContainer
            theme={{
                dark: colorScheme === 'dark',
                colors: {
                    primary: colors.brand,
                    background: colors.background,
                    card: colors.surface,
                    text: colors.textPrimary,
                    border: colors.borderLight,
                    notification: colors.error,
                },
                fonts: {
                    regular: { fontFamily: 'System', fontWeight: '400' },
                    medium: { fontFamily: 'System', fontWeight: '500' },
                    bold: { fontFamily: 'System', fontWeight: '700' },
                    heavy: { fontFamily: 'System', fontWeight: '900' },
                },
            }}
        >
            {authStore.isAuthenticated ? <BottomTabs /> : <AuthStack />}
        </NavigationContainer>
    )
})
