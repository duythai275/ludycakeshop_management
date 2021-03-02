import { CategoryActionTypes } from './category.type';

const INITIAL_STATE = {
    categories: []
};

const categoryReducer = ( state = INITIAL_STATE, action ) => {
    switch (action.type) {
        case CategoryActionTypes.FETCH_ALL_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            };
        case CategoryActionTypes.ADD_NEW_CATEGORY:
            return {
                ...state,
                categories: state.categories.concat(action.payload)
            };
        case CategoryActionTypes.EDIT_CATEGORY:
            return {
                ...state,
                categories: state.categories.map( catgory => ( catgory.id === action.payload.id) ? action.payload : catgory )
            };
        case CategoryActionTypes.DELETE_CATEGORY:
            return {
                ...state,
                categories: state.categories.filter( catgory => catgory.id !== action.payload.id)
            };
        default:
            return state;
    }
}

export default categoryReducer;