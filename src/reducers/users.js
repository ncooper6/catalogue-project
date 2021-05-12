import { FETCH_USER, UPDATE_RENTAL }  from '../constants/actionTypes';
//reducers used for global state management and to process the dispatch types
const userReducer = (users = [], action) => {
    switch (action.type){
        case FETCH_USER:
            return action.payload;//fetches users
        case UPDATE_RENTAL:
            return users.map((user) => user._id === action.payload._id ? action.payload : user);//array maps userss where their ID is equal to the updated user ID
        default:
            return users;
    }
}

export default userReducer;