import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from './providers/ThemeProvider'
import { Provider } from 'react-redux'
import { store } from '~/store/store'
import { RootNavigator } from '~/navigation/RootNavigator'

const App = () => {
    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <ThemeProvider>
                    <RootNavigator />
                </ThemeProvider>
            </SafeAreaProvider>
        </Provider>
    )
}

export default App
