import React, { useState } from 'react'
import { View, Pressable, ViewStyle, StyleSheet } from 'react-native'
import { useTheme } from '~/shared/hooks/useTheme'

export interface CardProps {
    children: React.ReactNode
    onPress?: () => void
    variant?: 'default' | 'elevated' | 'outlined'
    style?: ViewStyle
}

export const Card: React.FC<CardProps> = ({ children, onPress, variant = 'default', style }) => {
    const { theme } = useTheme()
    const [pressed, setPressed] = useState(false)

    const variantStyles: ViewStyle = {
        default: {
            backgroundColor: theme.colors.surface,
        },
        elevated: {
            backgroundColor: theme.colors.surfaceElevated,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
        },
        outlined: {
            backgroundColor: theme.colors.surface,
            borderWidth: 1,
            borderColor: theme.colors.borderLight,
        },
    }[variant]

    const cardStyle: ViewStyle[] = [
        styles.base,
        { borderRadius: theme.borderRadius.lg, padding: theme.spacing.lg },
        variantStyles,
        style as ViewStyle,
    ]

    if (onPress) {
        return (
            <Pressable
                onPress={onPress}
                onPressIn={() => setPressed(true)}
                onPressOut={() => setPressed(false)}
                accessibilityRole="button"
                style={StyleSheet.flatten([...cardStyle, { opacity: pressed ? 0.9 : 1 }])}
            >
                {children}
            </Pressable>
        )
    }

    return <View style={cardStyle}>{children}</View>
}

const styles = StyleSheet.create({
    base: {
        overflow: 'hidden',
    },
})
