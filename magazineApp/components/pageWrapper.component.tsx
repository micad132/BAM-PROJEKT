import React, { ReactNode } from 'react';
import { styled, YStack } from 'tamagui';
import {

  ScrollView,

} from 'react-native';

const PageWraper = styled(ScrollView, {
  backgroundColor: '#111',
  minHeight: '100%',
  paddingTop: 10,
  flex: 1,
});

type Props = {
    children: ReactNode,
}

const PageWrapperComponent = ({ children }: Props) => (
  <PageWraper>
    {children}
  </PageWraper>
);

export default PageWrapperComponent;
