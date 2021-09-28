import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
const Header = ({ title }) => {
	return (
		<View
			style={{
				...styles.header,
				...Platform.select({
					ios: styles.headerIOS,
					android: styles.headerAndroid,
				}),
			}}
		>
			<Text style={styles.headerTitle}>{title}</Text>
		</View>
	);
};
const styles = StyleSheet.create({
	header: {
		width: '100%',
		// backgroundColor: 'crimson',
		height: 90,
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 36,
	},
	headerIOS: {
		backgroundColor: Platform.OS === 'ios' ? 'crimson' : 'white',
	},
	headerAndroid: {
		backgroundColor: Platform.OS === 'android' ? 'crimson' : 'white',
	},
	headerTitle: {
		color: Platform.OS === 'ios' ? 'white' : 'black',
		fontSize: 18,
	},
});
export default Header;
