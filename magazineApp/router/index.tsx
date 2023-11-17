import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductScreen from '../pages/ProductScreen/ProductScreen.container';
import LoginScreen from '../pages/AuthScreen/LoginScreen.container';
import RegisterScreen from '../pages/AuthScreen/RegisterScreen.container';
import { Icons } from '../utils/icons';
import HomePage from '../pages/HomeScreen/HomeScreen.container';
import StorageScreen from '../pages/StorageScreen/StorageScreen.container';

// Tworzenie Bottom Tab Navigatora
const Tab = createBottomTabNavigator();
export const TabNavigatorComponent = () => (
  <Tab.Navigator initialRouteName="Home">
    <Tab.Screen
      name="Home Screen"
      component={HomePage}
      options={{
        tabBarIcon: Icons.tabBarIconHome,
      }}
    />
    <Tab.Screen
      name="Product"
      component={ProductScreen}
      options={{
        tabBarIcon: Icons.tabBarIconProduct,
      }}
    />
    <Tab.Screen
      name="Warehouse"
      component={StorageScreen}
      options={{
        tabBarIcon: Icons.tabBarIconWarehouse,
      }}
    />
  </Tab.Navigator>
);

const StackNavigator = createStackNavigator();
const StackNavigatorComponent = () => (
  <StackNavigator.Navigator initialRouteName="Login">
    <StackNavigator.Screen name="Login" component={LoginScreen} />
    <StackNavigator.Screen name="Register" component={RegisterScreen} />
    <StackNavigator.Screen
      name="HomeNavigation"
      component={TabNavigatorComponent}
      options={{
        headerShown: false, // Ukryj nagłówek na tym ekranie
      }}
    />
  </StackNavigator.Navigator>
);

export default StackNavigatorComponent;
