export type AddProduct = {
    name: string,
    price: string,
    weight: string,
}

export type Product = AddProduct & {
    id: string,
}

export const INITIAL_ADD_PRODUCT_VALUES: AddProduct = {
  name: '',
  price: '0',
  weight: '0',
};

export const INITIAL_PRODUCT_VALUES: Product = {
  ...INITIAL_ADD_PRODUCT_VALUES,
  id: '1',
};