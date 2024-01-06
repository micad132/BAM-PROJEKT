import { Product } from './ProductModel';

export type StorageModel = {
    id: number,
    storageName: string,
    storageCapacity: string,
    products: Product[]
}

export type AddStorage = {
    storageName: string,
    storageCapacity: string,
    productsIds: string[],
}

export const ADD_STORAGE_INITIAL_VALUES: AddStorage = {
  storageName: '',
  storageCapacity: '',
  productsIds: [],
};
