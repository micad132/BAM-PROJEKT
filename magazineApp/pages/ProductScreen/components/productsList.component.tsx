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
    <StyledH6>
      Currently, there are 
      { productList.length}
      products in database. 
    </StyledH6>
    {productList}
  </View>
);

export default ProductsListComponent;
