import React from 'react'
import '../../global.css'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StoreProvider as MobXStoreProvider } from '~/mobxStores/StoreProvider'
import { Provider as ReduxStoreProvider } from 'react-redux'
import { store } from '~/store/store'
import { RootNavigator } from '~/navigation/RootNavigator'

const App = () => {
    return (
        <ReduxStoreProvider store={store}>
            <MobXStoreProvider>
                <SafeAreaProvider>
                    <RootNavigator />
                </SafeAreaProvider>
            </MobXStoreProvider>
        </ReduxStoreProvider>
    )
}

export default App
