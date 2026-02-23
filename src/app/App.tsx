import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import { useTheme } from '~/shared/hooks/useTheme'
import { ThemeMode } from '~/shared/theme'
import { ThemeProvider } from './providers/ThemeProvider'
import { Button } from '~/shared/components/Button'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
    },
})

const ThemeTestScreen: React.FC = () => {
    const { theme, themeMode, setThemeMode, isDark } = useTheme()

    const modes: ThemeMode[] = ['system', 'light', 'dark']

    return (
        <SafeAreaView
            style={{
                flex: 1,
                padding: theme.spacing.lg,
                justifyContent: 'center',
                backgroundColor: theme.colors.background,
            }}
        >
            <Text style={[theme.typography.displaySmall, { color: theme.colors.textPrimary }]}>
                Taekus Demo
            </Text>

            <Text
                style={[
                    theme.typography.bodyMedium,
                    {
                        color: theme.colors.textSecondary,
                        marginTop: theme.spacing.sm,
                    },
                ]}
            >
                Theme: {themeMode} (resolved: {isDark ? 'dark' : 'light'})
            </Text>

            <View
                style={{
                    padding: theme.spacing.lg,
                    borderRadius: theme.borderRadius.lg,
                    backgroundColor: theme.colors.cardBackground,
                    marginTop: theme.spacing.lg,
                }}
            >
                <Text style={[theme.typography.bodyMedium, { color: theme.colors.cardText }]}>
                    •••• •••• •••• 4821
                </Text>
                <Text style={[theme.typography.bodySmall, { color: theme.colors.cardAccent }]}>
                    EXP 12/28
                </Text>
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    gap: theme.spacing.md,
                    marginTop: theme.spacing['2xl'],
                }}
            >
                {modes.map((mode) => (
                    <View key={mode} style={{ flex: 1 }}>
                        <Button
                            label={mode}
                            variant={themeMode === mode ? 'primary' : 'secondary'}
                            onPress={() => setThemeMode(mode)}
                        />
                    </View>
                ))}
            </View>
        </SafeAreaView>
    )
}

const App = () => {
    return (
        <SafeAreaProvider>
            <ThemeProvider>
                <ThemeTestScreen />
            </ThemeProvider>
        </SafeAreaProvider>
    )
}

export default App
