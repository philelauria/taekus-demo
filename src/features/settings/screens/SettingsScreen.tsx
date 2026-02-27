import React from 'react'
import { Alert, View } from 'react-native'
import { ScreenWrapper } from '~/shared/components/ScreenWrapper'
import { Text } from '~/shared/components/Text'
import { Button } from '~/shared/components/Button'
import { Card as UICard } from '~/shared/components/Card'
import { useTheme } from '~/shared/hooks/useTheme'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { logout, selectUser } from '~/features/auth/slice'
import { ThemeMode } from '~/shared/theme'

export const SettingsScreen: React.FC = () => {
    const { theme, themeMode, setThemeMode } = useTheme()
    const dispatch = useAppDispatch()
    const user = useAppSelector(selectUser)

    const themeModes: ThemeMode[] = ['system', 'light', 'dark']

    const handleLogout = () => {
        Alert.alert('Log out?', "You'll return to the login screen.", [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Log out', style: 'destructive', onPress: () => dispatch(logout()) },
        ])
    }

    return (
        <ScreenWrapper contentStyle={{ gap: theme.spacing.lg }}>
            <View>
                <Text variant="displaySmall">Settings</Text>
                <Text
                    variant="bodyMedium"
                    color={theme.colors.textSecondary}
                    style={{ marginTop: theme.spacing.sm }}
                >
                    Profile & preferences
                </Text>
            </View>

            <UICard variant="outlined">
                <View style={{ gap: theme.spacing.xs }}>
                    <Text variant="titleMedium">{user?.firstName ?? 'Demo User'}</Text>
                    <Text variant="bodyMedium" color={theme.colors.textSecondary}>
                        {user?.email ?? 'demo@taekus.com'}
                    </Text>
                </View>
            </UICard>

            <UICard variant="outlined">
                <Text variant="titleMedium">Appearance</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        gap: theme.spacing.sm,
                        marginTop: theme.spacing.md,
                    }}
                >
                    {themeModes.map((mode) => (
                        <View key={mode} style={{ flex: 1 }}>
                            <Button
                                label={mode.charAt(0).toUpperCase() + mode.slice(1)}
                                variant={themeMode === mode ? 'primary' : 'secondary'}
                                size="sm"
                                onPress={() => setThemeMode(mode)}
                            />
                        </View>
                    ))}
                </View>
            </UICard>

            <Button label="Log out" variant="danger" fullWidth onPress={handleLogout} />
        </ScreenWrapper>
    )
}
