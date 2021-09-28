import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
const NumberContainer = (props) => {
	return (
		<View style={styles.container}>
			<Text style={styles.number}>{props.children}</Text>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		borderWidth: 2,
		borderColor: Colors.accent,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		padding: 10,
		marginVertical: 10,
	},
	number: {
		fontSize: 22,
		color: Colors.accent,
	},
});
export default NumberContainer;
