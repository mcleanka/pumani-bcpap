import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Header, HomeCards, HomeChartCard, PressureFlow, TopCard } from '../components'
import Toast from 'react-native-toast-message'
import useApp from '../provider/AppProvider'
import { ScreenLoader } from '../components'

const HomeScreen: React.FC = () => {
	const { flowRate } = useApp()
	const [isLoading, setIsLoading] = useState<boolean>(true)

	useEffect(() => {
		Toast.show({
			type: 'success',
			text1: 'Hi, Doctor!',
			text2: 'Welcome to bCPAP 👋'
		});


		const interval = setTimeout(() => {
			setIsLoading(false)
		}, 1000);

		return () => clearInterval(interval);

	}, [])

	if (isLoading) return (<ScreenLoader size={'large'} />);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#fff', marginBottom: 0, }}>
			<Header title='bCPAP Dashboard' />

			<ScrollView contentContainerStyle={styles.content}			>
				<TopCard count={flowRate} />

				<HomeCards />

				<HomeChartCard title='Flow rate'>
					<PressureFlow />
				</HomeChartCard>

			</ScrollView>
		</SafeAreaView>
	)
}

export default HomeScreen

const styles = StyleSheet.create({
	content: {
		marginHorizontal: 15,
		backgroundColor: '#fff',
		paddingHorizontal: 0,
		paddingTop: 0,
		marginBottom: 30
	}
})