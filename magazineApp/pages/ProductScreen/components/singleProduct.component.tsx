import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, styled } from 'tamagui';
import { Product } from '../../../models/ProductModel';

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
    // Dodaj inne style, jeśli są potrzebne
  },

  wrapper: {
    borderWidth: 2,
    borderColor: '#fff',
    marginTop: 10,
    singleProductWrapper: {

      marginLeft: 'auto',
      marginRight: 'auto',
      width: '90%',
      flexDirection: 'row',

      textDiv: {
        borderWidth: 2,
        borderColor: 'red',
        width: '50%',
        display: 'inlineBlock',
      },
      buttonsDiv: {
        width: '50%',
        display: 'inlineBlock',
      },

    },

  },
});

const SingleProductComponent = ({
  product,
}: Props) => (
  <View style={styles.wrapper}>
    <Text style={styles.textCenter}>
      ID:
      {product.id}
    </Text>
    <View style={styles.wrapper.singleProductWrapper}>

      <View style={styles.wrapper.singleProductWrapper.textDiv}>
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
      <View style={styles.wrapper.singleProductWrapper.buttonsDiv}>
        <Button>EDIT</Button>
        <Button>USUN</Button>
      </View>

    </View>

  </View>

);

export default SingleProductComponent;
