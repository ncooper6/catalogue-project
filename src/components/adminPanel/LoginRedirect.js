import React from 'react'
import {Link} from 'react-router-dom';

var location = window.location.pathname;
const LoginRedirect = () => {
    return (

        <div className="redirect-box">
            <h3>{`${location.includes('/admin') ? 'You need to be an admin to view this section' : 'You need to be logged in to view this section'}`}</h3>
                <Link to="/">
                    <button className="btn" >return home</button>
                </Link>
                <Link to="/auth">
                    <button className="btn" >login</button>
                </Link>
            </div>
    )
}

export default LoginRedirect
