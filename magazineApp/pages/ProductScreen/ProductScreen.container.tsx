import React, { useState } from 'react';
import {
  NativeSyntheticEvent, Text, TextInputChangeEventData, ToastAndroid, View,
} from 'react-native';
import { ScrollView, Select } from 'tamagui';
import PageWrapperComponent from '../../components/pageWrapper.component';
import ModalComponent from '../../components/modal.component';
import InputComponent from '../../components/input.component';
import {
  INITIAL_ADD_PRODUCT_VALUES,
  AddProduct,
  Product,
  ProductError,
  INITIAL_PRODUCT_ERROR_VALUES,
} from '../../models/ProductModel';
import ProductsListComponent from './components/productsList.component';
import SingleProductComponent from './components/singleProduct.component';
import { ProductService } from '../../services/ProductService';
import { useAppDispatch, useAppSelector } from '../../store';
import { addingProductThunk, getProducts } from '../../store/reducers/productReducer';
import { ifStringIsInvalid, sanitizeData } from '../../services/ValidationService';


const ProductScreen = () => {
  const dispatch = useAppDispatch();
  const [newProductData, setNewProductData] = useState<AddProduct>(INITIAL_ADD_PRODUCT_VALUES);
  const [productErrors, setProductErrors] = useState<ProductError>(INITIAL_PRODUCT_ERROR_VALUES);

  const products = useAppSelector(getProducts);
  const productList = products?.map((product) => <SingleProductComponent key={product.id} product={product} />);

  // eslint-disable-next-line max-len
  const onAddChangeHandler = (type: string) => (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    e.persist();
    setNewProductData((prevState) => ({
      ...prevState,
      [type]: sanitizeData(e.nativeEvent.text),
    }));
  };

  const onSaveHandler = async () => {
    setProductErrors(INITIAL_PRODUCT_ERROR_VALUES);
    const priceRegex = /^[0-9.]+$/;
    let isError = false;
    const errorData: ProductError = { ...INITIAL_PRODUCT_ERROR_VALUES };
    if (ifStringIsInvalid(newProductData.productName)) {
      errorData.productNameError = 'Invalid product name!';
      isError = true;
    }
    if (ifStringIsInvalid(newProductData.price) || !priceRegex.test(newProductData.price)) {
      errorData.productPriceError = 'Invalid price!';
      isError = true;
    }
    if (ifStringIsInvalid(newProductData.weight) || !priceRegex.test(newProductData.weight)) {
      errorData.productWeightError = 'Invalid weight!';
      isError = true;
    }
    if (isError) {
      setProductErrors(errorData);
      ToastAndroid.show('Invalid data!', ToastAndroid.SHORT);
      return;
    }
    try {
      dispatch(addingProductThunk(newProductData));
      ToastAndroid.show('Product addedd successfully!', ToastAndroid.SHORT);
      setNewProductData(INITIAL_ADD_PRODUCT_VALUES);
    } catch (e: any) {
      ToastAndroid.show(`${e.message}`, ToastAndroid.SHORT);
    }
  };

  const modalContent = (
    <View>
      <InputComponent
        placeholder="Product name"
        value={newProductData.productName}
        onChange={onAddChangeHandler('productName')}
        isPassword={false}
        inputId="newProductName"
        label="Product name"
        isBlackText
        errorText={productErrors.productNameError}
      />
      <InputComponent
        placeholder="Product price"
        value={newProductData.price}
        onChange={onAddChangeHandler('price')}
        isPassword={false}
        inputId="newProductPrice"
        label="Product price"
        isBlackText
        errorText={productErrors.productPriceError}
      />
      <InputComponent
        placeholder="Product weight"
        value={newProductData.weight}
        onChange={onAddChangeHandler('weight')}
        isPassword={false}
        inputId="newProductWeight"
        label="Product weight"
        isBlackText
        errorText={productErrors.productWeightError}
      />
    </View>
  );

  return (
    <PageWrapperComponent>
      <ModalComponent modalButtonText="Add" modalTitle="Add product" modalContent={modalContent} onSave={onSaveHandler} />
      <ProductsListComponent productList={productList} />
    </PageWrapperComponent>
  );
};

export default ProductScreen;
