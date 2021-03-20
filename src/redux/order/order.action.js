import { OrderActionTypes } from './order.type';

export const getOrders = orders => ({
    type: OrderActionTypes.GET_ORDERS,
    payload: orders
});

export const updateOrderStatus = order => ({
    type: OrderActionTypes.UPDATE_ORDER_STATUS,
    payload: order
});

export const deleteOrder = order => ({
    type: OrderActionTypes.DELETE_ORDER,
    payload: order
});