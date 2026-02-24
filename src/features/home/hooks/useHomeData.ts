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

    const { creditCard, debitCard } = useMemo(() => {
        const credit = cards?.find((c) => c.type === 'credit')
        const debit = cards?.find((c) => c.type === 'debit')
        return { creditCard: credit, debitCard: debit }
    }, [cards])

    const refresh = useCallback(() => {
        refetchCards()
        refetchRewards()
    }, [refetchCards, refetchRewards])

    return {
        creditCard,
        debitCard,
        rewards,
        isLoading,
        isRefreshing,
        error,
        refresh,
    }
}
