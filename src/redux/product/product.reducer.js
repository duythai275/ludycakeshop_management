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
        default:
            return state;
    }
}

export default productReducer;