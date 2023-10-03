import { View, Text, StyleSheet } from 'react-native'
import React, { PropsWithChildren } from 'react'
import ContentHeader from './ContentHeader';

type Props = {
	title: string;
}

const HomeChartCard: React.FC<PropsWithChildren<Props>> = ({ title, children }) => {
	return (
		<View style={styles.cardContainer}>

			<ContentHeader title={title} />

			<View style={{
				justifyContent: 'center',
				alignItems: 'center',
			}}>
				{children}
			</View>

		</View>
	)
}

export default HomeChartCard

const styles = StyleSheet.create({
	cardContainer: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	cardText: {
		fontSize: 15,
		textAlign: 'center',
		color: '#444',
	},
});