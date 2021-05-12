import {FETCH_ALL, CREATE, UPDATE, UPDATESTOCK} from '../constants/actionTypes';
import * as api from '../api';

//Action Creators - functions that return an action (type and action)  
export const getProducts = () => async (dispatch) => {
    try {
        const {data} = await api.fetchProducts();

        dispatch({type: FETCH_ALL, payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const createProduct = (product) => async (dispatch) => {
    try {
        const {data} = await api.createProduct(product);

        dispatch({type: CREATE, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const updateProduct = (id, product) => async (dispatch) => {
    try {
        const {data} = await api.updateProduct(id, product);

        dispatch({type: UPDATE, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const updateStock = (id, product) => async (dispatch) => {
    try {
        const {data} = await api.updateStock(id, product);

        dispatch({type: UPDATESTOCK, payload: data});
    } catch (error) {
        console.log(error);
    }
}

