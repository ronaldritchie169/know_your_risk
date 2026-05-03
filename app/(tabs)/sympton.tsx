import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <Text style={styles.logo}>Know Your Risk</Text>
      <Text style={styles.headline}>Private STD awareness and testing guidance.</Text>
      <Text style={styles.subtext}>
        Learn symptoms, understand local risk, and find testing options near you.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Start Here</Text>
        <Text style={styles.cardText}>Check symptoms and get safe next-step guidance.</Text>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Start Symptom Check</Text>
        </Pressable>
      </View>

      <View style={styles.grid}>
        <View style={styles.smallCard}>
          <Text style={styles.smallTitle}>Disease Library</Text>
          <Text style={styles.smallText}>Signs, symptoms, and prevention.</Text>
        </View>

        <View style={styles.smallCard}>
          <Text style={styles.smallTitle}>Local Risk</Text>
          <Text style={styles.smallText}>Search risk by ZIP code.</Text>
        </View>

        <View style={styles.smallCard}>
          <Text style={styles.smallTitle}>Testing</Text>
          <Text style={styles.smallText}>Find nearby testing options.</Text>
        </View>

        <View style={styles.smallCard}>
          <Text style={styles.smallTitle}>Education</Text>
          <Text style={styles.smallText}>Clear answers without shame.</Text>
        </View>
      </View>

      <Text style={styles.disclaimer}>
        This app is for education only and does not provide medical diagnosis.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#08111F',
  },
  content: {
    padding: 24,
    paddingTop: 70,
  },
  logo: {
    color: '#38BDF8',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 16,
  },
  headline: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '800',
    lineHeight: 40,
    marginBottom: 14,
  },
  subtext: {
    color: '#CBD5E1',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 28,
  },
  card: {
    backgroundColor: '#111C2E',
    borderRadius: 24,
    padding: 22,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: '#1E3A5F',
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 8,
  },
  cardText: {
    color: '#CBD5E1',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 18,
  },
  button: {
    backgroundColor: '#38BDF8',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#06101E',
    fontSize: 16,
    fontWeight: '800',
  },
  grid: {
    gap: 14,
  },
  smallCard: {
    backgroundColor: '#0F172A',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  smallTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 6,
  },
  smallText: {
    color: '#94A3B8',
    fontSize: 14,
    lineHeight: 20,
  },
  disclaimer: {
    color: '#64748B',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 24,
    marginBottom: 30,
  },
})