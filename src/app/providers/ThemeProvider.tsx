import React, { PropsWithChildren, useCallback, useMemo, useState } from 'react'
import { useColorScheme } from 'react-native'
import { createTheme, Theme, ThemeMode } from '~/shared/theme'
import { ThemeContext, ThemeContextValue } from '~/shared/theme/ThemeContext'

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const systemColorScheme = useColorScheme()
    const [themeMode, setThemeMode] = useState<ThemeMode>('system')

    const resolvedMode = themeMode === 'system' ? (systemColorScheme ?? 'light') : themeMode

    const theme = useMemo(() => {
        return createTheme(resolvedMode)
    }, [resolvedMode])

    const handleSetThemeMode = useCallback((mode: ThemeMode) => {
        setThemeMode(mode)
    }, [])

    const themeContextValue: ThemeContextValue = useMemo(
        () => ({
            theme,
            themeMode,
            setThemeMode: handleSetThemeMode,
            isDark: resolvedMode === 'dark',
        }),
        [theme, themeMode, handleSetThemeMode, resolvedMode],
    )

    return <ThemeContext.Provider value={themeContextValue}>{children}</ThemeContext.Provider>
}
