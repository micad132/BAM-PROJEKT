import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import { Product } from '../models/ProductModel';

interface Props {
    products: Product[],
    onAddProducts: (products: any) => void,
}

const MultiSelectExample = ({ products, onAddProducts }: Props) => {
  const [selectedItems, setSelectedItems] = useState<Product[]>([]);

  // Funkcja obsługująca zmiany w wybranych elementach
  const onSelectedItemsChange = (items) => {
    setSelectedItems(items);
    onAddProducts(items);
  };

  return (
    <View>
      <MultiSelect
        items={products.map((product) => ({
          id: product.id,
          name: product.productName,
        }))}
        uniqueKey="id"
        selectedItems={selectedItems}
        onSelectedItemsChange={onSelectedItemsChange}
        selectText="Select products"
        searchInputPlaceholderText="Search..."
        tagRemoveIconColor="#CCC"
        tagBorderColor="#CCC"
        tagTextColor="#CCC"
        selectedItemTextColor="#CCC"
        selectedItemIconColor="#CCC"
        itemTextColor="#000"
        displayKey="name"
        searchInputStyle={{ color: '#CCC' }}
        submitButtonColor="#CCC"
        submitButtonText="Select"
      />
      <View>
        <Text>Wybrane produkty:</Text>
        {selectedItems.map((product) => (
          <TouchableOpacity key={product.id}>
            <Text>{product.productName}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default MultiSelectExample;
