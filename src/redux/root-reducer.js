// import node_modules
import { combineReducers } from 'redux';

// import reducers
import categoryReducer from './category/category.reducer';
import productReducer from './product/product.reducer';
import orderReducer from './order/order.reducer';

// combine reducers to one for Redux Store
export default combineReducers({
    category: categoryReducer,
    product: productReducer,
    order: orderReducer
});