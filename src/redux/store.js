// import node_modules
import { createStore } from 'redux';
import rootReducer from './root-reducer';

// create Store for entire app
const store = createStore(rootReducer);

export default store;