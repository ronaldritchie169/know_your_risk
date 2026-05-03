import { useState } from 'react';
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const stiData: Record<string, string> = {
  md: `Maryland (2023 CDC Data)

Chlamydia:
35,836 cases
579.8 per 100,000

Gonorrhea:
12,802 cases
207.1 per 100,000

Syphilis (Primary & Secondary):
878 cases
14.2 per 100,000

Source:
CDC STI Surveillance 2023`,

  pa: `Pennsylvania

Data structure ready.
Exact CDC numbers not loaded yet.`,

  va: `Virginia

Data structure ready.
Exact CDC numbers not loaded yet.`,

  wv: `West Virginia

Data structure ready.
Exact CDC numbers not loaded yet.`,

  ca: `California

Data structure ready.
Exact CDC numbers not loaded yet.`,

  ny: `New York

Data structure ready.
Exact CDC numbers not loaded yet.`,

  fl: `Florida

Data structure ready.
Exact CDC numbers not loaded yet.`,

  tx: `Texas

Data structure ready.
Exact CDC numbers not loaded yet.`,
};

export default function HomeScreen() {
  const [screen, setScreen] = useState('home');
  const [step, setStep] = useState(0);
  const [yesCount, setYesCount] = useState(0);
  const [testingZip, setTestingZip] = useState('');
  const [stateName, setStateName] = useState('');
  const [stateResult, setStateResult] = useState('');

  const questions = [
    'Do you have any symptoms?',
    'Have you had unprotected sex recently?',
  ];

  function goHome() {
    setScreen('home');
    setStep(0);
    setYesCount(0);
  }

  function handleAnswer(answer: 'yes' | 'no') {
    if (answer === 'yes') setYesCount((prev) => prev + 1);
    if (step < questions.length - 1) setStep((prev) => prev + 1);
    else setScreen('result');
  }

  function checkStateData() {
    const clean = stateName.trim().toLowerCase();

    if (clean === '') {
      setStateResult('Enter a state abbreviation, like MD, PA, VA, WV, CA, NY, FL, or TX.');
      return;
    }

    const result = stiData[clean];

    if (result) {
      setStateResult(result);
      return;
    }

    setStateResult(
      `${stateName.toUpperCase()}

State structure ready.

Exact CDC numbers are not loaded for this state yet.

Next upgrade:
Add full CDC state dataset.`
    );
  }

  function openTesting() {
    if (testingZip.length !== 5) return;
    Linking.openURL(`https://www.google.com/maps/search/std+testing+near+${testingZip}`);
  }

  function openCDC() {
    Linking.openURL('https://www.cdc.gov/sti-statistics/');
  }

  if (screen === 'realData') {
    return (
      <ScrollView style={styles.page} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Real STI Data</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter state abbreviation, example: MD"
          placeholderTextColor="#94A3B8"
          value={stateName}
          onChangeText={setStateName}
          autoCapitalize="characters"
        />

        <Pressable style={styles.button} onPress={checkStateData}>
          <Text style={styles.buttonText}>Check State</Text>
        </Pressable>

        {stateResult !== '' && (
          <View style={styles.card}>
            <Text style={styles.cardText}>{stateResult}</Text>
          </View>
        )}

        <Pressable style={styles.button} onPress={openCDC}>
          <Text style={styles.buttonText}>Open CDC Data</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={goHome}>
          <Text style={styles.buttonText}>Back Home</Text>
        </Pressable>
      </ScrollView>
    );
  }

  if (screen === 'result') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Your Result</Text>

        <Text style={styles.result}>
          {yesCount >= 1 ? 'Testing Recommended' : 'Low Immediate Concern'}
        </Text>

        <Pressable style={styles.button} onPress={() => setScreen('testing')}>
          <Text style={styles.buttonText}>Find Testing</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={goHome}>
          <Text style={styles.buttonText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  if (screen === 'symptom') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Symptom Check</Text>

        <Text style={styles.question}>{questions[step]}</Text>

        <Pressable style={styles.button} onPress={() => handleAnswer('yes')}>
          <Text style={styles.buttonText}>Yes</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => handleAnswer('no')}>
          <Text style={styles.buttonText}>No</Text>
        </Pressable>
      </View>
    );
  }

  if (screen === 'testing') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Find Testing</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter ZIP"
          placeholderTextColor="#94A3B8"
          value={testingZip}
          onChangeText={setTestingZip}
          keyboardType="number-pad"
          maxLength={5}
        />

        <Pressable style={styles.button} onPress={openTesting}>
          <Text style={styles.buttonText}>Open Map</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={goHome}>
          <Text style={styles.buttonText}>Back Home</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Know Your Risk</Text>

      <Pressable style={styles.button} onPress={() => setScreen('symptom')}>
        <Text style={styles.buttonText}>Start Symptom Check</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => setScreen('realData')}>
        <Text style={styles.buttonText}>Real STI Data</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => setScreen('testing')}>
        <Text style={styles.buttonText}>Testing Locator</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#07111F' },
  content: { padding: 22, paddingTop: 70 },
  container: {
    flex: 1,
    backgroundColor: '#07111F',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 24,
    textAlign: 'center',
  },
  question: {
    color: '#FFFFFF',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#38BDF8',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    marginTop: 12,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#06101E',
    fontSize: 16,
    fontWeight: '800',
  },
  result: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    marginTop: 20,
  },
  input: {
    backgroundColor: '#111C2E',
    color: '#FFFFFF',
    padding: 12,
    width: '80%',
    borderRadius: 10,
    marginBottom: 12,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#111C2E',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  cardText: {
    color: '#CBD5E1',
    lineHeight: 22,
  },
});