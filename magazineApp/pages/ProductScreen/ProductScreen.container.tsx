import React, { useState } from 'react';
import {
  NativeSyntheticEvent, Text, TextInputChangeEventData, ToastAndroid, View,
} from 'react-native';
import { ScrollView } from 'tamagui';
import PageWrapperComponent from '../../components/pageWrapper.component';
import ModalComponent from '../../components/modal.component';
import InputComponent from '../../components/input.component';
import { INITIAL_ADD_PRODUCT_VALUES, AddProduct, Product } from '../../models/ProductModel';
import ProductsListComponent from './components/productsList.component';
import SingleProductComponent from './components/singleProduct.component';

const MOCKED_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Mleczko',
    price: '4333',
    weight: '233',
  },
  {
    id: '2',
    name: 'Guwienko',
    price: '18333',
    weight: '1822',
  },
  {
    id: '3',
    name: 'smacznego',
    price: '933',
    weight: '19922',
  },
];

const ProductScreen = () => {
  const [newProductData, setNewProductData] = useState<AddProduct>(INITIAL_ADD_PRODUCT_VALUES);

  const productList = MOCKED_PRODUCTS.map((product) => <SingleProductComponent key={product.id} product={product} />);

  // eslint-disable-next-line max-len
  const onAddChangeHandler = (type: string) => (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    e.persist();
    setNewProductData((prevState) => ({
      ...prevState,
      [type]: e.nativeEvent.text,
    }));
  };

  const onSaveHandler = () => {
    console.log(newProductData);
    ToastAndroid.show('Pomyślnie dodano produkt!', ToastAndroid.SHORT);
  };

  const modalContent = (
    <View>
      <InputComponent
        placeholder="Nazwa produktu"
        value={newProductData.name}
        onChange={onAddChangeHandler('name')}
        isPassword={false}
        inputId="newProductName"
        label="Nazwa produktu"
        isBlackText
      />
      <InputComponent
        placeholder="Cena produktu"
        value={newProductData.price}
        onChange={onAddChangeHandler('price')}
        isPassword={false}
        inputId="newProductPrice"
        label="Cena produktu"
        isBlackText
      />
      <InputComponent
        placeholder="Waga produktu"
        value={newProductData.weight}
        onChange={onAddChangeHandler('weight')}
        isPassword={false}
        inputId="newProductWeight"
        label="Waga produktu"
        isBlackText
      />
    </View>
  );

  return (
    <PageWrapperComponent>
      <ModalComponent modalButtonText="Dodaj" modalTitle="Dodaj produkt" modalContent={modalContent} onSave={onSaveHandler} />
      <ProductsListComponent productList={productList} />
    </PageWrapperComponent>
  );
};

export default ProductScreen;
