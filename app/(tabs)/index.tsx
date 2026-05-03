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

type Screen =
  | 'home'
  | 'symptom'
  | 'result'
  | 'library'
  | 'zip'
  | 'testing'
  | 'realData'
  | 'info';

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
};

const diseases = [
  {
    name: 'Chlamydia',
    info: 'Often has no symptoms. May cause burning urination, discharge, pelvic pain, or testicular pain.',
  },
  {
    name: 'Gonorrhea',
    info: 'Can cause burning urination, discharge, pelvic/testicular pain, or throat symptoms. Often silent.',
  },
  {
    name: 'Herpes',
    info: 'May cause painful sores, blisters, itching, burning, or flu-like symptoms.',
  },
  {
    name: 'Syphilis',
    info: 'Can start as a painless sore. Later stages may cause rash and serious complications if untreated.',
  },
  {
    name: 'HPV',
    info: 'Often has no symptoms. Some types may cause genital warts or abnormal screening results.',
  },
  {
    name: 'HIV',
    info: 'Early symptoms can feel flu-like. Testing is the only way to know your status.',
  },
];

const questions = [
  'Do you have any symptoms?',
  'Have you had unprotected sex recently?',
];

export default function HomeScreen() {
  const [screen, setScreen] = useState<Screen>('home');
  const [step, setStep] = useState(0);
  const [yesCount, setYesCount] = useState(0);
  const [zip, setZip] = useState('');
  const [zipResult, setZipResult] = useState('');
  const [testingZip, setTestingZip] = useState('');
  const [stateName, setStateName] = useState('');
  const [stateResult, setStateResult] = useState('');

  function goHome() {
    setScreen('home');
    setStep(0);
    setYesCount(0);
    setZip('');
    setZipResult('');
    setTestingZip('');
  }

  function handleAnswer(answer: 'yes' | 'no') {
    if (answer === 'yes') setYesCount((prev) => prev + 1);

    if (step < questions.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      setScreen('result');
    }
  }

  function checkZip() {
    if (zip.length !== 5) {
      setZipResult('Enter a valid 5-digit ZIP code.');
      return;
    }

    setZipResult(
      zip.startsWith('2')
        ? 'Higher Risk Area\n\nDemo ZIP guidance only. Real public STI data is usually county or state level, not exact ZIP level.'
        : 'Lower Risk Area\n\nDemo ZIP guidance only. Testing is still recommended after exposure, symptoms, or a new partner.'
    );
  }

  function checkStateData() {
    const clean = stateName.trim().toLowerCase();

    if (!clean) {
      setStateResult('Enter a state abbreviation, like MD.');
      return;
    }

    setStateResult(
      stiData[clean] ||
        `${stateName.toUpperCase()}

State structure ready.

Exact CDC numbers are not loaded for this state yet.`
    );
  }

  function openTesting() {
    if (testingZip.length !== 5) return;
    Linking.openURL(
      `https://www.google.com/maps/search/std+testing+near+${testingZip}`
    );
  }

  function openCDC() {
    Linking.openURL('https://www.cdc.gov/sti-statistics/');
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

        <Pressable style={styles.secondaryButton} onPress={goHome}>
          <Text style={styles.secondaryButtonText}>Back Home</Text>
        </Pressable>
      </View>
    );
  }

  if (screen === 'result') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Your Result</Text>

        <View style={styles.card}>
          <Text style={styles.result}>
            {yesCount >= 1 ? 'Testing Recommended' : 'Low Immediate Concern'}
          </Text>
          <Text style={styles.cardText}>
            This app is for education only. Testing is the only way to confirm
            your status.
          </Text>
        </View>

        <Pressable style={styles.button} onPress={() => setScreen('testing')}>
          <Text style={styles.buttonText}>Find Testing</Text>
        </Pressable>

        <Pressable style={styles.secondaryButton} onPress={goHome}>
          <Text style={styles.secondaryButtonText}>Back Home</Text>
        </Pressable>
      </View>
    );
  }

  if (screen === 'library') {
    return (
      <ScrollView style={styles.page} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Disease Library</Text>

        {diseases.map((item) => (
          <View key={item.name} style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardText}>{item.info}</Text>
          </View>
        ))}

        <Pressable style={styles.button} onPress={goHome}>
          <Text style={styles.buttonText}>Back Home</Text>
        </Pressable>
      </ScrollView>
    );
  }

  if (screen === 'zip') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>ZIP Risk</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter ZIP"
          placeholderTextColor="#94A3B8"
          value={zip}
          onChangeText={setZip}
          keyboardType="number-pad"
          maxLength={5}
        />

        <Pressable style={styles.button} onPress={checkZip}>
          <Text style={styles.buttonText}>Check Risk</Text>
        </Pressable>

        {zipResult !== '' && (
          <View style={styles.card}>
            <Text style={styles.cardText}>{zipResult}</Text>
          </View>
        )}

        <Pressable style={styles.secondaryButton} onPress={goHome}>
          <Text style={styles.secondaryButtonText}>Back Home</Text>
        </Pressable>
      </View>
    );
  }

  if (screen === 'testing') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Testing Locator</Text>

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

        <Pressable style={styles.secondaryButton} onPress={goHome}>
          <Text style={styles.secondaryButtonText}>Back Home</Text>
        </Pressable>
      </View>
    );
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

        <Pressable style={styles.secondaryButton} onPress={goHome}>
          <Text style={styles.secondaryButtonText}>Back Home</Text>
        </Pressable>
      </ScrollView>
    );
  }

  if (screen === 'info') {
    return (
      <ScrollView style={styles.page} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Important Info</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Not Medical Advice</Text>
          <Text style={styles.cardText}>
            This app is for educational purposes only. It does not diagnose,
            treat, or replace a medical professional.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Testing</Text>
          <Text style={styles.cardText}>
            The only way to know your STI status is through proper testing by a
            qualified provider.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Data</Text>
          <Text style={styles.cardText}>
            Public STI data is usually safest to show at state, county, or
            regional level.
          </Text>
        </View>

        <Pressable style={styles.button} onPress={goHome}>
          <Text style={styles.buttonText}>Back Home</Text>
        </Pressable>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.homeContent}>
      <Text style={styles.brand}>Know Your Risk</Text>
      <Text style={styles.heroTitle}>
        Private STI awareness and testing guidance.
      </Text>
      <Text style={styles.subtitle}>
        Learn symptoms, understand risk, and find testing options.
      </Text>

      <Pressable style={styles.homeCard} onPress={() => setScreen('symptom')}>
        <Text style={styles.cardTitle}>Symptom Check</Text>
        <Text style={styles.cardText}>Answer 2 quick questions.</Text>
      </Pressable>

      <Pressable style={styles.homeCard} onPress={() => setScreen('library')}>
        <Text style={styles.cardTitle}>Disease Library</Text>
        <Text style={styles.cardText}>Common STIs and symptoms.</Text>
      </Pressable>

      <Pressable style={styles.homeCard} onPress={() => setScreen('zip')}>
        <Text style={styles.cardTitle}>ZIP Risk</Text>
        <Text style={styles.cardText}>Basic ZIP guidance.</Text>
      </Pressable>

      <Pressable style={styles.homeCard} onPress={() => setScreen('testing')}>
        <Text style={styles.cardTitle}>Testing Locator</Text>
        <Text style={styles.cardText}>Open nearby testing locations.</Text>
      </Pressable>

      <Pressable style={styles.homeCard} onPress={() => setScreen('realData')}>
        <Text style={styles.cardTitle}>Real STI Data</Text>
        <Text style={styles.cardText}>State data with Maryland CDC numbers.</Text>
      </Pressable>

      <Pressable style={styles.homeCard} onPress={() => setScreen('info')}>
        <Text style={styles.cardTitle}>Important Info</Text>
        <Text style={styles.cardText}>Disclaimers and data notes.</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#07111F',
  },
  homeContent: {
    padding: 22,
    paddingTop: 70,
    paddingBottom: 50,
  },
  content: {
    padding: 22,
    paddingTop: 70,
    paddingBottom: 50,
  },
  container: {
    flex: 1,
    backgroundColor: '#07111F',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  brand: {
    color: '#38BDF8',
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 12,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
    lineHeight: 40,
    marginBottom: 12,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 24,
    textAlign: 'center',
  },
  subtitle: {
    color: '#CBD5E1',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 22,
  },
  question: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 20,
    textAlign: 'center',
  },
  homeCard: {
    backgroundColor: '#111C2E',
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#1E3A5F',
  },
  card: {
    backgroundColor: '#111C2E',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '900',
    marginBottom: 6,
  },
  cardText: {
    color: '#CBD5E1',
    lineHeight: 22,
    fontSize: 15,
  },
  button: {
    backgroundColor: '#38BDF8',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 14,
    marginTop: 12,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#06101E',
    fontSize: 16,
    fontWeight: '900',
  },
  secondaryButton: {
    backgroundColor: '#111C2E',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 14,
    marginTop: 12,
    width: '80%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
  result: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#111C2E',
    color: '#FFFFFF',
    padding: 14,
    width: '80%',
    borderRadius: 12,
    marginBottom: 12,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
});