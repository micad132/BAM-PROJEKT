import React, { useState } from 'react';
import {
  NativeSyntheticEvent, Text, TextInputChangeEventData, View,
} from 'react-native';
import { Button, Form, styled } from 'tamagui';
import InputComponent from '../../components/input.component';
import {
  INITIAL_REGISTER_DATA, RegisterData,
} from '../../models/AuthModels';

const SubmitButton = styled(Button, {
  name: 'SubmitButton',
  marginTop: 10,
});

const RegisterScreen = () => {
  const [registerData, setRegisterData] = useState<RegisterData>(INITIAL_REGISTER_DATA);

  const handleOnChange = (type: string) => (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setRegisterData((prevState) => ({
      ...prevState,
      [type]: e.nativeEvent.text,
    }));
  };

  const onSubmitHandle = () => {
    console.log(registerData);
  };
  return (
    <View>
      <Text>LoginScreen</Text>
      <Form onSubmit={onSubmitHandle}>
        <InputComponent placeholder="Type your e-mail here..." onChange={handleOnChange('email')} value={registerData.email} isPassword={false} inputId="Email" />
        <InputComponent placeholder="Type your password here..." onChange={handleOnChange('password')} value={registerData.password} isPassword inputId="Password" />
        <InputComponent placeholder="Confirm your password" onChange={handleOnChange('confirmPassword')} value={registerData.confirmPassword} isPassword inputId="Confirm Password" />
        <InputComponent placeholder="Type your city here..." onChange={handleOnChange('city')} value={registerData.city} isPassword inputId="City" />
        <InputComponent placeholder="Type your postalcode here" onChange={handleOnChange('postalCode')} value={registerData.postalCode} isPassword inputId="Postal code" />
        <Form.Trigger asChild>
          <SubmitButton>Register</SubmitButton>
        </Form.Trigger>
      </Form>
    </View>
  );
};

export default RegisterScreen;
