import { createSelector } from 'reselect';

const selectOrder = state => state.order;

export const selectOrders = createSelector(
    [selectOrder],
    order => order.orders
);