/**
 * @author Pumani bCPAP Team
 * @description
 * this code represents a settings screen where users can adjust the flow rate, 
 * and it provides visual feedback through loading indicators and toast messages
 * when adjustments are made.
 */
// libries
import Toast from 'react-native-toast-message';
import React, { useEffect, useRef, useState } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { Button, Card, Paragraph, RadioButton, TextInput, Title, Text, HelperText } from 'react-native-paper';
import * as Yup from 'yup';

// custom components
import theme from '../theme';
import { Header, ScreenLoader } from '../components';
import useApp from '../provider/AppProvider';
import { ErrorMessage, Formik } from 'formik';
import axios from 'axios';

const SettingsScreen: React.FC = () => {
	const { flowRate, setFlowRate } = useApp()
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const formikRef = useRef<any>();

	useEffect(() => {
		const interval = setTimeout(() => {
			setIsLoading(false)
		}, 1000);

		return () => clearInterval(interval);

	}, [])

	const validationSchema = Yup.object().shape({
		ageGroup: Yup.string().required('Age group is required'),
		neonatePressureRate: Yup.number()
			.min(3, 'Neonate flow rate must start from 3')
			.max(4, 'Neonate flow rate must end at 4')
			.required('Pressure rate is required for neonate'),
		childPressureRate: Yup.number()
			.min(5, 'Child flow rate be must start from 5')
			.max(10, 'Child flow rate be must end at 10')
			.required('Pressure rate is required for child'),
	});

	const handleSubmit = () => {
		if (formikRef.current)
			formikRef.current.submitForm();
	}

	const handleOnSubmit = (value: Record<string, string>) => {
		setIsLoading(true);
		const flowRate = parseInt((value.ageGroup === 'child' && value.childPressureRate || value.ageGroup === 'neonate' && value.neonatePressureRate)
			.toString(), 10);

		if (!isNaN(flowRate) && flowRate >= 0) {
			setFlowRate(flowRate);
			const formData = new FormData();
			formData.append('flow_rate', flowRate);
			formData.append('age_group', value.ageGroup);

			axios.post('http://192.168.1.127/pumani/save-motor-speed.php', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}).then(response => {
				// Handle success (e.g., show a success message)
				if (response?.data?.success === true) Toast.show({
					type: 'success',
					text2: response.data.message,
				});
			}).catch(error => {
				// Handle error (e.g., show an error message5
				Toast.show({
					type: 'error',
					text2: 'Error while saving data.',
				});
			}).finally(() => {
				setIsLoading(false);
			})
		} else setFlowRate(0);
	}

	if (isLoading) return (<ScreenLoader size={'large'} />);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#fff', marginBottom: 0 }}>
			<Header title="Settings" />

			<View style={styles.container}>

				<Formik
					innerRef={formikRef}
					initialValues={{
						ageGroup: 'neonate',
						neonatePressureRate: '3',
						childPressureRate: '3',
					}}
					validationSchema={validationSchema}
					onSubmit={(values) => handleOnSubmit(values)}
				>
					{({ handleChange, handleBlur, values, errors, touched }) => (
						<>
							<Card>
								<Card.Content>
									<Text>Select age group</Text>
									<RadioButton.Group
										onValueChange={handleChange('ageGroup')}
										value={values.ageGroup}
									>
										<RadioButton.Item label="Neonate" value="neonate" />
										<RadioButton.Item label="Child" value="child" />
									</RadioButton.Group>

									{values.ageGroup === 'neonate' && <>
										<TextInput
											mode='outlined'
											label={'Change flow rate'}
											placeholder={'Enter flow rate for ' + values.ageGroup}
											onChangeText={handleChange('neonatePressureRate')}
											onBlur={handleBlur('neonatePressureRate')}
											value={values.neonatePressureRate.toString()}
											keyboardType="phone-pad"
											error={touched.neonatePressureRate && Boolean(errors.neonatePressureRate)}
											editable={!isLoading}
										/>
										<HelperText type="error" visible={(touched.neonatePressureRate && Boolean(errors.neonatePressureRate))} padding='none'>
											<ErrorMessage name="neonatePressureRate" />
										</HelperText>
									</>}

									{values.ageGroup === 'child' && <>
										<TextInput
											mode='outlined'
											label={'Change flow rate'}
											placeholder={'Enter flow rate for ' + values.ageGroup}
											onChangeText={handleChange('childPressureRate')}
											onBlur={handleBlur('childPressureRate')}
											value={values.childPressureRate.toString()}
											keyboardType="phone-pad"
											error={touched.childPressureRate && Boolean(errors.childPressureRate)}
											editable={!isLoading}
										/>
										<HelperText type="error" visible={(touched.childPressureRate && Boolean(errors.childPressureRate))} padding='none'>
											<ErrorMessage name="childPressureRate" />
										</HelperText>
									</>}
								</Card.Content>
							</Card>


							<Card style={[styles.card, {
								marginTop: 22,
								backgroundColor: theme.colors.secondary
							}]} elevation={1}>
								<Card.Content>
									<Title>Flow rate</Title>
									<Paragraph>{values.ageGroup === 'child' && values.childPressureRate || values.ageGroup === 'neonate' && values.neonatePressureRate}</Paragraph>
								</Card.Content>
								<Card.Actions>
									<Button onPress={handleSubmit}>Save</Button>
								</Card.Actions>
							</Card>
						</>
					)}
				</Formik>

			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		// alignItems: 'center',
		justifyContent: 'center',
	},
	textInput: {
		width: '100%',
	},
	card: {
		width: '100%',
		borderRadius: 4,
	},
});

export default SettingsScreen;
