import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Button,
	TextInput,
	TouchableWithoutFeedback,
	Keyboard,
	Alert,
	Dimensions,
	ScrollView,
	KeyboardAvoidingView,
} from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import MainButton from '../components/MainButton';
import Colors from '../constants/Colors';
const StartScreen = (props) => {
	const [enteredValue, setEnteredValue] = useState('');
	const [confirmed, setConfirmed] = useState(false);
	const [selectedNumber, setSelectedNumber] = useState();
	//orientations
	const [buttonWidth, setButtonWidth] = useState(
		Dimensions.get('window').width / 4
	);
	useEffect(() => {
		const updateLayout = () => {
			setButtonWidth(Dimensions.get('window').width / 4);
		};
		Dimensions.addEventListener('change', updateLayout);
		return () => {
			Dimensions.removeEventListener('change', updateLayout);
		};
	});

	//validation
	const numberInputHandler = (inputText) => {
		setEnteredValue(inputText.replace(/[^0-9]/g, '')); //replace decimal,,_ with empty space while typing
	};
	const resetInputHandler = () => {
		setEnteredValue('');
	};
	const confirmInputHandler = () => {
		const choosenNumber = parseInt(enteredValue);
		if (isNaN(choosenNumber) || choosenNumber <= 0 || choosenNumber > 99) {
			//Alert for invalid
			Alert.alert('Invalid Number', 'Number has to be between 1 and 99', [
				{ text: 'okay', style: 'destructive', onPress: resetInputHandler },
			]);
			return;
		}
		setEnteredValue('');
		setSelectedNumber(choosenNumber);
		setConfirmed(true);
		Keyboard.dismiss();
	};
	let confirmedOutput;
	if (confirmed) {
		confirmedOutput = (
			<Card style={styles.summaryContainer}>
				<Text>You Selected</Text>
				<NumberContainer>{selectedNumber}</NumberContainer>
				<MainButton onPress={() => props.onStartGame(selectedNumber)}>
					Start Game
				</MainButton>
			</Card>
		);
	}
	return (
		<ScrollView>
			<KeyboardAvoidingView behavior='position' keyboardVerticalOffset={30}>
				<TouchableWithoutFeedback
					onPress={() => {
						Keyboard.dismiss();
					}}
				>
					<View style={styles.screen}>
						<Text style={styles.title}>Start a New Game</Text>
						<Card style={styles.inputContainer}>
							<Text>Enter a number</Text>
							<Input
								style={styles.input}
								blurOnSubmit
								autoCaptilize='none'
								autoCorrect={false}
								keyboardType='number-pad'
								maxLength={2}
								onChangeText={numberInputHandler}
								value={enteredValue}
							/>
							<View style={styles.buttonContainer}>
								<View style={{ width: buttonWidth }}>
									<Button
										title='Reset'
										color={Colors.accent}
										onPress={resetInputHandler}
									/>
								</View>
								<View style={{ width: buttonWidth }}>
									<Button
										title='Confirm'
										color={Colors.primary}
										onPress={confirmInputHandler}
									/>
								</View>
							</View>
						</Card>
						{confirmedOutput}
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</ScrollView>
	);
};
const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: 'center',
		padding: 10,
	},
	title: {
		fontSize: 20,
		marginVertical: 10,
		// fontFamily: 'OpenSans-Bold',
	},
	inputContainer: {
		width: '80%',
		maxWidth: '95%',
		minWidth: 300, //small devices
		alignItems: 'center',
		// backgroundColor: 'white',
		// shadowColor: 'black',
		// shadowOpacity: 0.26,
		// shadowOffset: { width: 0, height: 2 },
		// shadowRadius: 6,
		// elevation: 8, //for shadow in android
		// padding: 20,
		// borderRadius: 10,
	},
	input: {
		width: '20%',
		textAlign: 'center',
		//borderColor: 'grey',
		// borderBottomWidth: 1,
		// height: 30,
		// marginVertical: 10,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '80%',
	},
	// button: {
	// 	// width: '40%',
	// 	//or
	// 	//width: Dimensions.get('window').width / 4,
	// 	width: buttonWidth, //for diff orientation
	// },

	summaryContainer: {
		marginVertical: 20,
		alignItems: 'center',
	},
});
export default StartScreen;
