import * as SecureStore from 'expo-secure-store'
import AsyncStorage from '@react-native-async-storage/async-storage'

const KEYS = {
    ACCESS_TOKEN: 'taekus_access_token',
    REFRESH_TOKEN: 'taekus_refresh_token',
    THEME_MODE: 'taekus_theme_mode',
    BIOMETRICS_ENABLED: 'taekus_biometrics',
} as const

export const secureStorage = {
    getAccessToken: async (): Promise<string | null> => {
        return SecureStore.getItemAsync(KEYS.ACCESS_TOKEN)
    },
    setAccessToken: async (token: string): Promise<void> => {
        await SecureStore.setItemAsync(KEYS.ACCESS_TOKEN, token)
    },
    getRefreshToken: async (): Promise<string | null> => {
        return SecureStore.getItemAsync(KEYS.REFRESH_TOKEN)
    },
    setRefreshToken: async (token: string): Promise<void> => {
        await SecureStore.setItemAsync(KEYS.REFRESH_TOKEN, token)
    },
    clearTokens: async (): Promise<void> => {
        await Promise.all([
            SecureStore.deleteItemAsync(KEYS.ACCESS_TOKEN),
            SecureStore.deleteItemAsync(KEYS.REFRESH_TOKEN),
        ])
    },
}

export const generalStorage = {
    getThemeMode: async (): Promise<string | null> => {
        return AsyncStorage.getItem(KEYS.THEME_MODE)
    },
    setThemeMode: async (mode: string): Promise<void> => {
        await AsyncStorage.setItem(KEYS.THEME_MODE, mode)
    },
    getBiometricsEnabled: async (): Promise<boolean> => {
        const value = await AsyncStorage.getItem(KEYS.BIOMETRICS_ENABLED)
        return value === 'true'
    },
    setBiometricsEnabled: async (value: boolean): Promise<void> => {
        await AsyncStorage.setItem(KEYS.BIOMETRICS_ENABLED, String(value))
    },
}
