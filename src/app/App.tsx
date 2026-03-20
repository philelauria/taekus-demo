import React from 'react'
import '../../global.css'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StoreProvider } from '~/stores/StoreProvider'
import { RootNavigator } from '~/navigation/RootNavigator'

const App = () => {
    return (
        <StoreProvider>
            <SafeAreaProvider>
                <RootNavigator />
            </SafeAreaProvider>
        </StoreProvider>
    )
}

export default App
