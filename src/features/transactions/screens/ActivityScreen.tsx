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
import { useTheme } from '~/shared/hooks/useTheme'
import { useActivityData } from '~/features/transactions/hooks/useActivityData'

type ActivityNav = NativeStackNavigationProp<ActivityStackParamList, 'ActivityScreen'>

export const ActivityScreen: React.FC = () => {
    const { theme } = useTheme()
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
        <View style={{ paddingHorizontal: theme.spacing.lg, paddingBottom: theme.spacing.md }}>
            <Text variant="displaySmall">Activity</Text>
            <Text
                variant="bodySmall"
                color={theme.colors.textSecondary}
                style={{ marginTop: theme.spacing.xs }}
            >
                {totalCount.toLocaleString()} transactions ·{' '}
                {useFlashList ? 'FlashList' : 'FlatList'}
            </Text>

            <RNTextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Search transactions..."
                placeholderTextColor={theme.colors.placeholder}
                style={[
                    theme.typography.bodyMedium,
                    {
                        color: theme.colors.textPrimary,
                        backgroundColor: theme.colors.backgroundSecondary,
                        borderRadius: theme.borderRadius.md,
                        borderWidth: 1,
                        borderColor: theme.colors.border,
                        paddingHorizontal: theme.spacing.md,
                        paddingVertical: theme.spacing.sm,
                        marginTop: theme.spacing.md,
                    },
                ]}
            />

            <View
                style={{ flexDirection: 'row', gap: theme.spacing.sm, marginTop: theme.spacing.md }}
            >
                <View style={{ flex: 1 }}>
                    <Button
                        label="FlashList"
                        variant={useFlashList ? 'primary' : 'secondary'}
                        size="sm"
                        onPress={() => setUseFlashList(true)}
                    />
                </View>
                <View style={{ flex: 1 }}>
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
        <Text
            variant="bodyMedium"
            color={theme.colors.textSecondary}
            align="center"
            style={{ paddingTop: theme.spacing.lg }}
        >
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
                    estimatedItemSize={72}
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
