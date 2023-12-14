import axios from 'axios';
import { AddProduct, Product } from '../models/ProductModel';
import { URL_LINK } from '../utils/utils';

const getAllProducts = async () => {
  const response = await axios.get(`${URL_LINK}/product`);
  return response.data;
};

const addProduct = async (data: AddProduct) => {
  const response = await axios.post(`${URL_LINK}/product`, data);
  return response.data;
};

const editProduct = async (data: Product) => {
  const response = await axios.put(`${URL_LINK}/product`, data);
  return response.data;
};

const deleteProduct = async (id: number) => {
  const response = await axios.delete(`${URL_LINK}/product/${id}`);
  return response.data;
};

export const ProductService = {
  getAllProducts, addProduct, editProduct, deleteProduct,
};
