// inmport action types
import { OrderActionTypes } from './order.type';

/**
 * An action for load/replace all objects into Redux Store
 * @param {*} orders payload
 * @returns action object
 */
 export const getOrders = orders => ({
    type: OrderActionTypes.GET_ORDERS,
    payload: orders
});

/**
 * An action for edit an object in Redux Store
 * @param {*} order payload
 * @returns action object
 */
 export const updateOrderStatus = order => ({
    type: OrderActionTypes.UPDATE_ORDER_STATUS,
    payload: order
});

/**
 * An action for delete an object in Redux Store
 * @param {*} order payload
 * @returns action object
 */
 export const deleteOrder = order => ({
    type: OrderActionTypes.DELETE_ORDER,
    payload: order
});