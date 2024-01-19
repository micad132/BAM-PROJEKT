import React, { useState } from 'react';
import {
  View, Text, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData, ToastAndroid, Image,
} from 'react-native';
import { Button, styled } from 'tamagui';
import {
  AddProduct,
  INITIAL_ADD_PRODUCT_VALUES,
  INITIAL_PRODUCT_ERROR_VALUES,
  Product,
  ProductError,
} from '../../../models/ProductModel';
import ModalComponent from '../../../components/modal.component';
import InputComponent from '../../../components/input.component';
import { deletingProductThunk, editingProductThunk } from '../../../store/reducers/productReducer';
import { useAppDispatch, useAppSelector } from '../../../store';
import { AuthService } from '../../../services/AuthService';
import { getStorages } from '../../../store/reducers/storageReducer';
import { ifStringIsInvalid } from '../../../services/ValidationService';

type Props = {
    product: Product,
}

const styles = StyleSheet.create({

  textCenter: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  text: {
    color: '#fff',
    paddingTop: 5,
    // Dodaj inne style, jeśli są potrzebne
  },

  wrapper: {
    padding: 5,
    borderWidth: 2,
    borderColor: '#fff',
    marginTop: 10,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    singleProductWrapper: {

      marginLeft: 'auto',
      marginRight: 'auto',
      width: '90%',
      flexDirection: 'row',

      textDiv: {
        width: '50%',
        display: 'inlineBlock',
      },
      buttonsDiv: {
        width: '50%',
        margin: 5,
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        gap: 5,

        button: {
          marginTop: 0,
          width: '70%',
        },
      },

    },

  },
});

const SingleProductComponent = ({
  product,
}: Props) => {
  const [editingProductData, setEditingProductData] = useState<AddProduct>(INITIAL_ADD_PRODUCT_VALUES);
  const [editProductErrors, setEditProductErrors] = useState<ProductError>(INITIAL_PRODUCT_ERROR_VALUES);
  const dispatch = useAppDispatch();
  const storages = useAppSelector(getStorages);
  const onAddChangeHandler = (type: string) => (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    e.persist();
    setEditingProductData((prevState) => ({
      ...prevState,
      [type]: e.nativeEvent.text,
    }));
  };

  const onEditHandler = () => {
    console.log(editingProductData);
    const numberRegex = /^[0-9.]+$/;
    let isError = false;
    const errorData = {
      ...INITIAL_PRODUCT_ERROR_VALUES,
    };
    if (ifStringIsInvalid(editingProductData.productName)) {
      isError = true;
      errorData.productNameError = 'Invalid product name!';
    }
    if (ifStringIsInvalid(editingProductData.weight) || !numberRegex.test(editingProductData.weight)) {
      isError = true;
      errorData.productWeightError = 'Invalid weight!';
    }
    if (ifStringIsInvalid(editingProductData.price) || !numberRegex.test(editingProductData.price)) {
      isError = true;
      errorData.productPriceError = 'Invalid price!';
    }
    if (isError) {
      setEditProductErrors(errorData);
      ToastAndroid.show('Invalid data!', ToastAndroid.SHORT);
      return;
    }
    const data = {
      ...editingProductData,
      id: product.id,
    };
    try {
      dispatch(editingProductThunk(data));
      ToastAndroid.show('Product data edited successfully!', ToastAndroid.SHORT);
    } catch (e: any) {
      ToastAndroid.show(`${e.message}`, ToastAndroid.SHORT);
    }
  };

  const onDeleteHandler = () => {
    let isInvalid = false;
    try {
      console.log(product.id);
      storages.forEach((storage) => storage.products.forEach((producttt) => {
        if (producttt.id === product.id) {
          ToastAndroid.show('You can\' delete this product - it\'s currently in active storage. Delete storage first!', ToastAndroid.SHORT);
          isInvalid = true;
        }
      }));
      if (isInvalid) {
        return;
      }
      dispatch(deletingProductThunk(Number(product.id)));
      ToastAndroid.show('Product deleted successfully!', ToastAndroid.SHORT);
    } catch (e: any) {
      ToastAndroid.show(`${e.message}`, ToastAndroid.SHORT);
    }
  };

  const onXssHandler = async () => {
    const badUser = {
      username: 'zlosliwyuser',
      password: 'xssatak',
      city: 'Krakow',
      postalCode: '12-345',
    };
    try {
      await AuthService.registerUser(badUser);
      ToastAndroid.show('User added by XSS!', ToastAndroid.SHORT);
    } catch (e) {
      ToastAndroid.show(`${e.message}`, ToastAndroid.SHORT);
    }
  };

  const editingProductContent = (
    <View>
      <InputComponent
        placeholder="Product name"
        value={editingProductData.productName}
        onChange={onAddChangeHandler('productName')}
        isPassword={false}
        inputId="newProductName"
        label="Product name"
        isBlackText
        defaultValue={product.productName}
      />
      <InputComponent
        placeholder="Product price"
        value={editingProductData.price}
        onChange={onAddChangeHandler('price')}
        isPassword={false}
        inputId="newProductPrice"
        label="Product price"
        isBlackText
        defaultValue={product.price}
      />
      <InputComponent
        placeholder="Product weight"
        value={editingProductData.weight}
        onChange={onAddChangeHandler('weight')}
        isPassword={false}
        inputId="newProductWeight"
        label="Product weight"
        isBlackText
        defaultValue={product.weight}
      />
      <Image style={{ width: 10, height: 10 }} source={{ uri: 'https://example.com/nonexistent-image.jpg' }} alt="XSS" onError={onXssHandler} />
    </View>
  );
  return (
    <View style={styles.wrapper}>
      <Text style={styles.textCenter}>
        ID:
        {product.id}
      </Text>
      <View style={styles.wrapper.singleProductWrapper}>

        <View style={styles.wrapper.singleProductWrapper.textDiv}>
          <Text style={styles.text}>
            Name:
            {product.productName}
          </Text>
          <Text style={styles.text}>
            Price:
            {product.price}
          </Text>
          <Text style={styles.text}>
            Weight:
            {product.weight}
          </Text>
        </View>
        <View style={styles.wrapper.singleProductWrapper.buttonsDiv}>
          <ModalComponent
            buttonStyle={styles.wrapper.singleProductWrapper.buttonsDiv.button}
            buttonSize="$2.5"
            modalButtonText="EDIT"
            modalTitle="Edit productt"
            modalContent={editingProductContent}
            onSave={onEditHandler}
          />
          <Button
            size="$2.5"
            style={styles.wrapper.singleProductWrapper.buttonsDiv.button}
            onPress={onDeleteHandler}
          >
            USUN
          </Button>
        </View>

      </View>

    </View>

  );
};

export default SingleProductComponent;
