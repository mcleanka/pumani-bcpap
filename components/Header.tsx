import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Appbar, useTheme } from 'react-native-paper'

type Props = {
	title: string;
}

const Header: React.FC<Props> = ({ title }) => {
	const theme = useTheme();
	const navigation = useNavigation<any>()
	const onPress = () => navigation.navigate('Settings')

	return (
		<Appbar.Header style={{
			backgroundColor: theme.colors.primary,
			elevation: 4,
		}}>
			<Appbar.Content title={title}
				titleStyle={{
					fontSize: 18,
					fontWeight: 'bold',
				}}
				color={theme.colors.secondary} />
			<Appbar.Action icon="wrench-clock" onPress={onPress} color={theme.colors.secondary} />
		</Appbar.Header>
	)
}

export default Header