// import node_modules
import { createSelector } from 'reselect';

// get the exact state in store
const selectCategory = state => state.category;

// customize the store
export const selectCategories = createSelector(
    [selectCategory],
    category => category.categories
);