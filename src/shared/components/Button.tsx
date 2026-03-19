import React, { useState } from 'react'
import { Pressable, StyleSheet, ActivityIndicator, PressableProps, ViewStyle } from 'react-native'
import { useTheme } from '../hooks/useTheme'
import { Text } from '~/shared/components/Text'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends Omit<PressableProps, 'children'> {
    label: string
    variant?: ButtonVariant
    size?: ButtonSize
    loading?: boolean
    fullWidth?: boolean
}

const styles = StyleSheet.create({
    base: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
    },
    fullWidth: {
        width: '100%',
    },
})

export const Button: React.FC<ButtonProps> = ({
    label,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled,
    fullWidth = false,
    style,
    ...props
}) => {
    const { theme } = useTheme()
    const [pressed, setPressed] = useState(false)
    const isDisabled = disabled || loading

    const sizeStyles = {
        sm: { paddingHorizontal: 12, minHeight: 36 },
        md: { paddingHorizontal: 20, minHeight: 44 },
        lg: { paddingHorizontal: 24, minHeight: 52 },
    }

    const variantColors = {
        primary: {
            bg: theme.colors.buttonPrimary,
            text: theme.colors.buttonPrimaryText,
            border: 'transparent',
        },
        secondary: {
            bg: theme.colors.buttonSecondary,
            text: theme.colors.buttonSecondaryText,
            border: theme.colors.border,
        },
        ghost: {
            bg: 'transparent',
            text: theme.colors.brand,
            border: 'transparent',
        },
        danger: {
            bg: theme.colors.error,
            text: '#FFFFFF',
            border: 'transparent',
        },
    }

    const colors = variantColors[variant]

    return (
        <Pressable
            disabled={isDisabled}
            onPressIn={() => setPressed(true)}
            onPressOut={() => setPressed(false)}
            style={StyleSheet.flatten([
                styles.base,
                sizeStyles[size],
                fullWidth && styles.fullWidth,
                {
                    backgroundColor: colors.bg,
                    borderColor: colors.border,
                    borderWidth: variant === 'secondary' ? 1 : 0,
                    opacity: pressed ? 0.7 : 1,
                },
                style as ViewStyle,
            ])}
            {...props}
        >
            {loading ? (
                <ActivityIndicator
                    color={isDisabled ? theme.colors.buttonDisabledText : colors.text}
                    size="small"
                />
            ) : (
                <Text
                    variant={size === 'sm' ? 'bodyMedium' : 'labelLarge'}
                    color={isDisabled ? theme.colors.buttonDisabledText : colors.text}
                >
                    {label}
                </Text>
            )}
        </Pressable>
    )
}
