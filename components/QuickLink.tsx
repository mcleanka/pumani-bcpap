import React from 'react';
import { Dimensions, GestureResponderEvent, TouchableOpacity } from 'react-native';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

type Props = {
	title: string;
	count: string;
};

const QuickLink: React.FC<Props> = ({ title, count }) => {
	const theme = useTheme();

	return (
		<View style={styles.container}>
			<View style={[styles.card, {
				backgroundColor: theme.colors.secondary,
			}]}>
				<View style={styles.iconContainer}>
					<Text style={styles.count}>
						{count}
					</Text>
				</View>
			</View>
			<Text style={styles.title}>{title}</Text>
		</View>
	);
};

const width = Dimensions.get('screen').width

const styles = StyleSheet.create({
	container: {
		width: '50%',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	title: {
		fontSize: 14,
		textAlign: 'center',
		color: '#444',
	},
	count: {
		fontSize: 20,
		textAlign: 'center',
		color: '#444',
	},
	card: {
		width: width / (2 + .4),
		height: 90,
		borderWidth: 1,
		borderColor: '#86efac',
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 10,
	},
	iconContainer: {
		flex: 1,
		justifyContent: 'center',
	},
});

export default QuickLink;
