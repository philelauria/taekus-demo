import React, { useState } from 'react'
import { View, Pressable, ViewStyle, StyleSheet } from 'react-native'

export interface CardProps {
    children: React.ReactNode
    onPress?: () => void
    variant?: 'default' | 'elevated' | 'outlined'
    style?: ViewStyle
    className?: string
}

const variantClasses: Record<string, string> = {
    default: 'bg-surface',
    elevated: 'bg-surface-elevated',
    outlined: 'bg-surface border border-border-light',
}

export const Card: React.FC<CardProps> = ({
    children,
    onPress,
    variant = 'default',
    style,
    className = '',
}) => {
    const [pressed, setPressed] = useState(false)

    const baseClassName = `overflow-hidden rounded-xl p-4 ${variantClasses[variant]} ${className}`

    if (onPress) {
        return (
            <Pressable
                onPress={onPress}
                onPressIn={() => setPressed(true)}
                onPressOut={() => setPressed(false)}
                accessibilityRole="button"
                className={baseClassName}
                style={StyleSheet.flatten([{ opacity: pressed ? 0.9 : 1 }, style])}
            >
                {children}
            </Pressable>
        )
    }

    return (
        <View className={baseClassName} style={style}>
            {children}
        </View>
    )
}
