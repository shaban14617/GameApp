import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View, Text, FlatList } from 'react-native';
import Title from '../components/ui/Title';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import { Ionicons } from '@expo/vector-icons';
import GuessLogItem from '../components/game/GuessLogItem';

function generateRandomBetween(min, max, exclude) {
  let rndNum = Math.floor(Math.random() * (max - min + 1)) + min;
  let attempts = 0;

  while (rndNum === exclude && attempts < 10) {
    rndNum = Math.floor(Math.random() * (max - min + 1)) + min;
    attempts++;
  }

  return rndNum;
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, onGameOver }) {
  const [currentGuess, setCurrentGuess] = useState(null);
  const [guessRounds, setGuessRounds] = useState([]);

  useEffect(() => {
    const initialGuess = generateRandomBetween(
      minBoundary,
      maxBoundary,
      userNumber
    );
    setCurrentGuess(initialGuess);
    setGuessRounds([initialGuess]);
  }, [userNumber]);

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNumber, onGameOver, guessRounds]);

  function nextGuessHandler(direction) {
    if (
      (direction === 'lower' && currentGuess < userNumber) ||
      (direction === 'greater' && currentGuess > userNumber)
    ) {
      Alert.alert('You are Cheating!', 'You know that this is wrong...', [
        { text: 'Sorry', style: 'cancel' },
      ]);
      return;
    }

    if (direction === 'lower') {
      maxBoundary = currentGuess;
    } else if (direction === 'greater') {
      minBoundary = currentGuess + 1;
    }

    const newRndNum = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNum);
    setGuessRounds((prev) => [...prev, newRndNum]);
  }

  return (
    <View style={styles.screen}>
      <Title>Game Screen</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <Card>
          <InstructionText style={styles.instructionText}>
            Higher or Lower
          </InstructionText>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <PrimaryButton onPress={() => nextGuessHandler('lower')}>
              <Ionicons name="remove" size={24} />
            </PrimaryButton>
            <PrimaryButton onPress={() => nextGuessHandler('greater')}>
              <Ionicons name="add" size={24} />
            </PrimaryButton>
          </View>
        </Card>
        <View>
          {/* {guessRounds.map((guessRound, index) => (
            <Text key={index}>{guessRound}</Text>
          ))} */}
          <FlatList
            data={guessRounds}
            renderItem={(itemData) => (
              <GuessLogItem
                roundNumber={itemData.index}
                guess={itemData.item}
              />
            )}
            keyExtractor={(item) => item}
          />
        </View>
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  instructionText: {
    marginBottom: 12,
  },
});
