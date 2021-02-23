import { ProductActionTypes } from './product.type';

const INITIAL_STATE = {
    products: []
};

const productReducer = ( state = INITIAL_STATE, action ) => {
    switch(action.type) {
        case ProductActionTypes.FETCH_ALL_PRODUCTS:
            return {
                ...state,
                products: action.payload
            };
        case ProductActionTypes.ADD_NEW_PRODUCT:
            return {
                ...state,
                products: state.products.concat(action.payload)
            };
        case ProductActionTypes.EDIT_PRODUCT:
            return {
                ...state,
                products: state.products.map( product => ( product.id === action.payload.id) ? action.payload : product )
            };
        case ProductActionTypes.DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter( product => product.id !== action.payload.id)
            };
        default:
            return state;
    }
}

export default productReducer;