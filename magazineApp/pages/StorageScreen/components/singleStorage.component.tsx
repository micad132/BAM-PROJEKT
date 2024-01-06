import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'tamagui';
import { StorageModel } from '../../../models/StorageModel';
import { useAppSelector } from '../../../store';
import { getProducts } from '../../../store/reducers/productReducer';

const styles = StyleSheet.create({
  storageWrapper: {
    marginTop: 10,
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderColor: '#fff',
    borderWidth: 2,
    infoWrapper: {
      alignItems: 'center', // Wyśrodkowanie w poziomie
      justifyContent: 'center', // Wyśrodkowanie w pionie
      paddingTop: 10,
      paddingBottom: 10,
      text: {
        color: 'white',
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
  console.log('SJJDS', storage);
  const products = storage.products.map((product) => (
    <View style={styles.storageWrapper.productsWrapper.singleProduct} key={product.id}>
      <Text style={styles.storageWrapper.productsWrapper.singleProduct.text}>{product.productName}</Text>
      <Text style={styles.storageWrapper.productsWrapper.singleProduct.text}>{product.price}</Text>
    </View>
  ));
  return (
    <ScrollView style={styles.storageWrapper}>
      <View style={styles.storageWrapper.infoWrapper}>
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
      <View style={styles.storageWrapper.productsWrapper}>
        <Text style={styles.storageWrapper.productsWrapper.text}>Produkty:</Text>
        {products}
      </View>
    </ScrollView>
  );
};

export default SingleStorage;
