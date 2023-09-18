import { Platform } from 'react-native';
import {
	MD3LightTheme as DefaultTheme,
	configureFonts,
} from 'react-native-paper';

const fontConfig: any = {
	customVariant: {
		fontFamily: Platform.select({
			web: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
			ios: 'System',
			default: 'Lato',
		}),
		fontWeight: '400',
		letterSpacing: 0.5,
		lineHeight: 22,
		fontSize: 20,
	},
};

const theme = {
	...DefaultTheme,
	fonts: configureFonts({ config: fontConfig }),
	colors: {
		...DefaultTheme.colors,
		primary: '#15803d',
		secondary: '#ecfdf5',
		tertiary: '#86efac',
		shadow: '#e0e7ff',
		scrim: '#ff9900',
	},
};

export default theme;
