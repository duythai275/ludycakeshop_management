import { ProductCategoryActionTypes } from './productCategory.type';

const INITIAL_STATE = {
    productCategories: []
};

const productCategoryProducer = ( state = INITIAL_STATE, action ) => {
    switch ( action.type ) {
        case ProductCategoryActionTypes.FETCH_ALL_PRODUCTCATEGORIES:
            return {
                ...state,
                productCategories: action.payload
            };
        default: 
            return state;
    }
}

export default productCategoryProducer;