import { View, } from 'react-native'
import React from 'react'
import { ActivityIndicator, MD3Theme, Text, useTheme } from 'react-native-paper'

type Props = {
	color?: string;
	size?: number | "small" | "large" | undefined;
}

const ScreenLoader: React.FC<Props> = ({ ...props }) => {
	const theme: MD3Theme = useTheme()

	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<ActivityIndicator size={props.size ?? 'small'} color={theme.colors.primary} />
			<Text style={{
				marginVertical: 8
			}}>
				Loading...
			</Text>
		</View>
	)
}

export default ScreenLoader
