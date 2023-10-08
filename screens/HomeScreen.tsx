/**
 * @author Pumani bCPAP
 * @description
 * This code sets up a Home screen for a React Native app.
 * It displays various components like a header, cards (temperature & humidity), 
 * and a flow rate chart card.
 * It also handles loading and displays a loading indicator while fetching data.
 * The Toast component shows a welcome message to the user.
 */
// libraries
import axios from 'axios';
import Toast from 'react-native-toast-message'
import React, { useEffect, useState } from 'react'
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'

// custom components
import useApp from '../provider/AppProvider'
import { ScreenLoader } from '../components'
import { Header, HomeCards, HomeChartCard, TopCard } from '../components'
import { Text, useTheme } from 'react-native-paper';
import { LineChart } from 'react-native-gifted-charts';

const HomeScreen: React.FC = () => {
	const { flowRate } = useApp()
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [isUpdatingDashboard, setIsUpdatingDashboard] = useState<boolean>(true)
	const theme = useTheme()
	const { width } = Dimensions.get('window');
	const [cardsData, setCardsData] = useState([
		{
			id: 1, title: 'Temperature', count: '0°C',
		},
		{
			id: 2, title: 'Humidity', count: '0%',
		},
	]);

	const [chartDataPoint, setChartDataPoint] = useState({
		value: 0,
		dataPointText: '0',
	});

	const { setFlowRate, setAgeGroup } = useApp()

	const [chartData, setChartData] = useState([])

	useEffect(() => {
		setChartData((prevData) => [...prevData, chartDataPoint] as any);

		if (chartData.length > 10) setChartData((prevData) => prevData.slice(1));

	}, [chartDataPoint]);

	const fetchData = async () => {
		await axios.get('http://192.168.14.9/pumani/api/fetch-record.php')
			.then((response) => response.data)
			.then(result => {
				// Assuming your API returns an array of records
				if (result) {
					setFlowRate(result.settings.FlowRate)
					setAgeGroup(result.settings.FlowRate)

					const data = result.statistics

					setChartDataPoint({
						value: Number(data?.BreathingRate ?? 0),
						dataPointText: data?.BreathingRate ?? 0,
					})

					setCardsData([
						{
							id: 1, title: 'Temperature', count: data?.Temperature ?? 0 + '°C',
						},
						{
							id: 2, title: 'Humidity', count: data?.Humidity ?? 0 + '%',
						},
					])
				}
			})
			.catch(error => {
				Toast.show({
					type: 'error',
					text2: 'Error fetching data:' + error
				});
			})
	};

	useEffect(() => {
		setIsLoading(true)
		// Initial fetch when the component mounts
		fetchData().then(() => {
			setIsLoading(false)
		})


		// Set up an interval to fetch data every 5 seconds
		const interval = setInterval(async () => {
			setIsUpdatingDashboard(true)
			await fetchData();
			setIsUpdatingDashboard(false)
		}, 5000);

		// Clear the interval when the component unmounts to prevent memory leaks
		return () => clearInterval(interval);
	}, []);

	if (isLoading) return (<ScreenLoader size={'large'} />);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#fff', marginBottom: 0, }}>
			<Header title='bCPAP Dashboard' />

			<ScrollView contentContainerStyle={styles.content}>

				{
					isUpdatingDashboard && <View style={{
						alignItems: 'center',
						justifyContent: 'center',
					}}>
						<Text>
							Loading...
						</Text>
					</View>
				}

				<TopCard count={flowRate} />

				<HomeCards data={cardsData} />

				<HomeChartCard title='Flow rate (l/min)'>
					<View style={[{
						flexDirection: 'row',
						flexWrap: 'wrap',
						justifyContent: 'space-between',
						marginTop: 2,
					}, { backgroundColor: theme.colors.secondary, borderColor: theme.colors.primary, }]}>
						<LineChart
							initialSpacing={0}
							data={[{ value: 0, dataPointText: '0' }, ...chartData]}
							spacing={30}
							textColor1={theme.colors.primary}
							textShiftY={-8}
							textShiftX={-10}
							textFontSize={13}
							thickness={5}
							yAxisColor="#0BA5A4"
							showVerticalLines
							verticalLinesColor="rgba(14,164,164,0.5)"
							xAxisColor="#0BA5A4"
							color={theme.colors.primary}
							width={width - 75}
							height={175}
						/>
					</View>
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