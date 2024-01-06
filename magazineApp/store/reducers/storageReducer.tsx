import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../index';
import { AddProduct, Product } from '../../models/ProductModel';
import { ProductService } from '../../services/ProductService';
import { AddStorage, StorageModel } from '../../models/StorageModel';
import { StoragesService } from '../../services/StoragesService';

interface StorageReducer {
    addingStorage: AddStorage,
    storages: StorageModel[]
    isLoaded: boolean,
    error: string | null,
}

const initialState: StorageReducer = {
  storages: [],
  isLoaded: false,
  error: null,
  addingStorage: {
    storageName: '',
    storageCapacity: '',
    productsIds: [],
  },
};

// eslint-disable-next-line import/prefer-default-export
export const fetchingStoragesThunk = createAsyncThunk(
  'getStorages',
  // eslint-disable-next-line consistent-return
  async () => {
    try {
      const data = await StoragesService.getAllStorages();
      return data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const editingStorageThunk = createAsyncThunk(
  'editStorage',
  // eslint-disable-next-line consistent-return
  async (editData: Product) => {
    try {
      await ProductService.editProduct(editData);
      const data = await StoragesService.getAllStorages();
      return data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const addingStorageThunk = createAsyncThunk(
  'addStorage',
  // eslint-disable-next-line consistent-return
  async (storageData: AddStorage) => {
    try {
      console.log('DATA THUNK', storageData);
      await StoragesService.addStorage(storageData);
      const data = await StoragesService.getAllStorages();
      return data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const deletingStorageThunk = createAsyncThunk(
  'deleteStorage',
  // eslint-disable-next-line consistent-return
  async (id: number) => {
    try {
      await StoragesService.deleteStorage(id);
      const data = await StoragesService.getAllStorages();
      return data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const getIsLoaded = (state: RootState): boolean => state.storage.isLoaded;
export const getStorages = (state: RootState): StorageModel[] => state.storage.storages;

const storageSlice = createSlice({
  name: 'storageSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchingStoragesThunk.fulfilled, (state, action) => {
      state.storages = action.payload;
      state.isLoaded = true;
    });
    builder.addCase(addingStorageThunk.fulfilled, (state, action) => {
      state.storages = action.payload;
      state.isLoaded = true;
    });
    builder.addCase(editingStorageThunk.fulfilled, (state, action) => {
      state.storages = action.payload;
    });
    builder.addCase(deletingStorageThunk.fulfilled, (state, action) => {
      state.storages = action.payload;
    });
  },
});

export default storageSlice.reducer;
