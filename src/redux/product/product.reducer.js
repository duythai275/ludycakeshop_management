// inmport action types
import { ProductActionTypes } from './product.type';

// initiate store for product
const INITIAL_STATE = {
    products: [{ 
        id: 1,
        name: "Pandesal",
        price: 3.75,
        image: "PinoyPandesal",
        category: {
            id: 1
        }
    },
    { 
        id: 2,
        name: "Spanish Bread",
        price: 3.75,
        image: "SpanishBread",
        category: {
            id: 1
        }
    },
    { 
        id: 3,
        name: " Pande-ube Bread",
        price: 3.75,
        image: "",
        category: {
            id: 1
        }
    },
    { 
        id: 4,
        name: " Pande-coco Bread ",
        price: 3.75,
        image: "PandeCoco",
        category: {
            id: 1
        }
    },
    { 
        id: 5,
        name: " Ube Flower Bread",
        price: 3.75,
        image: "UbeFlower",
        category: {
            id: 1
        }
    },    
    { 
        id: 6,
        name: "Pande-Pula",
        price: 3.75,
        image: "",
        category: {
            id: 1
        }
    },
    { 
        id: 7,
        name: "Pande-Hopia ",
        price: 3.75,
        image: "",
        category: {
            id: 1
        }
    },
    { 
        id: 8,
        name: "Ube Cheese Pandesal",
        price: 3.75,
        image: "UbeCheesePandesal",
        category: {
            id: 1
        }
    },
    { 
        id: 9,
        name: "Pineapple Slice Bread",
        price: 3.75,
        image: "",
        category: {
            id: 1
        }
    },
    { 
        id: 10,
        name: "Ensaymada Cheese",
        price: 2.70,
        image: "Ensaymada",
        category: {
            id: 1
        }
    },
    { 
        id: 11,
        name: " Ensaymada Ube",
        price: 2.70,
        image: "",
        category: {
            id: 1
        }
    },
    { 
        id: 12,
        name: "Pandesal with Malunggay (Moringa Leaf)",
        price: 3.75,
        image: "",
        category: {
            id: 1
        }
    },
    { 
        id: 13,
        name: "Whole wheat Pandesal",
        price: 3.75,
        image: "",
        category: {
            id: 1
        }
    },
    { 
        id: 14,
        name: "Tasty Loaf Bread",
        price: 3.75,
        image: "",
        category: {
            id: 1
        }
    },
    { 
        id: 15,
        name: "Cheese Bread",
        price: 3.75,
        image: "",
        category: {
            id: 1
        }
    },
    { 
        id: 16,
        name: "Ensaymada Cupcakes",
        price: 5.90,
        image: "",
        category: {
            id: 1
        }
    },
    { 
        id: 17,
        name: "Cream Cheesebun",
        price: 3.75,
        image: "",
        category: {
            id: 1
        }
    },
    { 
        id: 18,
        name: "Vanila Cake Rolls",
        price: 12.45,
        image: "VanillaCakeRolls",
        category: {
            id: 2
        }
    },
    { 
        id: 19,
        name: "Mango Cake Rolls",
        price: 12.45,
        image: "MangoCakeRolls",
        category: {
            id: 2
        }
    },
    { 
        id: 20,
        name: "Mocha Cake Rolls",
        price: 12.45,
        image: "",
        category: {
            id: 2
        }
    },
    { 
        id: 21,
        name: "Ube Macapuno Cake Rolls",
        price: 13.90,
        image: "UbeCakeRolls",
        category: {
            id: 2
        }
    },
    { 
        id: 22,
        name: "Pandan Macapuno Cake Rolls",
        price: 12.45,
        image: "",
        category: {
            id: 2
        }
    },
    { 
        id: 23,
        name: "Yema Custard Cake",
        price: 9.25,
        image: "YemaCustardCake",
        category: {
            id: 3
        }
    },
    { 
        id: 24,
        name: "Ube Yema Cakes",
        price: 9.25,
        image: "YemaUbeCustardCake",
        category: {
            id: 3
        }
    },
    { 
        id: 25,
        name: "Tres Leche Cake",
        price: 9.25,
        image: "",
        category: {
            id: 3
        }
    },
    { 
        id: 31,
        name: "Yema Custard Cake",
        price: 9.25,
        image: "YemaCustardCake",
        category: {
            id: 3
        }
    },
    { 
        id: 32,
        name: "Ube Yema Cakes",
        price: 9.25,
        image: "YemaUbeCustardCake",
        category: {
            id: 3
        }
    },
    { 
        id: 33,
        name: "Tres Leche Cake",
        price: 9.25,
        image: "",
        category: {
            id: 3
        }
    },
    { 
        id: 26,
        name: "Empanada Chicken",
        price: 5.10,
        image: "ChickenEmpanada",
        category: {
            id: 4
        }
    },
    { 
        id: 27,
        name: "Sansrival Small",
        price: 2.00,
        image: "",
        category: {
            id: 4
        }
    },
    { 
        id: 28,
        name: " Sansrival Large",
        price: 12.30,
        image: "",
        category: {
            id: 4
        }
    },
    { 
        id: 29,
        name: " Sylvannas Small",
        price: 2.00,
        image: "",
        category: {
            id: 4
        }
    },
    { 
        id: 30,
        name: "Brazo de Mercedes",
        price: 12.30,
        image: "",
        category: {
            id: 4
        }
    }]
};

/**
 * Manage states in store by actions
 * @param {*} state initial state
 * @param {*} action action object
 * @returns updated state
 */
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