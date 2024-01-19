import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Button, styled } from 'tamagui';
import { StackActions } from '@react-navigation/native';
import axios from 'axios';
import PageWrapperComponent from '../../components/pageWrapper.component';
import LoggedUserHeaderComponent from './components/loggedUserHeader.component';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchingProductsThunk, getProducts } from '../../store/reducers/productReducer';
import { ProductService } from '../../services/ProductService';
import { fetchingStoragesThunk, getStorages } from '../../store/reducers/storageReducer';
import ContentTable from './components/contentTable.component';

const LogoutButton = styled(Button, {
  backgroundColor: '#fff',
  width: '40%',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: 20,
});

const HomePage = ({ navigation }: any) => {
  const [loggedUser, setLoggedUser] = useState<any>({});
  const dispatch = useAppDispatch();
  const products = useAppSelector(getProducts);
  const storages = useAppSelector(getStorages);

  useEffect(() => {
    const fetchLoggedUser = async () => {
      try {
        const data = await axios.get('http://10.0.2.2:8080/api/v1/user/logged');
        setLoggedUser(data.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchLoggedUser();
    dispatch(fetchingProductsThunk());
    dispatch(fetchingStoragesThunk());
  }, []);

  const handleLogout = () => navigation.dispatch(StackActions.replace('Login'));

  const properHomeContent = loggedUser.username ? (
    <>
      <LogoutButton onPress={handleLogout}>Logout</LogoutButton>
      <LoggedUserHeaderComponent
        userName={loggedUser.username}
      />
      <ContentTable
        productCount={products.length}
        storageCount={storages.length}
      />
    </>
  ) : (<PageWrapperComponent><Text>You are not logged in.</Text></PageWrapperComponent>);

  return (
    <PageWrapperComponent>
      {properHomeContent}
    </PageWrapperComponent>
  );
};

export default HomePage;
