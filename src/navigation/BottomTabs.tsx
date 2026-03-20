import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MainTabParamList, HomeStackParamList, ActivityStackParamList } from './types'
import { useColors } from '~/shared/hooks/useColors'
import { HomeScreen } from '~/features/home/screens/HomeScreen'
import { CardDetailScreen } from '~/features/cards/screens/CardDetailScreen'
import { TransactionDetailScreen } from '~/features/transactions/screens/TransactionDetailScreen'
import { ActivityScreen } from '~/features/transactions/screens/ActivityScreen'
import { RewardsScreen } from '~/features/rewards/screens/RewardsScreen'
import { SettingsScreen } from '~/features/settings/screens/SettingsScreen'
import { Ionicons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator<MainTabParamList>()
const HomeStack = createNativeStackNavigator<HomeStackParamList>()
const ActivityStack = createNativeStackNavigator<ActivityStackParamList>()

const HomeStackNavigator: React.FC = () => {
    const colors = useColors()

    return (
        <HomeStack.Navigator
            screenOptions={{
                headerShown: false,
                headerStyle: { backgroundColor: colors.background },
                headerTintColor: colors.brand,
                headerTitleStyle: { color: colors.textPrimary },
            }}
        >
            <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
            <HomeStack.Screen
                name="CardDetail"
                component={CardDetailScreen}
                options={{ headerShown: true, headerTitle: 'Card Detail', headerBackTitle: 'Home' }}
            />
            <HomeStack.Screen
                name="TransactionDetail"
                component={TransactionDetailScreen}
                options={{ headerShown: true, headerTitle: 'Transaction', headerBackTitle: 'Back' }}
            />
        </HomeStack.Navigator>
    )
}

const ActivityStackNavigator: React.FC = () => {
    const colors = useColors()

    return (
        <ActivityStack.Navigator
            screenOptions={{
                headerShown: false,
                headerStyle: { backgroundColor: colors.background },
                headerTintColor: colors.brand,
                headerTitleStyle: { color: colors.textPrimary },
            }}
        >
            <ActivityStack.Screen name="ActivityScreen" component={ActivityScreen} />
            <ActivityStack.Screen
                name="TransactionDetail"
                component={TransactionDetailScreen}
                options={{
                    headerShown: true,
                    headerTitle: 'Transaction',
                    headerBackTitle: 'Activity',
                }}
            />
        </ActivityStack.Navigator>
    )
}

export const BottomTabs: React.FC = () => {
    const colors = useColors()

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: colors.brand,
                tabBarInactiveTintColor: colors.textTertiary,
                tabBarStyle: {
                    backgroundColor: colors.surface,
                    borderTopColor: colors.borderLight,
                },
                tabBarIcon: ({ color, size }) => {
                    const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
                        TabHome: 'card-outline',
                        Activity: 'list-outline',
                        Rewards: 'star-outline',
                        Settings: 'settings-outline',
                    }
                    return <Ionicons name={icons[route.name]} size={size} color={color} />
                },
            })}
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
