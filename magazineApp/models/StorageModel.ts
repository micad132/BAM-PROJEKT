import { Product } from './ProductModel';

export type StorageModel = {
    id: number,
    storageName: string,
    storageCapacity: string,
    products: Product[]
}

export type EditStorage = {
    id: number,
    storageName: string,
    storageCapacity: string,
    productsIds: string[],
}

export type AddStorage = {
    storageName: string,
    storageCapacity: string,
    productsIds: string[],
}

export type StorageError = {
    storageNameError: string,
    storageCapacityError: string,
    productsIdsError: string,
}

export const ADD_STORAGE_INITIAL_VALUES: AddStorage = {
  storageName: '',
  storageCapacity: '',
  productsIds: [],
};

export const EDIT_STORAGE_INITIAL_VALUES: EditStorage = {
  id: 0,
  storageCapacity: '',
  storageName: '',
  productsIds: [],
};

export const STORAGE_ERROR_INITIAL_VALUES: StorageError = {
  storageNameError: '',
  storageCapacityError: '',
  productsIdsError: '',
};
