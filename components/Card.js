import React, { Children } from 'react';
import { StyleSheet, View } from 'react-native';
const Card = (props) => {
	return (
		<View style={{ ...styles.card, ...props.style }}>{props.children}</View>
	);
};
const styles = StyleSheet.create({
	card: {
		backgroundColor: 'white',
		shadowColor: 'black',
		shadowOpacity: 0.26,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 6,
		elevation: 8, //for shadow in android
		padding: 20,
		borderRadius: 10,
	},
});
export default Card;
