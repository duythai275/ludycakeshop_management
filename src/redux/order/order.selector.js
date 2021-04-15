// import node_modules
import { createSelector } from 'reselect';

// get the exact state in store
const selectOrder = state => state.order;

// customize the store
export const selectOrders = createSelector(
    [selectOrder],
    order => order.orders
);