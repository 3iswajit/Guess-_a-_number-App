import React, { useEffect, useRef, useState } from 'react';
import {
	View,
	StyleSheet,
	Text,
	Button,
	Alert,
	ScrollView,
	FlatList,
	Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import NumberContainer from '../components/NumberContainer';
const generateRandomBetween = (min, max, exclude) => {
	//random number between min and max excluding max
	min = Math.ceil(min);
	max = Math.floor(max);
	const rndNum = Math.floor(Math.random() * (max - min)) + min;
	if (rndNum === exclude) {
		return generateRandomBetween(min, max, exclude);
	} else {
		return rndNum;
	}
};
//for scrollview
// const renderListItems = (guess, numOfRound) => (
// 	<View key={guess} style={styles.listItems}>
// 		<Text>#{numOfRound}</Text>
// 		<Text>{guess}</Text>
// 	</View>
// );

//for FlatList
//itemData =>{index: , item: }
const renderListItems = (listLength, itemData) => (
	<View style={styles.listItems}>
		<Text>#{listLength - itemData.index}</Text>
		<Text>{itemData.item}</Text>
	</View>
);
const GameScreen = (props) => {
	const initialGuess = generateRandomBetween(1, 100, props.userChoice);
	const [currentGuess, setCurrentGuess] = useState(initialGuess);
	const [pastGuesses, setPastGuessses] = useState([initialGuess.toString()]);
	//orientations
	const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
		Dimensions.get('window').width
	);
	const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
		Dimensions.get('window').height
	);
	const updateLayout = () => {
		setAvailableDeviceWidth(Dimensions.get('window').width);
		setAvailableDeviceHeight(Dimensions.get('window').height);
	};
	useEffect(() => {
		Dimensions.addEventListener('change', updateLayout);
		return () => {
			Dimensions.removeEventListener('change', updateLayout);
		};
	});

	//const [rounds, setRounds] = useState(0);
	const currentHigh = useRef(100);
	const currentLow = useRef(1);

	useEffect(() => {
		if (currentGuess === props.userChoice) {
			props.onGameOver(pastGuesses.length);
		}
	}, [currentGuess, props.userChoice, props.onGameOver]);

	const nextGuessHandler = (direction) => {
		if (
			(direction === 'lower' && currentGuess < props.userChoice) ||
			(direction === 'higher' && currentGuess > props.userChoice)
		) {
			Alert.alert('WRONG', 'TELL THE CORRECT DIRECTION', [
				{
					text: 'Sorry!',
					style: 'cancel',
				},
			]);
			return;
		}
		if (direction === 'lower') {
			currentHigh.current = currentGuess;
		} else {
			currentLow.current = currentGuess + 1;
		}
		const nextNumber = generateRandomBetween(
			currentLow.current,
			currentHigh.current,
			currentGuess
		);
		setCurrentGuess(nextNumber);
		// setRounds((x) => x + 1);
		setPastGuessses((x) => [nextNumber.toString(), ...x]); //keyextractor needs the key to be string
	};
	//orientation
	if (availableDeviceHeight < 500) {
		return (
			<View style={styles.screen}>
				<Text style={styles.title}>Computer Guess Number</Text>
				<View style={styles.controls}>
					<MainButton onPress={() => nextGuessHandler('lower')}>
						<Ionicons name='md-remove' color='white' size={24} />
					</MainButton>
					<NumberContainer>{currentGuess}</NumberContainer>
					<MainButton onPress={() => nextGuessHandler('higher')}>
						<Ionicons name='md-add' color='white' size={24} />
					</MainButton>
				</View>

				<View style={styles.listContainer}>
					{/* <ScrollView contentContainerStyle={styles.list}>
					{pastGuesses.map((guess, index) =>
						renderListItems(guess, pastGuesses.length - index)
					)}
				</ScrollView> */}
					<FlatList
						keyExtractor={(item) => item}
						data={pastGuesses}
						renderItem={(itemData) =>
							renderListItems(pastGuesses.length, itemData)
						}
						contentContainerStyle={styles.list}
					/>
					{/* keyextractor needs the key to be string */}
				</View>
			</View>
		);
	}
	return (
		<View style={styles.screen}>
			<Text style={styles.title}>Computer Guess Number</Text>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card style={styles.buttonContainer}>
				<MainButton onPress={() => nextGuessHandler('lower')}>
					<Ionicons name='md-remove' color='white' size={24} />
				</MainButton>
				<MainButton onPress={() => nextGuessHandler('higher')}>
					<Ionicons name='md-add' color='white' size={24} />
				</MainButton>
			</Card>
			<View style={styles.listContainer}>
				{/* <ScrollView contentContainerStyle={styles.list}>
					{pastGuesses.map((guess, index) =>
						renderListItems(guess, pastGuesses.length - index)
					)}
				</ScrollView> */}
				<FlatList
					keyExtractor={(item) => item}
					data={pastGuesses}
					renderItem={(itemData) =>
						renderListItems(pastGuesses.length, itemData)
					}
					contentContainerStyle={styles.list}
				/>
				{/* keyextractor needs the key to be string */}
			</View>
		</View>
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
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '80%',
		maxWidth: '90%',
		marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
	},
	listContainer: {
		flex: 1, //scroll to work in android
		// width: '60%',
		width: Dimensions.get('window').width > 350 ? '60%' : '80%',
	},
	list: {
		flexGrow: 1, //so that flex end will work and flexGrow instead of flex because of android to scroll
		//alignItems: 'center', //for scrollView
		justifyContent: 'flex-end',
	},
	listItems: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 15,
		borderColor: '#ccc',
		borderWidth: 1,
		marginVertical: 10,
		width: '100%',
	},
	controls: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		width: '80%',
	},
});
export default GameScreen;
