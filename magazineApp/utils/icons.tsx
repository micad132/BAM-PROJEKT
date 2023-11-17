import { AntDesign, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import React from 'react';

const tabBarIconHome = ({ focused, color, size }) => (
  <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
);

const tabBarIconProduct = () => (
  <AntDesign name="shoppingcart" size={24} color="black" />
);

const tabBarIconWarehouse = () => (
  <FontAwesome5 name="warehouse" size={18} color="black" />
);

export const Icons = {
  tabBarIconHome, tabBarIconProduct, tabBarIconWarehouse,
};
