import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import ContentHeader from './ContentHeader'
import QuickLink from './QuickLink'


const HomeCards: React.FC = () => {
	const navigation = useNavigation<any>()

	const links = [
		{
			id: 1, title: 'Temperature', count: '24°C',
		},
		{
			id: 2, title: 'Humidity', count: '78%',
		},
	];

	return (
		<View>
			<ContentHeader title='Weather conditions' />

			<View style={styles.container}>

				{
					links.map((link, index) => (
						<QuickLink
							key={index}
							title={link.title}
							count={link.count}
						/>
					))
				}

			</View>
		</View>
	)
}

export default HomeCards

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: 2,
		marginBottom: 8,
		paddingHorizontal: 0,
		marginHorizontal: -10,
	},
});