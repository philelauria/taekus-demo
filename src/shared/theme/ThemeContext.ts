import { createContext } from 'react'
import { Theme, ThemeMode, createTheme } from './theme'

export interface ThemeContextValue {
    theme: Theme
    themeMode: ThemeMode
    setThemeMode: (mode: ThemeMode) => void
    isDark: boolean
}

export const ThemeContext = createContext<ThemeContextValue>({
    theme: createTheme('light'),
    themeMode: 'system',
    setThemeMode: () => {},
    isDark: false,
})
