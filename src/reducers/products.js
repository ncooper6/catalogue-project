import {FETCH_ALL, CREATE, UPDATE, UPDATESTOCK} from '../constants/actionTypes';
//reducers used for global state management and to process the dispatch types
const reducers = (products = [], action) => {
    switch (action.type){
        case FETCH_ALL:
            return action.payload;//fetches all the products
        case CREATE:
            return [...products, action.payload];//adds the new product rather than wiping it 
        case UPDATE:
        case UPDATESTOCK:
            return products.map((product)=> product._id === action.payload._id ? action.payload : product);//array maps products where their ID is equal to the updated product ID
            default:
                return products;
    }
}

export default reducers;