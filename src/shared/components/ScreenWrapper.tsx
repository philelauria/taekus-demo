import React from 'react'
import { View, ScrollView, StatusBar, ViewStyle, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '~/shared/hooks/useTheme'

export interface ScreenWrapperProps {
    children: React.ReactNode
    scroll?: boolean
    refreshing?: boolean
    onRefresh?: () => void
    style?: ViewStyle
    contentStyle?: ViewStyle
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
    children,
    scroll = false,
    refreshing,
    onRefresh,
    style,
    contentStyle,
}) => {
    const { theme, isDark } = useTheme()

    const content = scroll ? (
        <ScrollView
            contentContainerStyle={[{ flexGrow: 1, padding: theme.spacing.lg }, contentStyle]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            refreshControl={
                onRefresh ? (
                    <RefreshControl
                        refreshing={refreshing ?? false}
                        onRefresh={onRefresh}
                        tintColor={theme.colors.brand}
                    />
                ) : undefined
            }
        >
            {children}
        </ScrollView>
    ) : (
        <View style={[{ flex: 1, padding: theme.spacing.lg }, contentStyle]}>{children}</View>
    )

    return (
        <SafeAreaView style={[{ flex: 1, backgroundColor: theme.colors.background }, style]}>
            <StatusBar
                barStyle={isDark ? 'light-content' : 'dark-content'}
                backgroundColor={theme.colors.background}
            />
            {content}
        </SafeAreaView>
    )
}
