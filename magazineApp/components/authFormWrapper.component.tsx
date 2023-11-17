import React, { ReactNode } from 'react';
import { styled } from 'tamagui';
import { View } from 'react-native';

const Wrapper = styled(View, {
  flex: 1,
  backgroundColor: '#111',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 10,
});

type Props = {
    children: ReactNode,
}
const AuthFormWrapperComponent = ({ children }: Props) => (
  <Wrapper>{children}</Wrapper>
);

export default AuthFormWrapperComponent;
