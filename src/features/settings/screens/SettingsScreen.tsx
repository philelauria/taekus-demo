import React from 'react'
import { Alert, View } from 'react-native'
import { ScreenWrapper } from '~/shared/components/ScreenWrapper'
import { Text } from '~/shared/components/Text'
import { Button } from '~/shared/components/Button'
import { Card } from '~/shared/components/Card'
import { useTheme } from '~/shared/hooks/useTheme'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { logout, selectUser } from '~/features/auth/slice'

export const SettingsScreen: React.FC = () => {
    const { theme } = useTheme()
    const dispatch = useAppDispatch()
    const user = useAppSelector(selectUser)

    const handleLogout = () => {
        Alert.alert('Log out?', 'You’ll return to the login screen.', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Log out', style: 'destructive', onPress: () => dispatch(logout()) },
        ])
    }

    return (
        <ScreenWrapper scroll contentStyle={{ gap: theme.spacing.lg }}>
            <View>
                <Text variant="displaySmall">Profile</Text>
                <Text
                    variant="bodyMedium"
                    color={theme.colors.textSecondary}
                    style={{ marginTop: theme.spacing.sm }}
                >
                    Auth state + demo controls
                </Text>
            </View>

            <Card variant="outlined">
                <View style={{ gap: theme.spacing.xs }}>
                    <Text variant="titleMedium">{user?.firstName ?? 'Demo User'}</Text>
                    <Text variant="bodyMedium" color={theme.colors.textSecondary}>
                        {user?.email ?? 'demo@taekus.com'}
                    </Text>
                </View>
            </Card>

            <Button label="Log out" variant="danger" fullWidth onPress={handleLogout} />
        </ScreenWrapper>
    )
}
