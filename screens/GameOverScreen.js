import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	Button,
	Dimensions,
	ScrollView,
} from 'react-native';
import MainButton from '../components/MainButton';
const GameOverScreen = (props) => {
	//orientations we only use inlineStyling
	const [availableDeviceWidth, setAvailbleDeviceWidth] = useState(
		Dimensions.get('window').width
	);
	const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
		Dimensions.get('window').height
	);
	const updateLayout = () => {
		setAvailbleDeviceWidth(Dimensions.get('window').width);
		setAvailableDeviceHeight(Dimensions.get('window').height);
	};
	useEffect(() => {
		Dimensions.addEventListener('change', updateLayout);
		return () => {
			Dimensions.removeEventListener('change', updateLayout);
		};
	});
	return (
		<ScrollView>
			<View style={styles.screen}>
				<Text style={styles.title}>Game is Over</Text>
				<View
					style={{
						width: availableDeviceWidth * 0.7,
						height: availableDeviceWidth * 0.7,
						borderRadius: (availableDeviceWidth * 0.7) / 2,
						marginVertical: availableDeviceHeight / 30, //30
						borderColor: 'black',
						borderWidth: 3,
						overflow: 'hidden',
					}}
				>
					<Image
						source={require('../assets/success.png')}
						style={styles.image}
						resizeMode='cover'
					/>
				</View>
				<View style={styles.resultContainer}>
					<Text style={styles.resultText}>
						Your Phone needs{' '}
						<Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to
						guess number{' '}
						<Text style={styles.highlight}>{props.userNumber}</Text>
					</Text>
				</View>
				<MainButton onPress={props.onRestart}>New Game</MainButton>
			</View>
		</ScrollView>
	);
};
const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 10,
	},
	title: {
		fontSize: 20,
	},
	// imageContainer: {
	// 	width: Dimensions.get('window').width * 0.7, //70%
	// 	height: Dimensions.get('window').width * 0.7,
	// 	borderRadius: (Dimensions.get('window').width * 0.7) / 2,
	// 	marginVertical: Dimensions.get('window').height / 30, //30
	//orientations
	// width: availableDeviceWidth * 0.7, //70%
	// height: availableDeviceWidth * 0.7,
	// borderRadius: (availableDeviceWidth * 0.7) / 2,
	// marginVertical: availableDeviceHeight / 30, //30
	// 	borderColor: 'black',
	// 	borderWidth: 3,
	// 	overflow: 'hidden',
	// },
	image: {
		width: '100%',
		height: '100%',
	},
	resultContainer: {
		marginHorizontal: 40,
		marginVertical: Dimensions.get('window').height / 60, //15
		//marginVertical: availableDeviceHeight / 60, //15
	},
	resultText: {
		fontSize: Dimensions.get('window').height < 400 ? 16 : 20,
		//fontSize: availableDeviceHeight < 400 ? 16 : 20,
		textAlign: 'center',
	},
	highlight: {
		color: 'red',
	},
});
export default GameOverScreen;
