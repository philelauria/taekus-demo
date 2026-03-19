import React from 'react'
import '../../global.css'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StoreProvider as MobXStoreProvider } from '~/mobxStores/StoreProvider'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '~/api/queryClient'
import { ThemeProvider } from './providers/ThemeProvider'
import { Provider as ReduxStoreProvider } from 'react-redux'
import { store } from '~/store/store'
import { RootNavigator } from '~/navigation/RootNavigator'

const App = () => {
    return (
        <ReduxStoreProvider store={store}>
            <MobXStoreProvider>
                <QueryClientProvider client={queryClient}>
                    <SafeAreaProvider>
                        <ThemeProvider>
                            <RootNavigator />
                        </ThemeProvider>
                    </SafeAreaProvider>
                </QueryClientProvider>
            </MobXStoreProvider>
        </ReduxStoreProvider>
    )
}

export default App
