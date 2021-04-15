// inmport action types
import { ProductActionTypes } from './product.type';

/**
 * An action for load/replace all objects into Redux Store
 * @param {*} products payload
 * @returns action object
 */
 export const fetchAllProducts = products => ({
    type: ProductActionTypes.FETCH_ALL_PRODUCTS,
    payload: products
});

/**
 * An action for add an object into Redux Store
 * @param {*} products payload
 * @returns action object
 */
export const addProduct = product => ({
    type: ProductActionTypes.ADD_NEW_PRODUCT,
    payload: product
});

/**
 * An action for edit an object in Redux Store
 * @param {*} products payload
 * @returns action object
 */
export const editProduct = product => ({
    type: ProductActionTypes.EDIT_PRODUCT,
    payload: product
});

/**
 * An action for delete an object in Redux Store
 * @param {*} products payload
 * @returns action object
 */
export const deleteProduct = product => ({
    type: ProductActionTypes.DELETE_PRODUCT,
    payload: product
});