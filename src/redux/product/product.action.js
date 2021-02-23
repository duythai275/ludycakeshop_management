import { ProductActionTypes } from './product.type';

export const fetchAllProducts = products => ({
    type: ProductActionTypes.FETCH_ALL_PRODUCTS,
    payload: products
});

export const addProduct = product => ({
    type: ProductActionTypes.ADD_NEW_PRODUCT,
    payload: product
});

export const editProduct = product => ({
    type: ProductActionTypes.EDIT_PRODUCT,
    payload: product
});

export const deleteProduct = product => ({
    type: ProductActionTypes.DELETE_PRODUCT,
    payload: product
});