import { CategoryActionTypes } from './category.type';

export const fetchAllCategories = categories => ({
    type: CategoryActionTypes.FETCH_ALL_CATEGORIES,
    payload: categories
});

export const addCategory = category => ({
    type: CategoryActionTypes.ADD_NEW_CATEGORY,
    payload: category
});

export const editCategory = category => ({
    type: CategoryActionTypes.EDIT_CATEGORY,
    payload: category
});

export const deleteCategory = category => ({
    type: CategoryActionTypes.DELETE_CATEGORY,
    payload: category
});