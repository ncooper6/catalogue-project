import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {getProducts} from './actions/products';
import {userRentals} from './actions/auth';

import SingleProduct from './components/Products/SingleProduct';
import Products from './components/Products/Products';
import Form from './components/Form/Form';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Booking from './components/Booking/Booking';
import Rentals from './components/Rentals/Rentals';
import Auth from './components/Auth/Auth';
import AdminPanel from './components/adminPanel/adminPanel';

const App = () => {
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getProducts());
        dispatch(userRentals());
    },[currentId, dispatch]);//useEffect so products and user rented items are fetched whenever the page is loaded and also when currentID changes
    return(//react-router-dom used so pages can easily be changed
        <>
        <Router>
            <Navbar />
            <Switch>
                <Route exact path="/">
                    <div className="home-wrapper">
                        <Sidebar />
                        <Products setCurrentId={setCurrentId}/>
                    </div>
                </Route>
                <Route path="/admin">
                    <AdminPanel setCurrentId={setCurrentId} currentId={currentId}/>
                </Route>
                <Route path={`/products/edit/:id`}>
                    <div className="home-wrapper">
                    <Form className="edit-panel" currentId={currentId} setCurrentId={setCurrentId}/>
                    </div>
                </Route>
                <Route path={`/:id/updateStock`}>
                    <div className="booking-wrapper">
                        <SingleProduct currentId={currentId}/>
                        <Booking currentId={currentId} setCurrentId={setCurrentId} />
                    </div>
                </Route>
                <Route path="/myRentals">
                    <Rentals />
                </Route>
                <Route path="/auth">
                    <Auth />
                </Route>
            </Switch>
        </Router>
        </>
    )
}

export default App;