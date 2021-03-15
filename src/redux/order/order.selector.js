import { createSelector } from 'reselect';

const selectOrder = state => state.order;

// For orders
export const selectOrders = createSelector(
    [selectOrder],
    order => order.orders
);

// For an order
// export const selectOrder = createSelector(
//     [selectOrder],
//     order => order.order
// );