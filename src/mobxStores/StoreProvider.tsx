import React, { createContext, useContext } from 'react'
import { RootStore } from './RootStore'

const StoreContext = createContext<RootStore | null>(null)

const rootStore = new RootStore()

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
)

export const useStores = (): RootStore => {
    const store = useContext(StoreContext)
    if (!store) {
        throw new Error('useStores must be used within a StoreProvider')
    }
    return store
}
