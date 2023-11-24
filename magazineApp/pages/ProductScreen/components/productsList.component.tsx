import React from 'react';
import { View } from 'react-native';
import { H6, styled } from 'tamagui';
import { Product } from '../../../models/ProductModel';

const StyledH6 = styled(H6, {
  color: '#fff',
  textAlign: 'center',
});

type Props = {
    productList: Product[],
}

const ProductsListComponent = ({ productList }: Props) => (
  <View>
    <StyledH6>W bazie lacznie znajduje sie 6 produktow</StyledH6>
    {productList}
  </View>
);

export default ProductsListComponent;
