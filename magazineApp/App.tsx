import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TamaguiProvider, Button } from 'tamagui';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import config from './tamagui.config';
import LoginScreen from './pages/AuthScreen/LoginScreen.container';
import RegisterScreen from './pages/AuthScreen/RegisterScreen.container';
import { store, useAppDispatch, useAppSelector } from './store';
import { fetchingTestThunk, getIsLoaded, getTestData } from './store/reducers/testReducer';
import SpinnerComponent from './components/spinner.component';
import LayoutContainer from './layout/Layout.container';

// eslint-disable-next-line react/function-component-definition
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
    <Provider store={store}>
      <NavigationContainer>
        <TamaguiProvider config={config}>
          <LayoutContainer />
        </TamaguiProvider>
      </NavigationContainer>
    </Provider>

  );
}
