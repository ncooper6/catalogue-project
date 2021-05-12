import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {updateStock} from '../../actions/products';
import {updateRentals} from '../../actions/auth';

const Booking = ({currentId}) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const users = useSelector((state) => state.users);
    const filteredRentals = users.filter((users)=> users._id === user?.result?._id);

    const rentedArr = filteredRentals[0].rentedProducts;
    const numbArr = filteredRentals[0].numberOfProducts;


    const [productData, setProductData] = useState({inStock:0, rented:'', returnDate:'', unitsRented: 0});
    const [userRental, setUserRental] = useState({rentedProducts:'empty', numberOfProducts:0});
    const [newRental, setNewRental] = useState({rentedProducts:rentedArr, numberOfProducts:numbArr});
    const product = useSelector((state)=> currentId ? state.products.find((p)=>p._id === currentId): null);
    const dispatch = useDispatch();

    const userID = user?.result?._id;
    
    useEffect(()=>{
        if(product) setProductData(product);
        
    },[product])
    
    useEffect(()=>{
        const newRented = rentedArr.concat(userRental.rentedProducts);
        const newNumb = numbArr.concat(userRental.numberOfProducts);
        setNewRental({...newRental, numberOfProducts: newNumb, rentedProducts: newRented});
    },[userRental])
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(currentId){
            dispatch(updateStock(currentId, productData));
            dispatch(updateRentals(userID, newRental));
        } else {
            console.log('No product found');
        } clear();
    }
    
    const clear = () =>{
        setProductData({inStock:0,rented:'', returnDate:'',unitsRented: 0});
        setUserRental({rentedProducts:'', numberOfProducts:1})
    }
    const changeHandler = (e) => {
        setUserRental({...userRental, numberOfProducts: e.target.value, rentedProducts: product.title});
        setProductData({...productData, unitsRented: e.target.value});
    }
    return(
        <div className='booking-panel-wrap'>
            <h3>Book an Item</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="inStock">Units Required:
                    <input type="number" required min="0" name="inStock" value={productData.unitsRented} onChange={(e) => changeHandler(e)}/>
                </label>
                <button type="submit" className='btn-white'>Submit</button>
            </form>
        </div>
    )
    
}

export default Booking;