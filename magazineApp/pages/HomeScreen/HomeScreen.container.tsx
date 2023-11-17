import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'tamagui';
import { StackActions } from '@react-navigation/native';

const HomePage = ({ navigation }: any) => (
  <View>
    <Text>HOME</Text>
    <Button onPress={() => navigation.dispatch(StackActions.replace('Login'))}>Wyloguj się</Button>
  </View>
);

export default HomePage;
