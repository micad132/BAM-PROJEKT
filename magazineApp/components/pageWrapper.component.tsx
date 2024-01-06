import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { ScrollView, styled } from 'tamagui';

const PageWraper = styled(ScrollView, {
  backgroundColor: '#111',
  height: '100%',
  paddingTop: 10,
  paddingBottom: 10,
});

type Props = {
    children: ReactNode,
}

const PageWrapperComponent = ({ children }: Props) => <PageWraper>{children}</PageWraper>;

export default PageWrapperComponent;
