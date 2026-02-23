export interface ThemeColors {
    background: string
    backgroundSecondary: string
    backgroundTertiary: string
    surface: string
    surfaceElevated: string

    textPrimary: string
    textSecondary: string
    textTertiary: string
    textInverse: string

    brand: string
    brandLight: string
    brandDark: string

    success: string
    successLight: string
    warning: string
    warningLight: string
    error: string
    errorLight: string
    info: string
    infoLight: string

    border: string
    borderLight: string
    divider: string
    overlay: string
    disabled: string
    placeholder: string

    buttonPrimary: string
    buttonPrimaryText: string
    buttonSecondary: string
    buttonSecondaryText: string
    buttonDisabled: string
    buttonDisabledText: string

    cardBackground: string
    cardText: string
    cardAccent: string
}

export const lightColors: ThemeColors = {
    background: '#FFFFFF',
    backgroundSecondary: '#F5F5F7',
    backgroundTertiary: '#EBEBF0',
    surface: '#FFFFFF',
    surfaceElevated: '#FFFFFF',

    textPrimary: '#1A1A2E',
    textSecondary: '#6B6B80',
    textTertiary: '#9999AD',
    textInverse: '#FFFFFF',

    brand: '#1B2B4B',
    brandLight: '#2D4A7A',
    brandDark: '#0F1B33',

    success: '#00875A',
    successLight: '#E3FCEF',
    warning: '#FF8B00',
    warningLight: '#FFF7E6',
    error: '#DE350B',
    errorLight: '#FFEBE6',
    info: '#0065FF',
    infoLight: '#E6F0FF',

    border: '#D1D1DB',
    borderLight: '#E8E8EF',
    divider: '#F0F0F5',
    overlay: 'rgba(0, 0, 0, 0.5)',
    disabled: '#C7C7D1',
    placeholder: '#ADADBD',

    buttonPrimary: '#1B2B4B',
    buttonPrimaryText: '#FFFFFF',
    buttonSecondary: '#F0F0F5',
    buttonSecondaryText: '#1A1A2E',
    buttonDisabled: '#E8E8EF',
    buttonDisabledText: '#ADADBD',

    cardBackground: '#1B2B4B',
    cardText: '#FFFFFF',
    cardAccent: '#C9A84C',
}

export const darkColors: ThemeColors = {
    background: '#0D0D14',
    backgroundSecondary: '#1A1A28',
    backgroundTertiary: '#25253A',
    surface: '#1E1E30',
    surfaceElevated: '#28283E',

    textPrimary: '#F0F0F5',
    textSecondary: '#9999AD',
    textTertiary: '#6B6B80',
    textInverse: '#1A1A2E',

    brand: '#4A7AC9',
    brandLight: '#6B9BE0',
    brandDark: '#2D5A9E',

    success: '#36B37E',
    successLight: '#1A2E25',
    warning: '#FFAB00',
    warningLight: '#2E2A1A',
    error: '#FF5630',
    errorLight: '#2E1A1A',
    info: '#4C9AFF',
    infoLight: '#1A2440',

    border: '#35354D',
    borderLight: '#28283E',
    divider: '#1E1E30',
    overlay: 'rgba(0, 0, 0, 0.7)',
    disabled: '#35354D',
    placeholder: '#6B6B80',

    buttonPrimary: '#4A7AC9',
    buttonPrimaryText: '#FFFFFF',
    buttonSecondary: '#28283E',
    buttonSecondaryText: '#F0F0F5',
    buttonDisabled: '#1E1E30',
    buttonDisabledText: '#6B6B80',

    cardBackground: '#1E1E30',
    cardText: '#F0F0F5',
    cardAccent: '#D4AF37',
}
