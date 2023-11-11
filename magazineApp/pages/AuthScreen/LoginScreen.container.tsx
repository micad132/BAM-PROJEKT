import React, { useState } from 'react';
import {
  NativeSyntheticEvent, Text, TextInputChangeEventData, View,
} from 'react-native';
import {
  Button, Form, styled, Label,
} from 'tamagui';
import { StackActions, CommonActions } from '@react-navigation/native';
import InputComponent from '../../components/input.component';
import { INITIAL_LOGIN_DATA, LoginData } from '../../models/AuthModels';

const LoginWrapper = styled(View, {
  flex: 1,
  backgroundColor: '#111',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 10,
});

const SubmitButton = styled(Button, {
  name: 'SubmitButton',
  marginTop: 10,
});

const LoginScreen = ({ navigation }: any) => {
  const [loginData, setLoginData] = useState<LoginData>(INITIAL_LOGIN_DATA);

  const handleOnChange = (type: string) => (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setLoginData((prevState) => ({
      ...prevState,
      [type]: e.nativeEvent.text,
    }));
  };

  const onSubmitHandle = () => {
    console.log(loginData);
    navigation.dispatch(StackActions.replace('HomeNavigation'));
  };

  return (
    <LoginWrapper>
      <Text>LoginScreen</Text>
      <Form onSubmit={onSubmitHandle}>
        <InputComponent placeholder="Type your e-mail here..." onChange={handleOnChange('email')} value={loginData.email} isPassword={false} inputId="LoginEmail" />
        <InputComponent placeholder="Type your password here..." onChange={handleOnChange('password')} value={loginData.password} isPassword inputId="LoginPassword" />
        <InputComponent placeholder="Confirm your password" onChange={handleOnChange('confirmPassword')} value={loginData.confirmPassword} isPassword inputId="LoginConfirmPassword" />
        <Form.Trigger asChild>
          <SubmitButton>Login</SubmitButton>
        </Form.Trigger>
      </Form>
      <Button onPress={() => navigation.navigate('Register')}>Register</Button>
    </LoginWrapper>
  );
};

export default LoginScreen;
