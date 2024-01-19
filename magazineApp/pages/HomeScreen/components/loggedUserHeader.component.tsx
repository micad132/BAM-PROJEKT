import React from 'react';
import { H6, styled } from 'tamagui';

type Props = {
    userName: string,
}

const StyledH6 = styled(H6, {
  color: '#fff',
  textAlign: 'center',
  paddingTop: 10,
});

const LoggedUserHeaderComponent = ({ userName }: Props) => (
  <StyledH6>
    You are logged in as: 
    {' '}
    {userName}
  </StyledH6>
);

export default LoggedUserHeaderComponent;
