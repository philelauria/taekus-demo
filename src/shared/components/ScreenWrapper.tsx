import React from 'react'
import { View, ScrollView, StatusBar, ViewStyle, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useColorScheme } from 'nativewind'
import { useColors } from '~/shared/hooks/useColors'

export interface ScreenWrapperProps {
    children: React.ReactNode
    scroll?: boolean
    refreshing?: boolean
    onRefresh?: () => void
    style?: ViewStyle
    contentStyle?: ViewStyle
    className?: string
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
    children,
    scroll = false,
    refreshing,
    onRefresh,
    style,
    contentStyle,
    className = '',
}) => {
    const { colorScheme } = useColorScheme()
    const colors = useColors()
    const isDark = colorScheme === 'dark'

    const content = scroll ? (
        <ScrollView
            contentContainerStyle={[{ flexGrow: 1, padding: 16 }, contentStyle]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            refreshControl={
                onRefresh ? (
                    <RefreshControl
                        refreshing={refreshing ?? false}
                        onRefresh={onRefresh}
                        tintColor={colors.brand}
                    />
                ) : undefined
            }
        >
            {children}
        </ScrollView>
    ) : (
        <View style={[{ flex: 1, padding: 16 }, contentStyle]}>{children}</View>
    )

    return (
        <SafeAreaView className={`flex-1 bg-background ${className}`} style={style}>
            <StatusBar
                barStyle={isDark ? 'light-content' : 'dark-content'}
                backgroundColor={colors.background}
            />
            {content}
        </SafeAreaView>
    )
}
