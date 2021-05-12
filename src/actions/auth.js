import {AUTH, FETCH_USER, UPDATE_RENTAL} from '../constants/actionTypes';
import * as api from '../api/index';
//front end actions that call the api and then dispatch data to the necessary location using different types
export const signin = (formData, history) => async (dispatch)=> {//signin requires the data from the form
    try {
        const {data} = await api.signIn(formData);//posts the data to the database for verification

        dispatch({type: AUTH, data});//uses dispatch type AUTH

        history.push('/');//history is used to redirect them to the homepage once they have logged in
    } catch (error) {
        console.log(error);
    }
};

export const signup = (formData, history) => async (dispatch)=> {//signin requires the data from the form
    try {
        const {data} = await api.signUp(formData);//posts the data to the database for verification
        
        dispatch({type: AUTH, data});//uses dispatch type AUTH
    
        history.push('/');//history is used to redirect them to the homepage once they have signed up
    } catch (error) {
        console.log(error);
    }
};

export const userRentals = () => async (dispatch) => {//userRentals is a simple FETCH
    try {
        const {data} = await api.getUserRentals();//gets data from the API and then sets it to an object to be dispatched

        dispatch({type: FETCH_USER, payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const updateRentals = (id, rental) => async (dispatch) => {//updating the rentals requires a PATCH 
    try {
        const {data} = await api.updateRentals(id, rental);//also requires an ID so it knows which element to update

        dispatch({type: UPDATE_RENTAL, payload:data});
    } catch (error) {
        console.log(error);
    }
}