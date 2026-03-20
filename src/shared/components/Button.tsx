import React, { useState } from 'react'
import { Pressable, ActivityIndicator, PressableProps, ViewStyle, StyleSheet } from 'react-native'
import { Text } from '~/shared/components/Text'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends Omit<PressableProps, 'children'> {
    label: string
    variant?: ButtonVariant
    size?: ButtonSize
    loading?: boolean
    fullWidth?: boolean
    className?: string
}

const sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-3 min-h-[36px]',
    md: 'px-5 min-h-[44px]',
    lg: 'px-6 min-h-[52px]',
}

const variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-btn-primary',
    secondary: 'bg-btn-secondary border border-border',
    ghost: 'bg-transparent',
    danger: 'bg-error',
}

const textClasses: Record<ButtonVariant, string> = {
    primary: 'text-btn-primary-text',
    secondary: 'text-btn-secondary-text',
    ghost: 'text-brand',
    danger: 'text-white',
}

export const Button: React.FC<ButtonProps> = ({
    label,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled,
    fullWidth = false,
    className = '',
    style,
    ...props
}) => {
    const [pressed, setPressed] = useState(false)
    const isDisabled = disabled || loading

    return (
        <Pressable
            disabled={isDisabled}
            onPressIn={() => setPressed(true)}
            onPressOut={() => setPressed(false)}
            className={`flex-row items-center justify-center rounded-xl ${sizeClasses[size]} ${variantClasses[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
            style={StyleSheet.flatten([{ opacity: pressed ? 0.7 : 1 }, style as ViewStyle])}
            {...props}
        >
            {loading ? (
                <ActivityIndicator size="small" />
            ) : (
                <Text
                    variant={size === 'sm' ? 'bodyMedium' : 'labelLarge'}
                    className={isDisabled ? 'text-btn-disabled-text' : textClasses[variant]}
                >
                    {label}
                </Text>
            )}
        </Pressable>
    )
}
