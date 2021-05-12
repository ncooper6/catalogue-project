import axios from 'axios';

//const url = 'https://catalogue-project.herokuapp.com/';
//API calls using axios to interact with the backend
const API = axios.create({ baseURL: 'https://catalogue-project.herokuapp.com' }); //used to aid with switching between local host and hosting 

API.interceptors.request.use((req) => {//happens on each request
    if (localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }//sends the token to backend so it can verify if the user is logged in.

    return req;
});


export const fetchProducts = () => API.get('/products');//gets the product
export const createProduct = (newProduct) => API.post('/products', newProduct);//post call
export const updateProduct = (id, updatedProduct) => API.patch(`/products/${id}`, updatedProduct);//patch call requires ID and the new data
export const updateStock = (id, updateStock) => API.patch(`/products/${id}/updateStock`, updateStock);//patch call requires ID and the new data

export const getUserRentals = () => API.get('/user');//gets the user 
export const updateRentals = (id, updatedRental) => API.patch(`/user/${id}/updateRentals`, updatedRental);//patch call requires ID and the new data
export const signIn = (formData) => API.post('/user/signin', formData);//post the sign in data
export const signUp = (formData) => API.post('/user/signup', formData);//post the sign up data