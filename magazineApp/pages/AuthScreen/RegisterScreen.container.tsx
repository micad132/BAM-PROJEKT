import React, { useState } from 'react';
import {
  NativeSyntheticEvent, Text, TextInputChangeEventData, View,
} from 'react-native';
import {
  Button, Form, H3, styled,
} from 'tamagui';
import InputComponent from '../../components/input.component';
import {
  INITIAL_REGISTER_DATA, RegisterData,
} from '../../models/AuthModels';
import AuthFormWrapperComponent from '../../components/authFormWrapper.component';

const SubmitButton = styled(Button, {
  name: 'SubmitButton',
  marginTop: 10,
});

const RegisterHeading = styled(H3, {
  color: '#fff',
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
    <AuthFormWrapperComponent>
      <RegisterHeading>Register</RegisterHeading>
      <Form onSubmit={onSubmitHandle}>
        <InputComponent
          placeholder="Type your e-mail here..."
          onChange={handleOnChange('email')}
          value={registerData.email}
          isPassword={false}
          inputId="RegisterEmail"
          label="Email"
        />
        <InputComponent
          placeholder="Type your password here..."
          onChange={handleOnChange('password')}
          value={registerData.password}
          isPassword
          inputId="RegisterPassword"
          label="Password"
        />
        <InputComponent
          placeholder="Confirm your password"
          onChange={handleOnChange('confirmPassword')}
          value={registerData.confirmPassword}
          isPassword
          inputId="RegisterConfirmPassword"
          label="Confirm Password"
        />
        <InputComponent
          placeholder="Type your city here..."
          onChange={handleOnChange('city')}
          value={registerData.city}
          isPassword
          inputId="RegisterCity"
          label="City"
        />
        <InputComponent
          placeholder="Type your postalcode here"
          onChange={handleOnChange('postalCode')}
          value={registerData.postalCode}
          isPassword
          inputId="RegisterPostalCode"
          label="Postal Code"
        />
        <Form.Trigger asChild>
          <SubmitButton>REGISTER</SubmitButton>
        </Form.Trigger>
      </Form>
    </AuthFormWrapperComponent>
  );
};

export default RegisterScreen;
