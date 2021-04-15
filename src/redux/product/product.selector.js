// import node_modules
import { createSelector } from 'reselect';

// get the exact state in store
const selectProduct = state => state.product;

// customize the store
export const selectProducts = createSelector(
    [selectProduct],
    product => product.products
);