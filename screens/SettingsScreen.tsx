/**
 * @author Pumani bCPAP Team
 * @description
 * this code represents a settings screen where users can adjust the flow rate, 
 * and it provides visual feedback through loading indicators and toast messages
 * when adjustments are made.
 */
// libries
import Toast from 'react-native-toast-message';
import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { Button, Card, Paragraph, TextInput, Title } from 'react-native-paper';

// custom components
import theme from '../theme';
import { Header, ScreenLoader } from '../components';
import useApp from '../provider/AppProvider';

const SettingsScreen: React.FC = () => {
	const { flowRate, setFlowRate } = useApp()
	const [pressureRate, setPressureRate] = useState(flowRate)
	const [isLoading, setIsLoading] = useState<boolean>(true)

	const handleInputChange = (text: number) => {
		const numericValue = parseInt(text.toString(), 10);
		if (!isNaN(numericValue) && numericValue >= 0) {
			setPressureRate(numericValue);
		} else setPressureRate(0);
	};

	const showToast = () => {
		setIsLoading(true)
		setFlowRate(pressureRate);

		Toast.show({
			type: 'success',
			text2: 'Flow rate speed adjusted successfully!',
		});

		const interval = setTimeout(() => {
			setIsLoading(false)
		}, 1000);

		return () => clearInterval(interval);
	};

	useEffect(() => {
		const interval = setTimeout(() => {
			setIsLoading(false)
		}, 1000);

		return () => clearInterval(interval);

	}, [])

	if (isLoading) return (<ScreenLoader size={'large'} />);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#fff', marginBottom: 0 }}>
			<Header title="Settings" />

			<View style={styles.container}>
				<Card style={[styles.card, { backgroundColor: theme.colors.secondary }]} elevation={1}>
					<Card.Content>
						<Title>Flow rate</Title>
						<Paragraph>{pressureRate}</Paragraph>
					</Card.Content>
					<Card.Actions>
						<Button onPress={showToast}>Save</Button>
					</Card.Actions>
				</Card>

				<TextInput
					mode="outlined"
					style={styles.textInput}
					onChangeText={handleInputChange as any}
					value={(pressureRate).toString() as any}
					placeholder="Enter a value"
					label="Change flow rate"
					keyboardType="number-pad"
				/>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		alignItems: 'center',
		justifyContent: 'center',
	},
	textInput: {
		width: '80%',
	},
	card: {
		width: '80%',
		borderRadius: 4,
		marginBottom: 22,
	},
});

export default SettingsScreen;
