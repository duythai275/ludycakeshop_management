import { combineReducers } from 'redux';

import categoryReducer from './category/category.reducer';
import productReducer from './product/product.reducer';
import weightTypeReducer from './weightType/weightType.reducer';
import orderReducer from './order/order.reducer';

export default combineReducers({
    category: categoryReducer,
    product: productReducer,
    weightType: weightTypeReducer,
    order: orderReducer
});