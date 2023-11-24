import React from 'react';
import { Text, View } from 'react-native';
import { Button, styled } from 'tamagui';
import { StackActions } from '@react-navigation/native';
import PageWrapperComponent from '../../components/pageWrapper.component';
import LoggedUserHeaderComponent from './components/loggedUserHeader.component';

const LogoutButton = styled(Button, {
  backgroundColor: '#fff',
  width: '40%',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: 20,
});

const HomePage = ({ navigation }: any) => {
  const handleLogout = () => navigation.dispatch(StackActions.replace('Login'));
  return (
    <PageWrapperComponent>
      <LogoutButton onPress={handleLogout}>Wyloguj się</LogoutButton>
      <LoggedUserHeaderComponent userName="mikad132" />
    </PageWrapperComponent>
  );
};

export default HomePage;
