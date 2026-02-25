import { useMemo, useCallback } from 'react'
import {
    useGetCardsQuery,
    useGetTransactionsQuery,
    useToggleCardFreezeMutation,
} from '~/api/apiSlice'

export const useCardDetailData = (cardId: string) => {
    const { data: cards, isFetching: cardsFetching } = useGetCardsQuery()

    const {
        data: transactionsData,
        isLoading: txnLoading,
        isFetching: txnFetching,
        refetch: refetchTransactions,
    } = useGetTransactionsQuery({ cardId })

    const [toggleFreeze, { isLoading: isToggling }] = useToggleCardFreezeMutation()

    // find card by ID from cache
    const card = useMemo(() => cards?.find((c) => c.id === cardId), [cards, cardId])

    const transactions = transactionsData?.transactions ?? []

    const handleToggleFreeze = useCallback(async () => {
        try {
            await toggleFreeze(cardId).unwrap()
        } catch (error) {
            console.log('Freeze failed:', error)
        }
    }, [toggleFreeze, cardId])

    return {
        card,
        transactions,
        isLoading: txnLoading,
        isRefreshing: (txnFetching || cardsFetching) && !txnLoading,
        isToggling,
        handleToggleFreeze,
        refetch: refetchTransactions,
    }
}
