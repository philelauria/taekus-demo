import React from 'react'
import { Text as RNText, TextProps as RNTextProps } from 'react-native'

export type TypographyVariant =
    | 'displayLarge'
    | 'displaySmall'
    | 'headlineLarge'
    | 'headlineSmall'
    | 'titleMedium'
    | 'bodyLarge'
    | 'bodyMedium'
    | 'bodySmall'
    | 'labelLarge'
    | 'labelSmall'

const variantClasses: Record<TypographyVariant, string> = {
    displayLarge: 'text-[34px] leading-[41px] font-bold tracking-wide',
    displaySmall: 'text-[28px] leading-[34px] font-bold',
    headlineLarge: 'text-[22px] leading-[28px] font-semibold',
    headlineSmall: 'text-[18px] leading-[24px] font-semibold',
    titleMedium: 'text-[16px] leading-[22px] font-semibold',
    bodyLarge: 'text-[16px] leading-[24px] font-normal',
    bodyMedium: 'text-[14px] leading-[20px] font-normal',
    bodySmall: 'text-[12px] leading-[16px] font-normal',
    labelLarge: 'text-[16px] leading-[22px] font-semibold tracking-wide',
    labelSmall: 'text-[11px] leading-[16px] font-medium tracking-wider',
}

export interface TextProps extends RNTextProps {
    variant?: TypographyVariant
    className?: string
}

export const Text: React.FC<TextProps> = ({
    variant = 'bodyLarge',
    className = '',
    style,
    ...props
}) => {
    return (
        <RNText
            allowFontScaling
            maxFontSizeMultiplier={1.5}
            className={`${variantClasses[variant]} ${className}`}
            style={style}
            {...props}
        />
    )
}
