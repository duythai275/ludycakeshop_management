// inmport action types
import { OrderActionTypes } from './order.type';

// initiate store for orders
const INITIAL_STATE = {
    orders: [
        {
            id: 1,
            orderName: "Antonio Test",
            phone: "403-123-4567",
            orderDate: "2023-04-30",
            email: "antonio@nait.ca",
            address: "123 ABC, Edmonton",
            note: "",
            priceSum: 24.9,
            status: "pending",
            itemList: [{
                order_items_id: 1,
                product_name: "cake 1",
                quantity: 1,
                total: 12.45
            },
            {
                order_items_id: 2,
                product_name: "cake 12",
                quantity: 1,
                total: 12.45
            }]
        },
        {
            id: 2,
            orderName: "Antonio NAIT",
            phone: "403-123-4567",
            orderDate: "2023-04-30",
            email: "antonio@nait.ca",
            address: "123 ABC, Edmonton",
            note: "",
            priceSum: 330,
            status: "confirmed",
            itemList: [{
                order_items_id: 1,
                product_name: "cake 1",
                quantity: 2,
                total: 300
            }]
        },
        {
            id: 3,
            orderName: "Antonio ClubBaist",
            phone: "403-123-4567",
            orderDate: "2023-04-30",
            email: "antonio@nait.ca",
            address: "123 ABC, Edmonton",
            note: "",
            priceSum: 330,
            status: "ready",
            itemList: [{
                order_items_id: 1,
                product_name: "cake 1",
                quantity: 2,
                total: 300
            }]
        },
        {
            id: 4,
            orderName: "Antonio Demo",
            phone: "403-123-4567",
            orderDate: "2023-04-30",
            email: "antonio@nait.ca",
            address: "123 ABC, Edmonton",
            note: "",
            priceSum: 330,
            status: "paid",
            paidDate: "2023-05-01",
            itemList: [{
                order_items_id: 1,
                product_name: "cake 1",
                quantity: 2,
                total: 300
            }]
        }
    ]
}

/**
 * Manage states in store by actions
 * @param {*} state initial state
 * @param {*} action action object
 * @returns updated state
 */
 const orderReducer = ( state = INITIAL_STATE, action ) => {
    switch ( action.type ) {
        case OrderActionTypes.GET_ORDERS:
            return {
                ...state,
                orders: action.payload
            };
        case OrderActionTypes.UPDATE_ORDER_STATUS:
            return {
                ...state,
                orders: state.orders.map( order => ( order.id === action.payload.id ) ? action.payload : order )
            };
        case OrderActionTypes.DELETE_ORDER:
            return {
                ...state,
                orders: state.orders.filter( order => order.id !== action.payload.id )
            };
        default:
            return state;
    }
}

export default orderReducer;