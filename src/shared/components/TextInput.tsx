import React, { useState } from 'react'
import { View, TextInput as RNTextInput, TextInputProps as RNTextInputProps } from 'react-native'
import { useColors } from '~/shared/hooks/useColors'
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
    const colors = useColors()
    const [isFocused, setIsFocused] = useState(false)

    const borderClass = error ? 'border-error' : isFocused ? 'border-brand' : 'border-border'

    return (
        <View className="w-full">
            <Text
                variant="bodySmall"
                className={`mb-1.5 ${error ? 'text-error' : 'text-text-secondary'}`}
            >
                {label}
            </Text>
            <View
                className={`flex-row items-center border rounded-lg bg-background-secondary ${borderClass}`}
            >
                <RNTextInput
                    accessibilityLabel={label}
                    accessibilityHint={error ?? hint}
                    allowFontScaling
                    maxFontSizeMultiplier={1.5}
                    placeholderTextColor={colors.placeholder}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="flex-1 text-[14px] leading-[20px] text-text-primary px-3 py-3"
                    style={style}
                    {...props}
                />
                {rightIcon && <View className="pr-3">{rightIcon}</View>}
            </View>
            {error && (
                <Text variant="bodySmall" className="text-error mt-1" accessibilityRole="alert">
                    {error}
                </Text>
            )}
        </View>
    )
}
