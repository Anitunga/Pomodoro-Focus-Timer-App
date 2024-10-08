import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type TimerScreenProps = {
  route: RouteProp<{ params: { timeLeft: number } }, 'params'>;
  navigation: StackNavigationProp<any>;
};

const TimerScreen: React.FC<TimerScreenProps> = ({ route }) => {
  const { timeLeft } = route.params; // Extracting the time left from the route params

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{timeLeft} seconds remaining</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  timerText: {
    fontSize: 48,
    color: '#FFF',
  },
});

export default TimerScreen;
