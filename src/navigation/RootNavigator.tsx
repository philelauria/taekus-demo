import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import * as SplashScreen from 'expo-splash-screen'
import {
    restoreSession,
    selectIsAuthenticated,
    selectIsRestoringSession,
} from '~/features/auth/slice'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { useTheme } from '~/shared/hooks/useTheme'
import { AuthStack } from './AuthStack'
import { BottomTabs } from './BottomTabs'

SplashScreen.preventAutoHideAsync()

export const RootNavigator: React.FC = () => {
    const dispatch = useAppDispatch()
    const isAuthenticated = useAppSelector(selectIsAuthenticated)
    const isRestoringSession = useAppSelector(selectIsRestoringSession)
    const { theme } = useTheme()

    useEffect(() => {
        dispatch(restoreSession())
    }, [dispatch])

    useEffect(() => {
        if (!isRestoringSession) {
            SplashScreen.hideAsync()
        }
    }, [isRestoringSession])

    if (isRestoringSession) {
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
            {isAuthenticated ? <BottomTabs /> : <AuthStack />}
        </NavigationContainer>
    )
}
