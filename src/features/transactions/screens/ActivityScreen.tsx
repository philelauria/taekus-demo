import React, { useState, useCallback } from 'react'
import { View, FlatList, TextInput as RNTextInput } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { ActivityStackParamList } from '~/navigation/types'
import type { Transaction } from '~/shared/types'
import { ScreenWrapper } from '~/shared/components/ScreenWrapper'
import { Text } from '~/shared/components/Text'
import { Button } from '~/shared/components/Button'
import { TransactionRow } from '~/features/transactions/components/TransactionRow'
import { useColors } from '~/shared/hooks/useColors'
import { useActivityData } from '~/features/transactions/hooks/useActivityData'

type ActivityNav = NativeStackNavigationProp<ActivityStackParamList, 'ActivityScreen'>

export const ActivityScreen: React.FC = () => {
    const colors = useColors()
    const navigation = useNavigation<ActivityNav>()
    const { transactions, totalCount, isLoading, isRefreshing, search, setSearch, refetch } =
        useActivityData()

    const [useFlashList, setUseFlashList] = useState(true)

    const goToTransaction = useCallback(
        (transaction: Transaction) => {
            navigation.navigate('TransactionDetail', { transaction })
        },
        [navigation],
    )

    const renderItem = useCallback(
        ({ item }: { item: Transaction }) => (
            <TransactionRow transaction={item} onPress={() => goToTransaction(item)} />
        ),
        [goToTransaction],
    )

    const keyExtractor = useCallback((item: Transaction) => item.id, [])

    const listHeader = (
        <View className="px-4 pb-3">
            <Text variant="displaySmall" className="text-text-primary">
                Activity
            </Text>
            <Text variant="bodySmall" className="text-text-secondary mt-1">
                {totalCount.toLocaleString()} transactions ·{' '}
                {useFlashList ? 'FlashList' : 'FlatList'}
            </Text>

            <RNTextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Search transactions..."
                placeholderTextColor={colors.placeholder}
                className="text-[14px] leading-[20px] text-text-primary bg-background-secondary rounded-lg border border-border px-3 py-2 mt-3"
            />

            <View className="flex-row gap-2 mt-3">
                <View className="flex-1">
                    <Button
                        label="FlashList"
                        variant={useFlashList ? 'primary' : 'secondary'}
                        size="sm"
                        onPress={() => setUseFlashList(true)}
                    />
                </View>
                <View className="flex-1">
                    <Button
                        label="FlatList"
                        variant={!useFlashList ? 'primary' : 'secondary'}
                        size="sm"
                        onPress={() => setUseFlashList(false)}
                    />
                </View>
            </View>
        </View>
    )

    const emptyComponent = (
        <Text variant="bodyMedium" className="text-text-secondary text-center pt-4">
            {isLoading ? 'Loading transactions...' : 'No transactions found'}
        </Text>
    )

    return (
        <ScreenWrapper>
            {useFlashList ? (
                <FlashList
                    data={transactions}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    ListHeaderComponent={listHeader}
                    ListEmptyComponent={emptyComponent}
                    refreshing={isRefreshing}
                    onRefresh={refetch}
                />
            ) : (
                <FlatList
                    data={transactions}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    ListHeaderComponent={listHeader}
                    ListEmptyComponent={emptyComponent}
                    refreshing={isRefreshing}
                    onRefresh={refetch}
                />
            )}
        </ScreenWrapper>
    )
}
