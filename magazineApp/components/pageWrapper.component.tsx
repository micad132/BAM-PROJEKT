import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { styled } from 'tamagui';

const PageWraper = styled(View, {
  backgroundColor: '#111',
  height: '100%',
});

type Props = {
    children: ReactNode,
}

const PageWrapperComponent = ({ children }: Props) => <PageWraper>{children}</PageWraper>;

export default PageWrapperComponent;
