import { useColorScheme } from 'nativewind'
import { lightColors, darkColors } from '~/shared/theme/colors'

export const useColors = () => {
    const { colorScheme } = useColorScheme()
    console.log('useColors colorScheme:', colorScheme)
    return colorScheme === 'dark' ? darkColors : lightColors
}
