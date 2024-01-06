import axios from 'axios';
import { URL_LINK } from '../utils/utils';
import { AddStorage, StorageModel } from '../models/StorageModel';

const getAllStorages = async () => {
  const response = await axios.get(`${URL_LINK}/storage`);
  return response.data;
};

const addStorage = async (storageData: AddStorage) => {
  console.log('Z SERWISU', storageData);
  const response = await axios.post(`${URL_LINK}/storage`, storageData);
  return response.data;
};

const deleteStorage = async (id: number) => {
  const response = await axios.delete(`${URL_LINK}/storage/${id}`);
  return response.data;
};

const editStorage = async (storageData: StorageModel) => {
  const response = await axios.put(`${URL_LINK}/storage`, storageData);
  return response.data;
};

export const StoragesService = {
  getAllStorages, addStorage, deleteStorage, editStorage,
};
