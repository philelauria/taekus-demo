import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { mockApi } from '~/shared/services/mockApi'
import type { Card, Transaction, RewardsBalance } from '~/shared/types'
import type { ApiResponse, GetTransactionsParams } from '~/shared/types'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fakeBaseQuery(), // in real world we'd use something like fetchBaseQuery({ baseUrl: 'https://api.taekus.com' })
    tagTypes: ['Cards', 'Transactions', 'Rewards'],
    endpoints: (builder) => ({
        getCards: builder.query<Card[], void>({
            queryFn: async () => {
                try {
                    const response = await mockApi.getCards()
                    return { data: response.data }
                } catch (error: any) {
                    return { error: { message: error.message } }
                }
            },
            providesTags: ['Cards'],
        }),
        getTransactions: builder.query<
            { transactions: Transaction[]; totalCount: number },
            GetTransactionsParams | void
        >({
            queryFn: async (params) => {
                try {
                    const response = await mockApi.getTransactions(params ?? undefined)
                    return {
                        data: {
                            transactions: response.data,
                            totalCount: response.meta?.totalCount ?? response.data.length,
                        },
                    }
                } catch (error: any) {
                    return { error: { message: error.message } }
                }
            },
            providesTags: ['Transactions'],
        }),
        toggleCardFreeze: builder.mutation<Card, string>({
            queryFn: async (cardId) => {
                try {
                    const response = await mockApi.toggleCardFreeze(cardId)
                    return { data: response.data }
                } catch (error: any) {
                    return { error: { message: error.message } }
                }
            },
            onQueryStarted: async (cardId, { dispatch, queryFulfilled }) => {
                // optimistic updates
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData('getCards', undefined, (draft) => {
                        const card = draft.find((c) => c.id === cardId)
                        if (card) {
                            card.status = card.status === 'active' ? 'frozen' : 'active'
                        }
                    }),
                )
                try {
                    await queryFulfilled
                } catch {
                    // undo UI updates on fail
                    patchResult.undo()
                }
            },
            // invalidatesTags: ['Cards'], Note: not needed and including this causes jank in animation transitions
        }),
        getRewards: builder.query<RewardsBalance, void>({
            queryFn: async () => {
                try {
                    const response = await mockApi.getRewards()
                    return { data: response.data }
                } catch (error: any) {
                    return { error: { message: error.message } }
                }
            },
            providesTags: ['Rewards'],
        }),
    }),
})

export const {
    useGetCardsQuery,
    useGetTransactionsQuery,
    useToggleCardFreezeMutation,
    useGetRewardsQuery,
} = apiSlice
