import * as actionType from '../constants/actionTypes';
//reducers used for global state management and to process the dispatch types
const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case actionType.AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));//assigns the users profile a token and the stored data 

            return { ...state, authData: action.data, loading: false, errors: null };
        case actionType.LOGOUT:
            localStorage.clear();//clears the user profile once theyve logged out.

            return { ...state, authData: null, loading: false, errors: null };
        default:
        return state;
    }
};

export default authReducer;
