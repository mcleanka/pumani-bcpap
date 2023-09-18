/**
 * @author Pumani bCPAP Team
 * @description
 * this code represents a statistics screen that displays tabular data with
 * pagination controls and provides visual feedback through loading indicators.
 */

// libries
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { DataTable } from 'react-native-paper';

// custom components
import { Header, ScreenLoader } from '../components'

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
	const [items] = useState(data);
	const [page, setPage] = useState<number>(0);
	const [numberOfItemsPerPageList] = useState([2, 3, 4]);
	const [itemsPerPage, onItemsPerPageChange] = useState(
		numberOfItemsPerPageList[0]
	);
	const from = page * itemsPerPage;
	const to = Math.min((page + 1) * itemsPerPage, items.length);
	const [isLoading, setIsLoading] = useState<boolean>(true)

	useEffect(() => {
		setPage(0);
	}, [itemsPerPage]);

	useEffect(() => {
		const interval = setTimeout(() => {
			setIsLoading(false)
		}, 1000);

		return () => clearInterval(interval);

	}, [])

	if (isLoading) return (<ScreenLoader size={'large'} />);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#fff', marginBottom: 0, }}>
			<Header title='Statistics' />

			<DataTable>
				<DataTable.Header>
					<DataTable.Title>Pres (Pa/sec)</DataTable.Title>
					<DataTable.Title>Temp (°C)</DataTable.Title>
					<DataTable.Title>Hum (%)</DataTable.Title>
					<DataTable.Title numeric>Time</DataTable.Title>
				</DataTable.Header>

				{items.slice(from, to).map((item, key) => (
					<DataTable.Row key={key}>
						<DataTable.Cell>{item.pressure}</DataTable.Cell>
						<DataTable.Cell>{item.temperature}</DataTable.Cell>
						<DataTable.Cell>{item.humidity}</DataTable.Cell>
						<DataTable.Cell numeric>{item.time}</DataTable.Cell>
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
				// selectPageDropdownLabel={'Show'}
				/>
			</DataTable>

		</SafeAreaView>
	)
}

export default StatisticsScreen