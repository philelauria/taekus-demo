import { ThemeColors, lightColors, darkColors } from './colors'
import { spacing, borderRadius } from './spacing'
import { typography, fontFamily } from './typography'

export type ThemeMode = 'light' | 'dark' | 'system'

export interface Theme {
    mode: 'light' | 'dark'
    colors: ThemeColors
    spacing: typeof spacing
    borderRadius: typeof borderRadius
    typography: typeof typography
    fontFamily: typeof fontFamily
}

export const createTheme = (mode: 'light' | 'dark'): Theme => ({
    mode,
    colors: mode === 'light' ? lightColors : darkColors,
    spacing,
    borderRadius,
    typography,
    fontFamily,
})

export { spacing, borderRadius, typography, fontFamily }
export type { ThemeColors }
