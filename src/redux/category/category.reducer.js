// inmport action types
import { CategoryActionTypes } from './category.type';

// initiate store for categories
const INITIAL_STATE = {
    categories: [{
        id: 1,
        name: "Cakes Rolls",
        description: "",
        image: ""
    },
    {
        id: 2,
        name: "Yema Cakes",
        description: "",
        image: ""
    },
    {
        id: 3,
        name: "Empanada",
        description: "",
        image: ""
    },
    {
        id: 4,
        name: "Breads",
        description: "",
        image: ""
    }]
};

/**
 * Manage states in store by actions
 * @param {*} state initial state
 * @param {*} action action object
 * @returns updated state
 */
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