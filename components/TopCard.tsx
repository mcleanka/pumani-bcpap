import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

type Prop = {
	count: number;
}

const TopCard: React.FC<Prop> = ({ count }) => {
	const theme = useTheme()

	return (
		<View style={[styles.card, {
			backgroundColor: theme.colors.secondary,
			borderWidth: 1,
			borderColor: '#86efac',
			borderRadius: 5,
		}]}>
			<Text style={styles.count}>{count ?? 0}</Text>
			<Text style={styles.description}>
				Speed (Rev/sec)
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		padding: 20,
		alignItems: 'center',
		justifyContent: 'center',
		height: 100,
		marginTop: 10,
	},
	count: {
		fontSize: 24,
		fontWeight: 'bold',
	},
	description: {
		fontSize: 18,
	}
});

export default TopCard
