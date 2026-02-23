import React from 'react'
import { Text as RNText, TextProps as RNTextProps } from 'react-native'
import { useTheme } from '~/shared/hooks/useTheme'
import { TypographyVariantKey } from '~/shared/theme'

export interface TextProps extends RNTextProps {
    variant?: TypographyVariantKey
    color?: string
    align?: 'left' | 'center' | 'right'
}

export const Text: React.FC<TextProps> = ({
    variant = 'bodyLarge',
    color,
    align,
    style,
    ...props
}) => {
    const { theme } = useTheme()
    const typographyStyle = theme.typography[variant]

    return (
        <RNText
            allowFontScaling
            maxFontSizeMultiplier={1.5}
            style={[
                typographyStyle,
                { color: color ?? theme.colors.textPrimary },
                align && { textAlign: align },
                style,
            ]}
            {...props}
        />
    )
}
