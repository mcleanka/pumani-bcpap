import React from 'react'
import { View, Text } from 'react-native'
import { useTheme } from 'react-native-paper'

type Props = {
	title: string;
}

const ContentHeader: React.FC<Props> = ({ title }) => {
	const theme = useTheme()

	return (
		<View style={{
			marginVertical: 15,
			flexDirection: 'row',
			justifyContent: 'space-between',
		}}>
			<Text style={{
				color: theme.colors.primary,
				fontSize: 15,
				fontWeight: '500',
			}} >
				{title}
			</Text>
		</View>
	)
}

export default ContentHeader