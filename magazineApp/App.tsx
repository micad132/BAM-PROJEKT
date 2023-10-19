import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TamaguiProvider, Button } from 'tamagui';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import config from './tamagui.config';
import LoginScreen from './pages/AuthScreen/LoginScreen.container';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});

export default function App() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  useEffect(() => {
    if (loaded) {
      // can hide splash screen here
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <TamaguiProvider config={config}>
        <View style={styles.container}>
          <Button onLongPress={() => console.log('SIEMA')}>Hello world</Button>
          <Text>Open up App.tsx to start working on your app!</Text>
          <LoginScreen />
        </View>
      </TamaguiProvider>
    </NavigationContainer>
  );
}
