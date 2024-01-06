import React from 'react';
import { View } from 'react-native';
import { H6, styled } from 'tamagui';
import { StorageModel } from '../../../models/StorageModel';

const StyledH6 = styled(H6, {
  color: '#fff',
  textAlign: 'center',
  marginTop: 10,
});

interface Props {
    storagesList: StorageModel[]
}

const StoragesListComponent = ({ storagesList }: Props) => (
  <View>
    <StyledH6>
      W bazie znajduje się
      {storagesList.length}
      {' '}
      magazynów
    </StyledH6>
    {storagesList}
  </View>
);

export default StoragesListComponent;
