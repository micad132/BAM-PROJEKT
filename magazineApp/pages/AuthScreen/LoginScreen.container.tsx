import React from 'react';
import { Text, View } from 'react-native';
import {
  Button, Form, Input, styled,
} from 'tamagui';

const InputText = styled(Input, {
  name: 'InputText',
  width: 300,
  borderColor: '#000',
});

const LoginScreen = () => (
  <View>
    <Text>LoginScreen</Text>
    <Form onSubmit={() => {}}>
      <InputText size="$4" borderWidth={1} placeholder="Type your e-mail here..." />
      <InputText size="$4" borderWidth={1} placeholder="Type your password here..." />
      <InputText size="$4" borderWidth={1} placeholder="Confirm your password" />
      <Form.Trigger asChild>
        <Button>Login</Button>
      </Form.Trigger>
    </Form>
  </View>
);

export default LoginScreen;
