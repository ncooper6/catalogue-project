import React, {useState, useEffect} from 'react';
import FileBase64 from 'react-file-base64';
import {useDispatch, useSelector} from 'react-redux';
import {createProduct, updateProduct} from '../../actions/products';

const Form = ({currentId, setCurrentId}) => {
    const [productData, setProductData] = useState({title:'',type:'',allStock:'',inStock:'',img:'',desc:'',uid:'',rented:'', returnDate:''});//default state for user input
    const product = useSelector((state)=> currentId ? state.products.find((p)=>p._id ===currentId): null); //used for the edit function will find if product already exists
    const dispatch = useDispatch();

    useEffect(()=>{
        if(product) setProductData(product);
    },[product])//set the product data to the product if it already exists

    const handleSubmit = (e) => {
        e.preventDefault();//prevents page reloading on submit
        
        if(currentId) {//if their is an existing ID update the product
            dispatch(updateProduct(currentId, productData));
            console.log('Sent for update');
        } else {// else no ID create a new product
            dispatch(createProduct(productData));
        }
        console.log(productData);
        clear();//clears the inputs so another product can be created easily 
    }

    const clear = () => {//clears the inputs so another product can be created easily 
        setCurrentId(null);
        setProductData({title:'',type:'',allStock:'',inStock:'',img:'',desc:'',uid:'',rented:'',returnDate:''});
    }

    var location = window.location.pathname;

    return (
        <div className='adminEditContainer'>
        <h3>{`${location.includes('/admin') ? 'Create New Product' : 'Edit Product Here'}`}</h3> {/*uses the url location to determine what to show*/}
        <form onSubmit={handleSubmit} className="edit-form">
            <label htmlFor="title">Title:
                <input type="text" name="title" value={productData.title} onChange={(e)=> setProductData({...productData, title: e.target.value})}/>
            </label>{/*On Change inputs set the state to the current input*/}
            <label htmlFor="type">Type:
                <input type="text" name="type" value={productData.type} onChange={(e)=> setProductData({...productData, type: e.target.value})}/>
            </label>
            <label htmlFor="allStock">Total Stock:
                <input type="number" name="allStock" value={productData.allStock} onChange={(e)=> setProductData({...productData, allStock: e.target.value})}/>
            </label>
            <label htmlFor="inStock">In Stock:
                <input type="number" name="inStock" value={productData.inStock} onChange={(e)=> setProductData({...productData, inStock: e.target.value})}/>
            </label>
            <label htmlFor="img">Product Image:
                <FileBase64 type="file" name="img" multiple={false} onDone={({base64})=> setProductData({...productData, img: base64})}/>
            </label>
            <label htmlFor="desc">Description:
                <input type="text" name="desc" value={productData.desc} onChange={(e)=> setProductData({...productData, desc: e.target.value})}/>
            </label>
            <label htmlFor="uid">Product ID (Comma Separated):
                <input type="text" name="uid" value={productData.uid} onChange={(e)=> setProductData({...productData, uid: e.target.value.split(',')})}/>
            </label>
            <label htmlFor="rented">Is it on rent?(Comma Separated): 
                <input type="text" name="rented" value={productData.rented} onChange={(e)=> setProductData({...productData, rented: e.target.value.split(',')})}/>
            </label>
            <label htmlFor="returnDate">Return Date(Comma Separated):
                <input type="text" name="returnDate" value={productData.returnDate} onChange={(e)=> setProductData({...productData, returnDate: e.target.value.split(',')})}/>
            </label>
            <input className="form-btn" type="submit" value="submit"/>
        </form>
        </div>
    )
}

export default Form;