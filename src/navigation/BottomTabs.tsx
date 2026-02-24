import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MainTabParamList, HomeStackParamList, ActivityStackParamList } from './types'
import { useTheme } from '~/shared/hooks/useTheme'
import { HomeScreen } from '~/features/home/screens/HomeScreen'
import { CardDetailScreen } from '~/features/cards/screens/CardDetailScreen'
import { TransactionDetailScreen } from '~/features/transactions/screens/TransactionDetailScreen'
import { ActivityScreen } from '~/features/transactions/screens/ActivityScreen'
import { RewardsScreen } from '~/features/rewards/screens/RewardsScreen'
import { SettingsScreen } from '~/features/settings/screens/SettingsScreen'

const Tab = createBottomTabNavigator<MainTabParamList>()
const HomeStack = createNativeStackNavigator<HomeStackParamList>()
const ActivityStack = createNativeStackNavigator<ActivityStackParamList>()

const HomeStackNavigator: React.FC = () => {
    return (
        <HomeStack.Navigator screenOptions={{ headerShown: false }}>
            <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
            <HomeStack.Screen name="CardDetail" component={CardDetailScreen} />
            <HomeStack.Screen name="TransactionDetail" component={TransactionDetailScreen} />
        </HomeStack.Navigator>
    )
}

const ActivityStackNavigator: React.FC = () => {
    return (
        <ActivityStack.Navigator screenOptions={{ headerShown: false }}>
            <ActivityStack.Screen name="ActivityScreen" component={ActivityScreen} />
            <ActivityStack.Screen name="TransactionDetail" component={TransactionDetailScreen} />
        </ActivityStack.Navigator>
    )
}

export const BottomTabs: React.FC = () => {
    const { theme } = useTheme()

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.brand,
                tabBarInactiveTintColor: theme.colors.textTertiary,
                tabBarStyle: {
                    backgroundColor: theme.colors.surface,
                    borderTopColor: theme.colors.borderLight,
                },
            }}
        >
            <Tab.Screen
                name="TabHome"
                options={{ tabBarLabel: 'Home' }}
                component={HomeStackNavigator}
            />
            <Tab.Screen name="Activity" component={ActivityStackNavigator} />
            <Tab.Screen name="Rewards" component={RewardsScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    )
}
