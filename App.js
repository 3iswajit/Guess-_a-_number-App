import React, { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

// import * as Font from 'expo-font';
// import { AppLoading } from 'expo';

import Header from './components/Header';
import GameOverScreen from './screens/GameOverScreen';
import GameScreen from './screens/GameScreen';
import StartScreen from './screens/StartScreen';

// const fetchFonts = () => {
// 	return Font.loadAsync({
// 		'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
// 		'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
// 	});
// };

export default function App() {
	const [userNumber, setUserNumber] = useState();
	const [guessRounds, setGuessRounds] = useState(0);

	// const [dataLoaded, setDataLoaded] = useState(false);
	// if (!dataLoaded) {
	// 	return (
	// 		<AppLoading
	// 			startAsync={fetchFonts}
	// 			onFinish={() => setDataLoaded(true)}
	// 			onError={(err) => console.log(err)}
	// 		/>
	// 	);
	// }

	const startGameHandler = (selectedNumber) => {
		setUserNumber(selectedNumber);
		setGuessRounds(0);
	};
	const gameOverHandler = (numOfRounds) => {
		setGuessRounds(numOfRounds);
	};
	const configureNewGameHandler = () => {
		setUserNumber(null);
		setGuessRounds(0);
	};
	let content = <StartScreen onStartGame={startGameHandler} />;

	if (userNumber && guessRounds <= 0) {
		content = (
			<GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
		);
	} else if (guessRounds > 0) {
		content = (
			<GameOverScreen
				userNumber={userNumber}
				roundsNumber={guessRounds}
				onRestart={configureNewGameHandler}
			/>
		);
	}
	return (
		<SafeAreaView style={styles.screen}>
			<Header title='Number Game' />
			{content}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: '#fff',
		// alignItems: 'center',
		// justifyContent: 'center',
	},
});
