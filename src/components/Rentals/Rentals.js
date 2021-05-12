import React from 'react'
import {useSelector} from 'react-redux';
import LoginRedirect from '../adminPanel/LoginRedirect';

const Rentals = () => {
    const user = JSON.parse(localStorage.getItem('profile'));//sets the user = to their local storage profile
    const users = useSelector((state) => state.users);//gets user state
    const filteredRentals = users.filter((users)=> users._id === user?.result?._id);//filters results to where the users local profile ID is = to their stored ID

    if(!user){
        return (
            <LoginRedirect />
        )
    } else {
    return (
        !users.length ? <h2>Loading...</h2> : ( //checks there is any users returned - shows loading if no users are found yet
            <div className="rentalContainer">
                {filteredRentals.map((user) => ( //maps the filtered users
                    <div key={user._id} className="rentalGrid">
                        <div className="rentalItem">
                        <h2>Product:</h2>
                            {user.rentedProducts.map((rented)=> (//maps a sub array to show the products the user has rented
                                <div key={rented._id}>
                                    <h3>
                                    {rented}
                                    </h3>
                                    {console.log(rented)}
                                </div>
                            ))}
                        </div> 
                        <div className="rentalItem">
                            <h2>Units Rented:</h2>
                            {user.numberOfProducts.map((rented)=> (//maps a sub array to show the number of products the user has rented
                                <div key={rented._id}>
                                    <h3>
                                    {rented}
                                    </h3>
                                    {console.log(rented)}
                                </div>
                            ))}
                        </div>
                    </div>
            ))} 
            
            </div>

));
                            }
                } 

export default Rentals;
