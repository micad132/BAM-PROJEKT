import React, { useState } from 'react';
import {
  NativeSyntheticEvent, Text, TextInputChangeEventData, ToastAndroid, View, StyleSheet,
} from 'react-native';
import { ScrollView } from 'tamagui';
import PageWrapperComponent from '../../components/pageWrapper.component';
import ModalComponent from '../../components/modal.component';
import InputComponent from '../../components/input.component';
import { ADD_STORAGE_INITIAL_VALUES, AddStorage, StorageModel } from '../../models/StorageModel';
import StoragesListComponent from './components/storagesList.component';
import SingleStorage from './components/singleStorage.component';
import SelectComponent from '../../components/select.component';
import { useAppDispatch, useAppSelector } from '../../store';
import { getProducts } from '../../store/reducers/productReducer';
import { addingStorageThunk, getStorages } from '../../store/reducers/storageReducer';

const StorageScreen = () => {
  const [storageData, setStorageData] = useState<AddStorage>(ADD_STORAGE_INITIAL_VALUES);

  const dispatch = useAppDispatch();
  const products = useAppSelector(getProducts);
  const storages = useAppSelector(getStorages);
  const storagesList = storages.map((storage) => <SingleStorage storage={storage} key={storage.id} />);

  const onSaveHandler = () => {
    const addData: AddStorage = {
      storageName: storageData.storageName,
      storageCapacity: storageData.storageCapacity,
      productsIds: storageData.productsIds,
    };
    dispatch(addingStorageThunk(addData));
    ToastAndroid.show('Magazyn pomyslnie dodany!', ToastAndroid.SHORT);
    setStorageData(ADD_STORAGE_INITIAL_VALUES);
  };

  const onAddChangeHandler = (type: string) => (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    e.persist();
    setStorageData((prevState) => ({
      ...prevState,
      [type]: e.nativeEvent.text,
    }));
  };

  const onAddProducts = (selectedProducts: any) => {
    setStorageData((prevState) => ({
      ...prevState,
      productsIds: selectedProducts,
    }));
  };

  const modalContent = (
    <View>
      <InputComponent
        placeholder="Nazwa magazynu"
        value={storageData.storageName}
        onChange={onAddChangeHandler('storageName')}
        isPassword={false}
        inputId="newStorageName"
        label="Nazwa magazynu"
        isBlackText
      />
      <InputComponent
        placeholder="Pojemnosc magazynu"
        value={storageData.storageCapacity}
        onChange={onAddChangeHandler('storageCapacity')}
        isPassword={false}
        inputId="newStorageCapacity"
        label="Pojemnosc magazynu"
        isBlackText
      />
      <SelectComponent products={products} onAddProducts={onAddProducts} />
    </View>
  );

  return (
    <PageWrapperComponent>
      <ModalComponent modalButtonText="Dodaj" modalTitle="Dodaj magazyn" modalContent={modalContent} onSave={onSaveHandler} />
      <StoragesListComponent storagesList={storagesList} />
    </PageWrapperComponent>
  );

  // return (
  //   <ScrollView>
  //     <ModalComponent modalButtonText="Dodaj" modalTitle="Dodaj magazyn" modalContent={modalContent} onSave={onSaveHandler} />
  //     <StoragesListComponent storagesList={storagesList} />
  //     <StoragesListComponent storagesList={storagesList} />
  //   </ScrollView>
  // );
};

export default StorageScreen;
