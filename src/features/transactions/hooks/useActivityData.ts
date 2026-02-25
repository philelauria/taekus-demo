import { useState, useMemo, useCallback } from 'react'
import { useGetTransactionsQuery } from '~/api/apiSlice'

export const useActivityData = () => {
    const [search, setSearch] = useState('')

    const {
        data,
        isLoading: rawLoading,
        isFetching,
        refetch,
    } = useGetTransactionsQuery(
        search.trim() ? { search: search.trim(), limit: 10000 } : { limit: 10000 },
    )

    const transactions = data?.transactions ?? []
    const isLoading = rawLoading && !data

    return {
        transactions,
        totalCount: data?.totalCount ?? 0,
        isLoading,
        isRefreshing: isFetching && !isLoading,
        search,
        setSearch,
        refetch,
    }
}
