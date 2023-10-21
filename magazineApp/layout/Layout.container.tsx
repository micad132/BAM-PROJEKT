import { Button } from 'tamagui';
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import RegisterScreen from '../pages/AuthScreen/RegisterScreen.container';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchingTestThunk, getIsLoaded, getTestData } from '../store/reducers/testReducer';
import SpinnerComponent from '../components/spinner.component';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});

const LayoutContainer = () => {
  const dispatch = useAppDispatch();
  const testData = useAppSelector(getTestData);
  const isLoaded = useAppSelector(getIsLoaded);

  useEffect(() => {
    dispatch(fetchingTestThunk());
  }, [dispatch]);

  console.log('DJD');
  return (
    <View style={styles.container}>
      <Button onLongPress={() => console.log('SIEMA')}>Hello world</Button>
      <Text>Open up App.tsx to start working on your app!</Text>
      {/* <LoginScreen /> */}
      <RegisterScreen />
      <Text>{isLoaded ? testData.name : <SpinnerComponent />}</Text>
    </View>
  );
};

export default LayoutContainer;
