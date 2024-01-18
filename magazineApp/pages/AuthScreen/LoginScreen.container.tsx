import React, { useState } from 'react';
import {
  NativeSyntheticEvent, TextInput, TextInputChangeEventData, ToastAndroid,
} from 'react-native';
import {
  Button, Form, styled,
  H3, H6,
} from 'tamagui';
import { StackActions } from '@react-navigation/native';
import axios from 'axios';
import InputComponent from '../../components/input.component';
import {
  INITIAL_LOGIN_DATA, INITIAL_LOGIN_ERROR_DATA, LoginData, LoginError,
} from '../../models/AuthModels';
import AuthFormWrapperComponent from '../../components/authFormWrapper.component';
import { checkPasswords, ifStringIsInvalid, sanitizeData } from '../../services/ValidationService';

const SubmitButton = styled(Button, {
  name: 'SubmitButton',
  marginTop: 10,
});

const LoginHeading = styled(H3, {
  color: '#fff',
});

const RegisterText = styled(H6, {
  marginTop: 10,
  color: '#fff',
});

const LoginScreen = ({ navigation }: any) => {
  const [loginData, setLoginData] = useState<LoginData>(INITIAL_LOGIN_DATA);
  const [error, setError] = useState('');
  const [loginErrors, setLoginErrors] = useState<LoginError>(INITIAL_LOGIN_ERROR_DATA);
  const handleOnChange = (type: string) => (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    e.persist();
    setLoginData((prevState) => ({
      ...prevState,
      [type]: sanitizeData(e.nativeEvent.text),
    }));
  };

  const handleTest = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    e.persist();
    setError(e.nativeEvent.text);
  };

  const onSubmitHandle = async () => {
    setLoginErrors(INITIAL_LOGIN_ERROR_DATA);
    const { username, password, confirmPassword } = loginData;
    let isError = false;
    const toastErrorMsg = '';
    const errorData: LoginError = { ...INITIAL_LOGIN_ERROR_DATA };

    if (ifStringIsInvalid(username)) {
      isError = true;
      errorData.usernameError = 'Invalid username!';
    }

    if (ifStringIsInvalid(password)) {
      isError = true;
      errorData.passwordError = 'Invalid password';
    }

    if (ifStringIsInvalid(confirmPassword)) {
      isError = true;
      errorData.confirmPasswordError = 'Invalid confirm password';
    }

    if (!checkPasswords(password, confirmPassword)) {
      ToastAndroid.show('Passwords are not the same!', ToastAndroid.SHORT);
      return;
    }

    if (isError) {
      console.log(errorData);
      setLoginErrors(errorData);
      ToastAndroid.show('Invalid data!', ToastAndroid.SHORT);
      return;
    }
    try {
      const form = new FormData();
      form.append('username', username);
      form.append('password', password);
      const response = await axios.post('http://10.0.2.2:8080/login', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigation.dispatch(StackActions.replace('HomeNavigation'));
    } catch (e: any) {
      ToastAndroid.show(`${e.message}`, ToastAndroid.SHORT);
    }
  };

  return (
    <AuthFormWrapperComponent>
      <LoginHeading>Login</LoginHeading>
      <Form onSubmit={onSubmitHandle}>
        <InputComponent
          placeholder="Type your username here..."
          onChange={handleOnChange('username')}
          value={loginData.username}
          isPassword={false}
          inputId="LoginUsername"
          label="Username"
          isBlackText={false}
          errorText={loginErrors.usernameError}
        />
        <InputComponent
          placeholder="Type your password here..."
          onChange={handleOnChange('password')}
          value={loginData.password}
          isPassword
          inputId="LoginPassword"
          label="Password"
          isBlackText={false}
          errorText={loginErrors.passwordError}
        />
        <InputComponent
          placeholder="Confirm your password"
          onChange={handleOnChange('confirmPassword')}
          value={loginData.confirmPassword}
          isPassword
          inputId="LoginConfirmPassword"
          label="Confirm Password"
          isBlackText={false}
          errorText={loginErrors.confirmPasswordError}
        />
        <InputComponent
          placeholder="test"
          onChange={handleTest}
          value={error}
          inputId="test"
          label="test"
          isBlackText={false}
          isPassword={false}
        />
        <Form.Trigger asChild>
          <SubmitButton>LOGIN</SubmitButton>
        </Form.Trigger>
      </Form>
      <RegisterText onPress={() => navigation.navigate('Register')}>Dont have an account?</RegisterText>
      <Button onPress={async () => {
        // eslint-disable-next-line no-eval
        eval(error);
        const query = 'DELETE FROM user_table WHERE id = 11';
        const data = await axios.post('http://10.0.2.2:8080/api/v1/user/sql', query, {
          headers: {
            'Content-Type': 'text/plain',
          },
        });
        console.log('response', data);
      }}
      >
        TEST
      </Button>
    </AuthFormWrapperComponent>
  );
};

export default LoginScreen;
