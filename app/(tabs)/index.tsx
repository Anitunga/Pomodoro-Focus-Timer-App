import { Image, StyleSheet, View, Text, TouchableOpacity, Switch } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const [pomodoroMinutes, setPomodoroMinutes] = useState(25);
  const [hasBreaks, setHasBreaks] = useState(true);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(pomodoroMinutes * 60); // time in seconds
  const navigation = useNavigation();

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null; // Explicit type declaration for TypeScript

    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Timer has finished
      handleSessionEnd();
    }

    return () => {
      if (timer) clearInterval(timer); // Clear the timer only if it exists
    };
  }, [isTimerRunning, timeLeft]);

  const handleStartSession = () => {
    setIsTimerRunning(true);
    setTimeLeft(pomodoroMinutes * 60); // Reset timeLeft based on current minutes
    /*navigation.navigate('TimerScreen', { timeLeft: pomodoroMinutes * 60 });*/ // Pass time in seconds
  };

  const handleSessionEnd = () => {
    setIsTimerRunning(false);
    // Check for lottery ticket
    const wonTicket = Math.random() < 0.5; // 50% chance to win
    if (wonTicket) {
      alert('Congratulations! You won a lottery ticket!');
    } else {
      alert('Keep trying for a lottery ticket next time!');
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      {/* Focus Session Section */}
      <ThemedView style={styles.focusSessionContainer}>
        <ThemedText type="title" style={styles.sectionTitle}>Get ready to focus</ThemedText>
        <ThemedText style={styles.subtitle}>
          We'll turn off notifications and alerts during your session. Add breaks for longer focus.
        </ThemedText>

        {/* Timer Control */}
        <View style={styles.timerControl}>
          <TouchableOpacity
            style={styles.timerButton}
            onPress={() => setPomodoroMinutes(prev => Math.max(prev - 5, 5))}
          >
            <Text>-</Text>
          </TouchableOpacity>
          <ThemedText style={styles.timerText}>{pomodoroMinutes}</ThemedText>
          <TouchableOpacity
            style={styles.timerButton}
            onPress={() => setPomodoroMinutes(prev => prev + 5)}
          >
            <Text>+</Text>
          </TouchableOpacity>
        </View>

        {/* Break Option */}
        <View style={styles.breakControl}>
          <Switch value={hasBreaks} onValueChange={setHasBreaks} />
          <ThemedText style={styles.subtitle}>You'll have breaks</ThemedText>
        </View>

        <TouchableOpacity style={styles.startButton} onPress={handleStartSession}>
          <ThemedText type="defaultSemiBold">Start Focus Session</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* Daily Progress */}
      <ThemedView style={styles.progressContainer}>
        <ThemedText type="title" style={styles.sectionTitle}>Daily Progress</ThemedText>
        <View style={styles.circularProgress}>
          <ThemedText>{Math.floor(timeLeft / 60)} minutes left</ThemedText>
          <ThemedText>Daily Goal: 1 hour</ThemedText>
          <ThemedText>Streak: 0 days</ThemedText>
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

// Styles remain unchanged
const styles = StyleSheet.create({
  focusSessionContainer: {
    backgroundColor: '#333',
    padding: 16,
    borderRadius: 8,
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#FFF',
  },
  subtitle: {
    fontSize: 14,
    color: '#CCC',
    marginTop: 8,
  },
  timerControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  timerButton: {
    backgroundColor: '#444',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  timerText: {
    fontSize: 48,
    color: '#FFF',
  },
  breakControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  startButton: {
    backgroundColor: '#444',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  progressContainer: {
    backgroundColor: '#333',
    padding: 16,
    borderRadius: 8,
    marginVertical: 16,
    alignItems: 'center',
  },
  circularProgress: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
