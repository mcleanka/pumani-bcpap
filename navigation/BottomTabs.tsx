import React from 'react'
import { HomeScreen, SettingsScreen, StatisticsScreen } from '../screens';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'react-native-paper';

const Tab = createMaterialBottomTabNavigator();

const BottomTabs: React.FC = () => {
	const theme = useTheme()

	return (
		<Tab.Navigator>
			<Tab.Screen name="Home" component={HomeScreen} options={{
				tabBarLabel: 'Home',
				tabBarIcon: ({ color }) => (
					<MaterialCommunityIcons name="home-outline" color={theme.colors.primary} size={26} />
				),
				tabBarColor: theme.colors.secondary,
			}} />
			<Tab.Screen name="Statistics" component={StatisticsScreen} options={{
				tabBarLabel: 'Statistics',
				tabBarIcon: ({ color }) => (
					<MaterialCommunityIcons name="file-table-outline" color={theme.colors.primary} size={26} />
				),
			}} />
			<Tab.Screen name="Settings" component={SettingsScreen} options={{
				tabBarLabel: 'Settings',
				tabBarIcon: ({ color }) => (
					<MaterialCommunityIcons name="account-wrench-outline" color={theme.colors.primary} size={26} />
				),
			}} />
		</Tab.Navigator>
	)
}

export default BottomTabs