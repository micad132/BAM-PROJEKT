import React, { useState } from 'react';
import {
  NativeSyntheticEvent, Text, TextInputChangeEventData, View, ToastAndroid, Alert,
} from 'react-native';
import {
  Button, Form, H3, styled,
} from 'tamagui';
import InputComponent from '../../components/input.component';
import {
  INITIAL_REGISTER_DATA, INITIAL_REGISTER_ERROR_DATA, RegisterData, RegisterError,
} from '../../models/AuthModels';
import AuthFormWrapperComponent from '../../components/authFormWrapper.component';
import { AuthService } from '../../services/AuthService';
import {
  checkPasswords, ifContainsIllegalChar, ifStringIsInvalid, sanitizeData,
} from '../../services/ValidationService';

const SubmitButton = styled(Button, {
  name: 'SubmitButton',
  marginTop: 10,
});

const RegisterHeading = styled(H3, {
  color: '#fff',
});

const RegisterScreen = ({ navigation }: any) => {
  const [registerData, setRegisterData] = useState<RegisterData>(INITIAL_REGISTER_DATA);
  const [registerErrors, setRegisterErrors] = useState<RegisterError>(INITIAL_REGISTER_ERROR_DATA);

  const handleOnChange = (type: string) => (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    e.persist();
    setRegisterData((prevState) => ({
      ...prevState,
      [type]: sanitizeData(e.nativeEvent.text),
    }));
  };

  const onSubmitHandle = async () => {
    setRegisterErrors(INITIAL_REGISTER_ERROR_DATA);
    const postalCodeRegex = /^[0-9]{2}-[0-9]{3}$/;
    const {
      username, password, confirmPassword, postalCode, city,
    } = registerData;
    const errorData: RegisterError = { ...INITIAL_REGISTER_ERROR_DATA };

    let isError = false;
    if (ifStringIsInvalid(username)) {
      isError = true;
      errorData.usernameError = 'Invalid username!';
    }
    if (ifStringIsInvalid(password)) {
      isError = true;
      errorData.passwordError = 'Invalid password!';
    }
    if (ifStringIsInvalid(confirmPassword)) {
      isError = true;
      errorData.confirmPasswordError = 'Invalid confirm password!';
    }
    if (ifStringIsInvalid(city)) {
      isError = true;
      errorData.cityError = 'Invalid city!';
    }
    if (ifStringIsInvalid(postalCode) || !postalCodeRegex.test(postalCode)) {
      isError = true;
      errorData.postalCodeError = 'Invalid postal code!';
    }

    if (!checkPasswords(password, confirmPassword)) {
      isError = true;
      errorData.passwordError = 'Passwords are not the same!';
      errorData.confirmPasswordError = 'Passwords are not the same!';
    }

    if (isError) {
      setRegisterErrors(errorData);
      ToastAndroid.show('Invalid data!', ToastAndroid.SHORT);
      return;
    }
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
          errorText={registerErrors.usernameError}
        />
        <InputComponent
          placeholder="Type your password here..."
          onChange={handleOnChange('password')}
          value={registerData.password}
          isPassword
          inputId="RegisterPassword"
          label="Password"
          isBlackText={false}
          errorText={registerErrors.passwordError}
        />
        <InputComponent
          placeholder="Confirm your password"
          onChange={handleOnChange('confirmPassword')}
          value={registerData.confirmPassword}
          isPassword
          inputId="RegisterConfirmPassword"
          label="Confirm Password"
          isBlackText={false}
          errorText={registerErrors.confirmPasswordError}
        />
        <InputComponent
          placeholder="Type your city here..."
          onChange={handleOnChange('city')}
          value={registerData.city}
          isPassword
          inputId="RegisterCity"
          label="City"
          isBlackText={false}
          errorText={registerErrors.cityError}
        />
        <InputComponent
          placeholder="Type your postalcode here"
          onChange={handleOnChange('postalCode')}
          value={registerData.postalCode}
          isPassword
          inputId="RegisterPostalCode"
          label="Postal Code"
          isBlackText={false}
          errorText={registerErrors.postalCodeError}
        />
        <Form.Trigger asChild>
          <SubmitButton>REGISTER</SubmitButton>
        </Form.Trigger>
      </Form>
    </AuthFormWrapperComponent>
  );
};

export default RegisterScreen;
