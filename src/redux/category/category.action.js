import { CategoryActionTypes } from './category.type';

export const fetchAllCategories = categories => ({
    type: CategoryActionTypes.FETCH_ALL_CATEGORIES,
    payload: categories
});