import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../index';
import { AddProduct, Product } from '../../models/ProductModel';
import { ProductService } from '../../services/ProductService';

interface ProductReducer {
    addingProduct: AddProduct,
    products: Product[]
    isLoaded: boolean,
    error: string | null,
}

const initialState: ProductReducer = {
  products: [],
  isLoaded: false,
  error: null,
  addingProduct: {
    productName: '',
    price: '',
    weight: '',
  },
};

// eslint-disable-next-line import/prefer-default-export
export const fetchingProductsThunk = createAsyncThunk(
  'getProduct',
  // eslint-disable-next-line consistent-return
  async () => {
    try {
      const data = await ProductService.getAllProducts();
      return data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const editingProductThunk = createAsyncThunk(
  'editProduct',
  // eslint-disable-next-line consistent-return
  async (editData: Product) => {
    try {
      await ProductService.editProduct(editData);
      const data = await ProductService.getAllProducts();
      return data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const addingProductThunk = createAsyncThunk(
  'addProduct',
  // eslint-disable-next-line consistent-return
  async (productData: AddProduct) => {
    try {
      await ProductService.addProduct(productData);
      const data = await ProductService.getAllProducts();
      return data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const deletingProductThunk = createAsyncThunk(
  'deleteProduct',
  // eslint-disable-next-line consistent-return
  async (id: number) => {
    try {
      await ProductService.deleteProduct(id);
      const data = await ProductService.getAllProducts();
      return data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const getIsLoaded = (state: RootState): boolean => state.product.isLoaded;
export const getProducts = (state: RootState): Product[] => state.product.products;

const productSlice = createSlice({
  name: 'testSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchingProductsThunk.fulfilled, (state, action) => {
      state.products = action.payload;
      state.isLoaded = true;
    });
    builder.addCase(addingProductThunk.fulfilled, (state, action) => {
      state.products = action.payload;
      state.isLoaded = true;
    });
    builder.addCase(editingProductThunk.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(deletingProductThunk.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export default productSlice.reducer;
