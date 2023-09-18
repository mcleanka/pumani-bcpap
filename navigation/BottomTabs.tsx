/***
 * @author Pumani bCPAP Team
 * @description 
 * Certainly, this code creates a bottom tab navigation bar for a React Native app using the react-native-paper library. 
 * It has three tabs: "Home," "Statistics," and "Settings." Each tab has a screen component, icon, and label, making 
 * it easy for users to switch between different app screens / sections.
 */
// libraries
import React from 'react'
import { useTheme } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// custom component
import HomeScreen from '../screens/HomeScreen';
import StatisticsScreen from '../screens/StatisticsScreen';
import SettingsScreen from '../screens/SettingsScreen';

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