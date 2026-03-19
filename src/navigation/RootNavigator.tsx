import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import * as SplashScreen from 'expo-splash-screen'
import { observer } from 'mobx-react-lite'
import { useTheme } from '~/shared/hooks/useTheme'
import { AuthStack } from './AuthStack'
import { BottomTabs } from './BottomTabs'
import { useStores } from '~/mobxStores/StoreProvider'

SplashScreen.preventAutoHideAsync()

export const RootNavigator: React.FC = observer(() => {
    const { authStore } = useStores()
    const { theme } = useTheme()

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
                dark: theme.mode === 'dark',
                colors: {
                    primary: theme.colors.brand,
                    background: theme.colors.background,
                    card: theme.colors.surface,
                    text: theme.colors.textPrimary,
                    border: theme.colors.borderLight,
                    notification: theme.colors.error,
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
