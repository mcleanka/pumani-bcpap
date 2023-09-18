import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { useTheme } from 'react-native-paper';

const PressureFlow: React.FC = () => {
	const theme = useTheme()
	const [data, setData] = useState([]);
	const { width } = Dimensions.get('window');
	const [counter, setCounter] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			const d = Math.floor(Math.random() * 100)

			const newDataPoint = {
				value: counter % 2 === 0 ? d : 0,
				dataPointText: counter % 2 === 0 ? d : 0,
			};

			setData((prevData) => [...prevData, newDataPoint] as any);

			if (data.length > 10) setData((prevData) => prevData.slice(1));

			setCounter((prevCounter) => prevCounter + 1);
		}, 1000);

		return () => clearInterval(interval);

	}, [data, counter]);

	return (
		<View style={[styles.container, { backgroundColor: theme.colors.secondary, borderColor: theme.colors.primary, }]}>
			<LineChart
				initialSpacing={0}
				data={[{ value: 0, dataPointText: '0' }, ...data]}
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
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		marginTop: 2,
	},
});

export default PressureFlow;
