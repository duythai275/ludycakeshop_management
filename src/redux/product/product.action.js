import { ProductActionTypes } from './product.type';

export const fetchAllProducts = products => ({
    type: ProductActionTypes.FETCH_ALL_PRODUCTS,
    payload: products
});