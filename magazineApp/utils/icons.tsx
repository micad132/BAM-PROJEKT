import { AntDesign, Ionicons } from '@expo/vector-icons';
import React from 'react';

const tabBarIconHome = ({ focused, color, size }) => (
  <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
);

const tabBarIconProduct = ({ focused, color, size }) => (
  <AntDesign name="shoppingcart" size={24} color="black" />
);

export const Icons = {
  tabBarIconHome, tabBarIconProduct,
};
