import axios from 'axios';
import { AddProduct } from '../models/ProductModel';
import { URL_LINK } from '../utils/utils';

const getAllProducts = async () => {
  const response = await axios.get(`${URL_LINK}/product`);
  return response.data;
};

const addProduct = async (data: AddProduct) => {
  const response = await axios.post(`${URL_LINK}/product`, data);
  return response.data;
};

export const ProductService = { getAllProducts, addProduct };
