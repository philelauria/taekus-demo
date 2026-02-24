import React, { useState } from 'react'
import {
    View,
    TextInput as RNTextInput,
    TextInputProps as RNTextInputProps,
    Pressable,
    StyleSheet,
} from 'react-native'
import { useTheme } from '~/shared/hooks/useTheme'
import { Text } from './Text'

export interface TextInputProps extends RNTextInputProps {
    label: string
    error?: string
    hint?: string
    rightIcon?: React.ReactNode
}

export const TextInput: React.FC<TextInputProps> = ({
    label,
    error,
    hint,
    rightIcon,
    style,
    ...props
}) => {
    const { theme } = useTheme()
    const [isFocused, setIsFocused] = useState(false)

    const borderColor = error
        ? theme.colors.error
        : isFocused
          ? theme.colors.brand
          : theme.colors.border

    return (
        <View style={styles.container}>
            <Text
                variant="bodySmall"
                color={error ? theme.colors.error : theme.colors.textSecondary}
                style={styles.label}
            >
                {label}
            </Text>
            <View
                style={[
                    styles.inputContainer,
                    {
                        borderColor,
                        backgroundColor: theme.colors.backgroundSecondary,
                        borderRadius: theme.borderRadius.md,
                    },
                ]}
            >
                <RNTextInput
                    accessibilityLabel={label}
                    accessibilityHint={error ?? hint}
                    allowFontScaling
                    maxFontSizeMultiplier={1.5}
                    placeholderTextColor={theme.colors.placeholder}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    style={[
                        theme.typography.bodyLarge,
                        {
                            flex: 1,
                            color: theme.colors.textPrimary,
                            paddingHorizontal: theme.spacing.md,
                            paddingVertical: theme.spacing.md,
                        },
                        style,
                    ]}
                    {...props}
                />
                {rightIcon && <View style={{ paddingRight: theme.spacing.md }}>{rightIcon}</View>}
            </View>
            {error && (
                <Text
                    variant="bodySmall"
                    color={theme.colors.error}
                    style={styles.errorText}
                    accessibilityRole="alert"
                >
                    {error}
                </Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    label: {
        marginBottom: 6,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
    },
    errorText: {
        marginTop: 4,
    },
})
