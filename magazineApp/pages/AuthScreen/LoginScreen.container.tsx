import React, { useState } from 'react';
import {
  NativeSyntheticEvent, Text, TextInputChangeEventData, View,
} from 'react-native';
import {
  Button, Form, styled, Label,
} from 'tamagui';
import InputComponent from '../../components/input.component';
import { INITIAL_LOGIN_DATA, LoginData } from '../../models/AuthModels';

const SubmitButton = styled(Button, {
  name: 'SubmitButton',
  marginTop: 10,
});

const LoginScreen = () => {
  const [loginData, setLoginData] = useState<LoginData>(INITIAL_LOGIN_DATA);

  const handleOnChange = (type: string) => (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setLoginData((prevState) => ({
      ...prevState,
      [type]: e.nativeEvent.text,
    }));
  };

  const onSubmitHandle = () => {
    console.log(loginData);
  };

  return (
    <View>
      <Text>LoginScreen</Text>
      <Form onSubmit={onSubmitHandle}>
        <InputComponent placeholder="Type your e-mail here..." onChange={handleOnChange('email')} value={loginData.email} isPassword={false} inputId="Email" />
        <InputComponent placeholder="Type your password here..." onChange={handleOnChange('password')} value={loginData.password} isPassword inputId="Password" />
        <InputComponent placeholder="Confirm your password" onChange={handleOnChange('confirmPassword')} value={loginData.confirmPassword} isPassword inputId="Confirm Password" />
        <Form.Trigger asChild>
          <SubmitButton>Login</SubmitButton>
        </Form.Trigger>
      </Form>
    </View>
  );
};

export default LoginScreen;
