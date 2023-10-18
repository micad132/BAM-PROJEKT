import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TamaguiProvider, Button } from 'tamagui';
import { useFonts } from 'expo-font';
import config from './tamagui.config';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
    <TamaguiProvider config={config}>
      <View style={styles.container}>
        <Button onLongPress={() => console.log('SIEMA')}>Hello world</Button>
        <Text>Open up App.tsx to start working on your app!</Text>
      </View>
    </TamaguiProvider>
  );
}
