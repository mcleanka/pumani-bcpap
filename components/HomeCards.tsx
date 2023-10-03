import React from 'react'
import { View, StyleSheet } from 'react-native'
import ContentHeader from './ContentHeader'
import QuickLink from './QuickLink'

type Props = {
	data: {
		id: number,
		title: string,
		count: string,
	}[]
}

const HomeCards: React.FC<Props> = ({ data }) => {
	return (
		<View>
			<ContentHeader title='Weather conditions' />

			<View style={styles.container}>

				{
					data.map((link, index) => (
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