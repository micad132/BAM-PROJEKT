import React, { useState } from 'react';
import {
  View, Text, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData, ToastAndroid,
} from 'react-native';
import { Button, styled } from 'tamagui';
import { AddProduct, INITIAL_ADD_PRODUCT_VALUES, Product } from '../../../models/ProductModel';
import ModalComponent from '../../../components/modal.component';
import InputComponent from '../../../components/input.component';
import { deletingProductThunk, editingProductThunk } from '../../../store/reducers/productReducer';
import { useAppDispatch } from '../../../store';

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
  const dispatch = useAppDispatch();
  const onAddChangeHandler = (type: string) => (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    e.persist();
    setEditingProductData((prevState) => ({
      ...prevState,
      [type]: e.nativeEvent.text,
    }));
  };

  const onEditHandler = () => {
    console.log(product);
    console.log(editingProductData);
    const data = {
      ...editingProductData,
      id: product.id,
    };
    try {
      dispatch(editingProductThunk(data));
      ToastAndroid.show('Produkt pomyslnie edytowany!', ToastAndroid.SHORT);
    } catch (e: any) {
      ToastAndroid.show(`${e.message}`, ToastAndroid.SHORT);
    }
  };

  const onDeleteHandler = () => {
    try {
      dispatch(deletingProductThunk(Number(product.id)));
      ToastAndroid.show('Produkt pomyslnie usunięty!', ToastAndroid.SHORT);
    } catch (e: any) {
      ToastAndroid.show(`${e.message}`, ToastAndroid.SHORT);
    }
  };

  const editingProductContent = (
    <View>
      <InputComponent
        placeholder="Nazwa produktu"
        value={editingProductData.productName}
        onChange={onAddChangeHandler('productName')}
        isPassword={false}
        inputId="newProductName"
        label="Nazwa produktu"
        isBlackText
        defaultValue={product.productName}
      />
      <InputComponent
        placeholder="Cena produktu"
        value={editingProductData.price}
        onChange={onAddChangeHandler('price')}
        isPassword={false}
        inputId="newProductPrice"
        label="Cena produktu"
        isBlackText
        defaultValue={product.price}
      />
      <InputComponent
        placeholder="Waga produktu"
        value={editingProductData.weight}
        onChange={onAddChangeHandler('weight')}
        isPassword={false}
        inputId="newProductWeight"
        label="Waga produktu"
        isBlackText
        defaultValue={product.weight}
      />
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
            Nazwa:
            {product.productName}
          </Text>
          <Text style={styles.text}>
            Cena:
            {product.price}
          </Text>
          <Text style={styles.text}>
            Waga:
            {product.weight}
          </Text>
        </View>
        <View style={styles.wrapper.singleProductWrapper.buttonsDiv}>
          <ModalComponent
            buttonStyle={styles.wrapper.singleProductWrapper.buttonsDiv.button}
            buttonSize="$2.5"
            modalButtonText="EDYTUJ"
            modalTitle="Edytuj produkt"
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
