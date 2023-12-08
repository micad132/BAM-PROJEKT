import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Button, styled } from 'tamagui';
import { StackActions } from '@react-navigation/native';
import axios from 'axios';
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
  const [loggedUser, setLoggedUser] = useState<any>({});

  useEffect(() => {
    const fetchLoggedUser = async () => {
      try {
        const data = await axios.get('http://10.0.2.2:8080/api/v1/user/logged');
        setLoggedUser(data.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchLoggedUser();
  }, []);

  const handleLogout = () => navigation.dispatch(StackActions.replace('Login'));
  return (
    <PageWrapperComponent>
      <LogoutButton onPress={handleLogout}>Wyloguj się</LogoutButton>
      <LoggedUserHeaderComponent userName={loggedUser.username} />
    </PageWrapperComponent>
  );
};

export default HomePage;
