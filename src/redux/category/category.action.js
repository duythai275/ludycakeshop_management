// inmport action types
import { CategoryActionTypes } from './category.type';

/**
 * An action for load/replace all objects into Redux Store
 * @param {*} categories payload
 * @returns action object
 */
 export const fetchAllCategories = categories => ({
    type: CategoryActionTypes.FETCH_ALL_CATEGORIES,
    payload: categories
});

/**
 * An action for add an object into Redux Store
 * @param {*} category payload
 * @returns action object
 */
 export const addCategory = category => ({
    type: CategoryActionTypes.ADD_NEW_CATEGORY,
    payload: category
});

/**
 * An action for edit an object in Redux Store
 * @param {*} category payload
 * @returns action object
 */
 export const editCategory = category => ({
    type: CategoryActionTypes.EDIT_CATEGORY,
    payload: category
});

/**
 * An action for delete an object in Redux Store
 * @param {*} category payload
 * @returns action object
 */
 export const deleteCategory = category => ({
    type: CategoryActionTypes.DELETE_CATEGORY,
    payload: category
});