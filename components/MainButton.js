import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	TouchableNativeFeedback,
	Platform,
} from 'react-native';
import Colors from '../constants/Colors';
const MainButton = (props) => {
	let ButtonComponent = TouchableOpacity;
	if (Platform.OS === 'android' && Platform.Version >= 21) {
		ButtonComponent = TouchableNativeFeedback; //ripple Effect
	}

	return (
		<View style={styles.buttonContainer}>
			<ButtonComponent activeOpacity={0.8} onPress={props.onPress}>
				<View style={styles.button}>
					<Text style={styles.buttonText}>{props.children}</Text>
				</View>
			</ButtonComponent>
		</View>
	);
};
const styles = StyleSheet.create({
	buttonContainer: {
		borderRadius: 25,
		overflow: 'hidden', //remove this and see the effect
	},
	button: {
		paddingHorizontal: 30,
		paddingVertical: 12,
		backgroundColor: Colors.primary,
		borderRadius: 25,
	},
	buttonText: {
		color: 'white',
		fontSize: 18,
	},
});
export default MainButton;
