export type AddProduct = {
    productName: string,
    price: string,
    weight: string,
}

export type Product = AddProduct & {
    id: string,
}

export type ProductError = {
    productNameError: string,
    productPriceError: string,
    productWeightError: string,
}

export const INITIAL_ADD_PRODUCT_VALUES: AddProduct = {
  productName: '',
  price: '',
  weight: '',
};

export const INITIAL_PRODUCT_VALUES: Product = {
  ...INITIAL_ADD_PRODUCT_VALUES,
  id: '1',
};

export const INITIAL_PRODUCT_ERROR_VALUES: ProductError = {
  productNameError: '',
  productPriceError: '',
  productWeightError: '',
};
