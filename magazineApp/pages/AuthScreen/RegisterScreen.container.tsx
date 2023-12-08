import React, { useState } from 'react';
import {
  NativeSyntheticEvent, Text, TextInputChangeEventData, View, ToastAndroid,
} from 'react-native';
import {
  Button, Form, H3, styled,
} from 'tamagui';
import InputComponent from '../../components/input.component';
import {
  INITIAL_REGISTER_DATA, RegisterData,
} from '../../models/AuthModels';
import AuthFormWrapperComponent from '../../components/authFormWrapper.component';
import { AuthService } from '../../services/AuthService';

const SubmitButton = styled(Button, {
  name: 'SubmitButton',
  marginTop: 10,
});

const RegisterHeading = styled(H3, {
  color: '#fff',
});

const RegisterScreen = ({ navigation }: any) => {
  const [registerData, setRegisterData] = useState<RegisterData>(INITIAL_REGISTER_DATA);

  const handleOnChange = (type: string) => (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setRegisterData((prevState) => ({
      ...prevState,
      [type]: e.nativeEvent.text,
    }));
  };

  const onSubmitHandle = async () => {
    console.log(registerData);
    try {
      const dataToSend = {
        username: registerData.username,
        password: registerData.password,
        city: registerData.city,
        postalCode: registerData.postalCode,
      };
      const data = await AuthService.registerUser(dataToSend);
      ToastAndroid.show('Pomyślnie zarejestrowano użytkownika!', ToastAndroid.SHORT);
      setTimeout(() => navigation.navigate('Login'), 2000);
    } catch (e: any) {
      console.log(e);
      ToastAndroid.show(`${e.message}`, ToastAndroid.SHORT);
    }
  };
  return (
    <AuthFormWrapperComponent>
      <RegisterHeading>Register</RegisterHeading>
      <Form onSubmit={onSubmitHandle}>
        <InputComponent
          placeholder="Type your username here..."
          onChange={handleOnChange('username')}
          value={registerData.username}
          isPassword={false}
          inputId="RegisterUsername"
          label="Username"
          isBlackText={false}
        />
        <InputComponent
          placeholder="Type your password here..."
          onChange={handleOnChange('password')}
          value={registerData.password}
          isPassword
          inputId="RegisterPassword"
          label="Password"
          isBlackText={false}
        />
        <InputComponent
          placeholder="Confirm your password"
          onChange={handleOnChange('confirmPassword')}
          value={registerData.confirmPassword}
          isPassword
          inputId="RegisterConfirmPassword"
          label="Confirm Password"
          isBlackText={false}
        />
        <InputComponent
          placeholder="Type your city here..."
          onChange={handleOnChange('city')}
          value={registerData.city}
          isPassword
          inputId="RegisterCity"
          label="City"
          isBlackText={false}
        />
        <InputComponent
          placeholder="Type your postalcode here"
          onChange={handleOnChange('postalCode')}
          value={registerData.postalCode}
          isPassword
          inputId="RegisterPostalCode"
          label="Postal Code"
          isBlackText={false}
        />
        <Form.Trigger asChild>
          <SubmitButton>REGISTER</SubmitButton>
        </Form.Trigger>
      </Form>
    </AuthFormWrapperComponent>
  );
};

export default RegisterScreen;
