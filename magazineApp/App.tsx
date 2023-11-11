import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TamaguiProvider, Button, styled } from 'tamagui';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import config from './tamagui.config';
import { store } from './store';
import StackNavigatorComponent, { TabNavigatorComponent } from './router';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    color: 'red',
  },
});

// eslint-disable-next-line react/function-component-definition
export default function App() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });
  const [isLogged, setIsLogged] = useState<boolean>(false);

  useEffect(() => {
    if (loaded) {
      // can hide splash screen here
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const properContent = isLogged ? <TabNavigatorComponent /> : <StackNavigatorComponent />;

  return (
    <Provider store={store}>
      <TamaguiProvider config={config}>
        <NavigationContainer>
          <View style={styles.container}>
            {properContent}
          </View>
        </NavigationContainer>
      </TamaguiProvider>
    </Provider>

  );
}
