import { useCallback, useEffect, useState } from 'react'
import type { Card, RewardsBalance } from '~/shared/types'
import { homeService } from '../services/homeService'

type HomeState = {
    cards: Card[]
    rewards: RewardsBalance | null
    isLoading: boolean
    isRefreshing: boolean
    error: string | null
}

export const useHomeScreenLogic = () => {
    const [state, setState] = useState<HomeState>({
        cards: [],
        rewards: null,
        isLoading: true,
        isRefreshing: false,
        error: null,
    })

    const load = useCallback(async (mode: 'initial' | 'refresh') => {
        setState((prev) => ({
            ...prev,
            isLoading: mode === 'initial',
            isRefreshing: mode === 'refresh',
            error: null,
        }))

        try {
            const { cards, rewards } = await homeService.getHomeData()
            setState({
                cards,
                rewards,
                isLoading: false,
                isRefreshing: false,
                error: null,
            })
        } catch (e: any) {
            setState((prev) => ({
                ...prev,
                isLoading: false,
                isRefreshing: false,
                error: e?.message ?? 'Failed to load home data',
            }))
        }
    }, [])

    useEffect(() => {
        load('initial')
    }, [load])

    const refresh = useCallback(() => load('refresh'), [load])

    return { ...state, refresh }
}
