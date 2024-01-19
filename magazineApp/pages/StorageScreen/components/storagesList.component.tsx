import React from 'react';
import { View, ScrollView } from 'react-native';
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
  <ScrollView>
    <StyledH6>
      Currently, there are
      {storagesList.length}
      {' '}
      storages in database.
    </StyledH6>
    {storagesList}
  </ScrollView>
);

export default StoragesListComponent;
