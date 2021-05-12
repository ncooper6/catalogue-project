import React from 'react';
import Form from '../Form/Form';
import LoginRedirect from './LoginRedirect';
//admin panel used to create and edit products

const AdminPanel = (currentId, setCurrentId) => {
    const user = JSON.parse(localStorage.getItem('profile'));

    if(user?.result?.admin === true) {//checks if a user is an admin or not and provides a way home if they are not
    return (
        <div className="home-wrapper">
            <Form className="admin-panel" currentId={currentId} setCurrentId={setCurrentId}/>
        </div>
    )} else {
        return(
            <LoginRedirect />
        )
    }
}

export default AdminPanel
