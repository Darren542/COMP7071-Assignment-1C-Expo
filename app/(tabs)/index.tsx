import { Image, StyleSheet, Platform, Button } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const [ message, setMessage ] = useState('Loading...');
  const API_URL = Platform.select({
    ios: 'https://assignment1cbackend-fkcygyanhxejd8cm.canadacentral-01.azurewebsites.net/test',
    android: 'http://10.0.2.2:5138/test',
    web: 'http://localhost:5138/test',
    default: 'http://localhost:5138/test',
  });

  const fetchMessage = async () => {
    try {
      const response = await axios.get(API_URL);
      // console.error(response.data);
      setMessage(response.data);
    } catch (error) {
      console.error(error);
      setMessage('Error fetching data');
    }
  };

  // useEffect(() => {
  //   fetchMessage();
  // }, []);


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">This is a Demo of using React Native</ThemedText>
        <ThemedText>
          It involves a ASP.Net Core Web API for the backend and a React Native app for the frontend.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Message from the backend: {message}</ThemedText>
        <Button title="Fetch Message" onPress={fetchMessage} />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
