import { TextStyle, Platform } from 'react-native'

export interface TypographyVariant {
    fontSize: number
    lineHeight: number
    fontWeight: TextStyle['fontWeight']
    letterSpacing?: number
}

export const fontFamily = {
    regular: Platform.select({ ios: 'System', android: 'Roboto' }) ?? 'System',
    medium: Platform.select({ ios: 'System', android: 'Roboto' }) ?? 'System',
    semibold: Platform.select({ ios: 'System', android: 'Roboto' }) ?? 'System',
    bold: Platform.select({ ios: 'System', android: 'Roboto' }) ?? 'System',
}

export const typography = {
    displayLarge: {
        fontSize: 34,
        lineHeight: 41,
        fontWeight: '700' as const,
        letterSpacing: 0.25,
    },
    displaySmall: {
        fontSize: 28,
        lineHeight: 34,
        fontWeight: '700' as const,
    },
    headlineLarge: {
        fontSize: 22,
        lineHeight: 28,
        fontWeight: '600' as const,
    },
    headlineSmall: {
        fontSize: 18,
        lineHeight: 24,
        fontWeight: '600' as const,
    },
    titleMedium: {
        fontSize: 16,
        lineHeight: 22,
        fontWeight: '600' as const,
    },
    bodyLarge: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '400' as const,
    },
    bodyMedium: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '400' as const,
    },
    bodySmall: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '400' as const,
    },
    labelLarge: {
        fontSize: 16,
        lineHeight: 22,
        fontWeight: '600' as const,
        letterSpacing: 0.15,
    },
    labelSmall: {
        fontSize: 11,
        lineHeight: 16,
        fontWeight: '500' as const,
        letterSpacing: 0.5,
    },
} as const

export type TypographyVariantKey = keyof typeof typography
