import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ToastAndroid, NativeSyntheticEvent, TextInputChangeEventData,
} from 'react-native';
import { Button, ScrollView } from 'tamagui';
import {
  EDIT_STORAGE_INITIAL_VALUES,
  EditStorage,
  STORAGE_ERROR_INITIAL_VALUES, StorageError,
  StorageModel,
} from '../../../models/StorageModel';
import { useAppDispatch, useAppSelector } from '../../../store';
import { getProducts } from '../../../store/reducers/productReducer';
import { deletingStorageThunk, editingStorageThunk } from '../../../store/reducers/storageReducer';
import InputComponent from '../../../components/input.component';
import SelectComponent from '../../../components/select.component';
import ModalComponent from '../../../components/modal.component';
import { ifStringIsInvalid } from '../../../services/ValidationService';

const styles = StyleSheet.create({
  storageWrapper: {
    marginTop: 10,
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderColor: '#fff',
    borderWidth: 2,
    infoWrapper: {
      flex: 1,
      flexDirection: 'row',
      paddingTop: 10,
      paddingBottom: 10,
      alignItems: 'center',
      justifyContent: 'center',
      text: {
        color: 'white',
      },
      info: {
        width: '50%',
        justifyContent: 'space-evenly',
        paddingLeft: 20,
      },
      buttons: {
        width: '50%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        gap: 10,
        button: {
          width: '60%',
          height: '40%',
        },
      },
    },
    productsWrapper: {
      borderColor: '#fff',
      borderWidth: 2,
      alignItems: 'center', // Wyśrodkowanie w poziomie
      justifyContent: 'center', // Wyśrodkowanie w pionie
      paddingTop: 10,
      paddingBottom: 10,
      text: {
        color: 'white',
      },
      singleProduct: {
        backgroundColor: 'white',
        alignItems: 'center', // Wyśrodkowanie w poziomie
        justifyContent: 'center', // Wyśrodkowanie w pionie
        marginTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        text: {
          color: 'black',
        },
      },
    },
  },
});

interface Props {
    storage: StorageModel,
}

const SingleStorage = ({ storage }: Props) => {
  const [editStorageData, setEditStorageData] = useState<EditStorage>(EDIT_STORAGE_INITIAL_VALUES);
  const [storageError, setStorageError] = useState<StorageError>(STORAGE_ERROR_INITIAL_VALUES);
  const dispatch = useAppDispatch();
  const products = useAppSelector(getProducts);

  const onDeleteHandler = () => {
    dispatch(deletingStorageThunk(storage.id));
    ToastAndroid.show('Storage deleted successfully!', ToastAndroid.SHORT);
  };

  const onEditHandler = () => {
    setStorageError(STORAGE_ERROR_INITIAL_VALUES);
    const numberRegex = /^[0-9.]+$/;
    let isError = false;
    const errorData: StorageError = {
      ...STORAGE_ERROR_INITIAL_VALUES,
    };
    if (ifStringIsInvalid(editStorageData.storageName)) {
      isError = true;
      errorData.storageNameError = 'Invalid storage name!';
    }
    if (ifStringIsInvalid(editStorageData.storageCapacity) || !numberRegex.test(editStorageData.storageCapacity)) {
      isError = true;
      errorData.storageCapacityError = 'Invalid storage capacity!';
    }
    if (editStorageData.productsIds.length === 0) {
      isError = true;
      errorData.productsIdsError = 'Please select at least one product!';
    }
    if (isError) {
      setStorageError(errorData);
      ToastAndroid.show('Invalid data!', ToastAndroid.SHORT);
      return;
    }
    try {
      dispatch(editingStorageThunk(editStorageData));
      ToastAndroid.show('Storage edited successfully!', ToastAndroid.SHORT);
    } catch (e) {
      ToastAndroid.show(`${e.message}`, ToastAndroid.SHORT);
    }
  };

  const onAddChangeHandler = (type: string) => (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    e.persist();
    setEditStorageData((prevState) => ({
      ...prevState,
      [type]: e.nativeEvent.text,
    }));
  };

  const onAddProducts = (selectedProducts: any) => {
    setEditStorageData((prevState) => ({
      ...prevState,
      productsIds: selectedProducts,
    }));
  };

  const editingStorageContent = (
    <View>
      <InputComponent
        placeholder="Storage name"
        value={editStorageData.storageName}
        onChange={onAddChangeHandler('storageName')}
        isPassword={false}
        inputId="newStorageName"
        label="Storage name"
        isBlackText
        defaultValue={storage.storageName}
        errorText={storageError.storageNameError}
      />
      <InputComponent
        placeholder="Storage capacity"
        value={editStorageData.storageCapacity}
        onChange={onAddChangeHandler('storageCapacity')}
        isPassword={false}
        inputId="newStorageCapacity"
        label="Storage capacity"
        isBlackText
        defaultValue={storage.storageCapacity}
        errorText={storageError.storageCapacityError}
      />
      <SelectComponent products={products} onAddProducts={onAddProducts} />
      {storageError.productsIdsError && <Text style={{ color: 'red' }}>{storageError.productsIdsError}</Text> }
    </View>
  );

  const mappedProducts = storage.products.map((product) => (
    <View style={styles.storageWrapper.productsWrapper.singleProduct} key={product.id}>
      <Text style={styles.storageWrapper.productsWrapper.singleProduct.text}>{product.productName}</Text>
      <Text style={styles.storageWrapper.productsWrapper.singleProduct.text}>{product.price}</Text>
    </View>
  ));
  return (
    <ScrollView style={styles.storageWrapper}>
      <View style={styles.storageWrapper.infoWrapper}>
        <View style={styles.storageWrapper.infoWrapper.info}>
          <Text style={styles.storageWrapper.infoWrapper.text}>
            ID:
            {storage.id}
          </Text>
          <Text style={styles.storageWrapper.infoWrapper.text}>
            Nazwa:
            {storage.storageName}
          </Text>
          <Text style={styles.storageWrapper.infoWrapper.text}>
            Pojemność magazynu(kg):
            {storage.storageCapacity}
          </Text>
        </View>
        <View style={styles.storageWrapper.infoWrapper.buttons}>
          <ModalComponent
            buttonStyle={styles.storageWrapper.infoWrapper.buttons.button}
            modalButtonText="EDIT"
            modalTitle="Edit storage"
            modalContent={editingStorageContent}
            onSave={onEditHandler}
          />
          <Button onPress={onDeleteHandler} style={styles.storageWrapper.infoWrapper.buttons.button}>DELETE</Button>
        </View>

      </View>
      <View style={styles.storageWrapper.productsWrapper}>
        <Text style={styles.storageWrapper.productsWrapper.text}>Products:</Text>
        {mappedProducts}
      </View>
    </ScrollView>
  );
};

export default SingleStorage;
