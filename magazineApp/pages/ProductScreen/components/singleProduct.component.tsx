import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { styled } from 'tamagui';
import { Product } from '../../../models/ProductModel';

type Props = {
    product: Product,
}

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    // Dodaj inne style, jeśli są potrzebne
  },
});

const SingleProductComponent = ({
  product,
}: Props) => (
  <View>
    <Text style={styles.text}>
      ID:
      {product.id}
    </Text>
    <Text style={styles.text}>
      Nazwa:
      {product.name}
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
);

export default SingleProductComponent;
