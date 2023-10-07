/**
 * @author Pumani bCPAP Team
 * @description
 * this code represents a statistics screen that displays tabular data with
 * pagination controls and provides visual feedback through loading indicators.
 */

// libries
import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import { DataTable } from 'react-native-paper';

// custom components
import { Header, ScreenLoader } from '../components'
import axios from 'axios';

const data = [
	{
		pressure: 21,
		temperature: 67,
		humidity: 356,
		time: 16,
	},
	{
		pressure: 22,
		temperature: 82,
		humidity: 262,
		time: 16,
	},
	{
		pressure: 3,
		temperature: 12,
		humidity: 159,
		time: 6,
	},
	{
		pressure: 4,
		temperature: 90,
		humidity: 305,
		time: 3.7,
	},
]

const StatisticsScreen: React.FC = () => {
	const [items, setItems] = useState([]);
	const [page, setPage] = useState<number>(0);
	const [numberOfItemsPerPageList] = useState([8, 15, 25, 50, 100]);
	const [itemsPerPage, onItemsPerPageChange] = useState(
		numberOfItemsPerPageList[0]
	);
	const from = page * itemsPerPage;
	const to = Math.min((page + 1) * itemsPerPage, items.length);
	const [isLoading, setIsLoading] = useState<boolean>(true)

	useEffect(() => {
		setPage(0);
	}, [itemsPerPage]);

	const fecthData = async () => {
		setIsLoading(true);

		await axios.get('http://192.168.50.9/pumani/api/fetch-data.php')
			.then((response) => response.data)
			.then(result => {
				// Assuming your API returns an array of records
				if (data.length > 0)
					setItems(result.data);
			})
			.catch(error => {
				console.error('Error fetching data:', error);
			})
			.finally(() => {
				setIsLoading(false);
			})
	}

	useEffect(() => {
		fecthData()
	}, [])

	if (isLoading) return (<ScreenLoader size={'large'} />);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#fff', marginBottom: 0, }}>
			<Header title='Statistics' />

			<ScrollView contentContainerStyle={{
				marginHorizontal: 15,
				backgroundColor: '#fff',
				paddingHorizontal: 0,
				paddingTop: 0,
				marginBottom: 30
			}}>
				<DataTable>
					<DataTable.Header>
						<DataTable.Title>Pres (Pa/sec)</DataTable.Title>
						<DataTable.Title>Temp (°C)</DataTable.Title>
						<DataTable.Title>Hum (%)</DataTable.Title>
						<DataTable.Title>Time</DataTable.Title>
					</DataTable.Header>

					{items.length > 0 && items.slice(from, to).map((item, key) => (
						<DataTable.Row key={key}>
							<DataTable.Cell>{item?.BreathingRate}</DataTable.Cell>
							<DataTable.Cell>{item?.Temperature}</DataTable.Cell>
							<DataTable.Cell>{item?.Humidity}</DataTable.Cell>
							<DataTable.Cell>{item.CreatedAt}</DataTable.Cell>
						</DataTable.Row>
					))}

					<DataTable.Pagination
						page={page}
						numberOfPages={Math.ceil(items.length / itemsPerPage)}
						onPageChange={(page) => setPage(page)}
						label={`${from + 1}-${to} of ${items.length}`}
						numberOfItemsPerPageList={numberOfItemsPerPageList}
						numberOfItemsPerPage={itemsPerPage}
						onItemsPerPageChange={onItemsPerPageChange}
						showFastPaginationControls
						selectPageDropdownLabel={'Show'}
					/>
				</DataTable>
			</ScrollView>

		</SafeAreaView>
	)
}

export default StatisticsScreen