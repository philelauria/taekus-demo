import React, { useState, useCallback, useEffect } from 'react'
import { View, FlatList, TextInput as RNTextInput } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import { useNavigation } from '@react-navigation/native'
import { observer } from 'mobx-react-lite'
import { useStores } from '~/mobxStores/StoreProvider'
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

export const ActivityScreen: React.FC = observer(() => {
    const colors = useColors()
    const { activityStore } = useStores()
    const navigation = useNavigation<ActivityNav>()

    useEffect(() => {
        activityStore.fetchTransactions()
    }, [activityStore])

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
                {activityStore.totalCount.toLocaleString()} transactions ·{' '}
                {useFlashList ? 'FlashList' : 'FlatList'}
            </Text>

            <RNTextInput
                value={activityStore.search}
                onChangeText={(text) => activityStore.setSearch(text)}
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
            {activityStore.isLoading ? 'Loading transactions...' : 'No transactions found'}
        </Text>
    )

    return (
        <ScreenWrapper>
            {useFlashList ? (
                <FlashList
                    data={activityStore.transactions}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    ListHeaderComponent={listHeader}
                    ListEmptyComponent={emptyComponent}
                    refreshing={activityStore.isRefreshing}
                    onRefresh={activityStore.fetchTransactions}
                />
            ) : (
                <FlatList
                    data={activityStore.transactions}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    ListHeaderComponent={listHeader}
                    ListEmptyComponent={emptyComponent}
                    refreshing={activityStore.isRefreshing}
                    onRefresh={activityStore.fetchTransactions}
                />
            )}
        </ScreenWrapper>
    )
})
