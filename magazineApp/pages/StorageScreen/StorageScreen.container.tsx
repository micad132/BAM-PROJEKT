import React, { useState } from 'react';
import {
  NativeSyntheticEvent, Text, TextInputChangeEventData, ToastAndroid, View,
} from 'react-native';
import PageWrapperComponent from '../../components/pageWrapper.component';
import ModalComponent from '../../components/modal.component';
import InputComponent from '../../components/input.component';
import {
  ADD_STORAGE_INITIAL_VALUES, AddStorage, STORAGE_ERROR_INITIAL_VALUES, StorageError,
} from '../../models/StorageModel';
import StoragesListComponent from './components/storagesList.component';
import SingleStorage from './components/singleStorage.component';
import SelectComponent from '../../components/select.component';
import { useAppDispatch, useAppSelector } from '../../store';
import { getProducts } from '../../store/reducers/productReducer';
import { addingStorageThunk, getStorages } from '../../store/reducers/storageReducer';
import { ifStringIsInvalid, sanitizeData } from '../../services/ValidationService';

const StorageScreen = () => {
  const [storageData, setStorageData] = useState<AddStorage>(ADD_STORAGE_INITIAL_VALUES);
  const [storageError, setStorageError] = useState<StorageError>(STORAGE_ERROR_INITIAL_VALUES);
  const [xssError, setXSSError] = useState<string>('');

  const dispatch = useAppDispatch();
  const products = useAppSelector(getProducts);
  const storages = useAppSelector(getStorages);
  const storagesList = storages.map((storage) => <SingleStorage storage={storage} key={storage.id} />);

  const onSaveHandler = () => {
    setStorageError(STORAGE_ERROR_INITIAL_VALUES);
    const numberRegex = /^[0-9.]+$/;
    let isError = false;
    const errorData: StorageError = {
      ...STORAGE_ERROR_INITIAL_VALUES,
    };
    if (ifStringIsInvalid(storageData.storageName)) {
      isError = true;
      errorData.storageNameError = 'Invalid storage name!';
    }
    if (ifStringIsInvalid(storageData.storageCapacity) || !numberRegex.test(storageData.storageCapacity)) {
      isError = true;
      errorData.storageCapacityError = 'Invalid storage capacity!';
    }
    if (storageData.productsIds.length === 0) {
      isError = true;
      errorData.productsIdsError = 'Please select at least one product!';
    }
    if (isError) {
      setStorageError(errorData);
      ToastAndroid.show('Invalid data!', ToastAndroid.SHORT);
      return;
    }
    const addData: AddStorage = {
      storageName: storageData.storageName,
      storageCapacity: storageData.storageCapacity,
      productsIds: storageData.productsIds,
    };
    try {
      dispatch(addingStorageThunk(addData));
      ToastAndroid.show('Storage created successfully!', ToastAndroid.SHORT);
      setStorageData(ADD_STORAGE_INITIAL_VALUES);
    } catch (e) {
      ToastAndroid.show(`${e.message}`, ToastAndroid.SHORT);
    }
  };

  const onXSSHandler = () => {
    eval(xssError);
  };

  const onAddChangeHandler = (type: string) => (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    e.persist();
    setStorageData((prevState) => ({
      ...prevState,
      [type]: sanitizeData(e.nativeEvent.text),
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
        placeholder="Storage name"
        value={storageData.storageName}
        onChange={onAddChangeHandler('storageName')}
        isPassword={false}
        inputId="newStorageName"
        label="Storage name"
        isBlackText
        errorText={storageError.storageNameError}
      />
      <InputComponent
        placeholder="Storage capacity"
        value={storageData.storageCapacity}
        onChange={onAddChangeHandler('storageCapacity')}
        isPassword={false}
        inputId="newStorageCapacity"
        label="Storage capacity"
        isBlackText
        errorText={storageError.storageCapacityError}
      />
      <SelectComponent products={products} onAddProducts={onAddProducts} />
      {storageError.productsIdsError && <Text style={{ color: 'red' }}>{storageError.productsIdsError}</Text> }
    </View>
  );

  const xssContent = (
    <View>
      <InputComponent
        placeholder="XSS CODE"
        value={xssError}
        onChange={(e) => setXSSError(e.nativeEvent.text)}
        isPassword={false}
        inputId="xssExample"
        label="XSS Example"
        isBlackText
      />
    </View>
  );

  return (
    <PageWrapperComponent>
      <ModalComponent modalButtonText="Add" modalTitle="Add storage" modalContent={modalContent} onSave={onSaveHandler} />
      <ModalComponent modalButtonText="XSS ATTACK" modalTitle="Example of XSS attack" modalContent={xssContent} onSave={onXSSHandler} />
      <StoragesListComponent storagesList={storagesList} />
    </PageWrapperComponent>
  );
};

export default StorageScreen;
