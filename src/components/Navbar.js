import React, { useState, useEffect } from 'react';
import {FaSearch, FaAngleDown} from 'react-icons/fa'
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import uclanLogo from '../images/uclan-logo.svg';
import userAvatar from '../images/Avatar.png';
import * as actionType from '../constants/actionTypes';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));//sets the user state to their local storage values
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push('/auth');

    setUser(null);
  };//removes the users token and pushes them to the auth page as they are now logged out

  useEffect(() => {//use effect to set a time out for the users token - of they are logged in for more than an hour they are logged out
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <div className="nav-wrapper">
      <div className="nav-l">
        <Link to="/">
          <img src={uclanLogo} alt="uclan icon" />
        </Link>
      </div>
      <div className="nav-c">
                    {user?.result?.admin === true ? ( //checks if the user is an admin or not and returns a different nav depending on if they are
                      <ul className="links">
                        <li>
                            <Link to="/admin" >Create Products</Link>
                        </li>
                      </ul>
                    ): (  
                    <ul className="links">
                      <li>
                          <Link to="/" >Equipment <span><FaAngleDown/></span></Link>
                      </li>
                      <li>
                          <Link to="/myRentals" >My Rentals</Link>
                      </li>
                      <li>
                          <Link to="/contact" >Contact Us</Link>
                      </li>
                    </ul>
                    )} 
            </div>
      <div className="nav-r">
        <div className="nav-r-inner">
          <input type="text" placeholder="Search..."/>
          <button><FaSearch/></button>
        </div>
        <img src={user ? userAvatar : null} alt={user ? "userAvatar" : null}/>{/* ternary opertor - shows avatar pic depending on if there is a user logged in or not*/}
        {user?.result ? ( 
          <div>
            <button className="btn authBtn" onClick={logout}>Logout</button>
          </div>
        ) : ( //returns sign in or logout based on whether someone is logged in or not
          <Link to="/auth">
            <button className="btn authBtn">Sign In</button>
          </Link>
          )}
      </div>
    </div>
  );
};

export default Navbar;