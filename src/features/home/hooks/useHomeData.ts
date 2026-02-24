import { useMemo, useCallback } from 'react'
import { useGetCardsQuery, useGetRewardsQuery } from '~/api/apiSlice'

export const useHomeData = () => {
    const {
        data: cards,
        isLoading: cardsLoading,
        isFetching: cardsFetching,
        error: cardsError,
        refetch: refetchCards,
    } = useGetCardsQuery()

    const {
        data: rewards,
        isLoading: rewardsLoading,
        isFetching: rewardsFetching,
        error: rewardsError,
        refetch: refetchRewards,
    } = useGetRewardsQuery()

    const isLoading = cardsLoading || rewardsLoading
    const isRefreshing = (cardsFetching || rewardsFetching) && !isLoading
    const error = cardsError || rewardsError

    const { creditCards, debitCards } = useMemo(() => {
        const credit = cards?.filter((c) => c.type === 'credit') ?? []
        const debit = cards?.filter((c) => c.type === 'debit') ?? []
        return { creditCards: credit, debitCards: debit }
    }, [cards])

    const refresh = useCallback(() => {
        refetchCards()
        refetchRewards()
    }, [refetchCards, refetchRewards])

    return {
        creditCards,
        debitCards,
        rewards,
        isLoading,
        isRefreshing,
        error,
        refresh,
    }
}
