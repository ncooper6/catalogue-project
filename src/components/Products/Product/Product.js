import React from 'react';
import {Link} from 'react-router-dom';

const Product = ({product, setCurrentId}) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    //layout for a product card within the grid
    return(
        <div className="productCard">
            <img src={product.img} alt={product.title + " product image"}/>
            <h2>{product.title}</h2>
            <p className={`${product.inStock > 0 ? 'inStock': 'noStock'}`}>{product.inStock}  out of {product.allStock}</p>{/*changes class based off of stock number*/}
            <div className="card-btn-wrapper">
                {user?.result?.admin === true ? (//checks for admin as admins can edit the product - different buttons appear for each type of user
                <Link to={`/products/edit/${product._id}`}>
                    <button className='btn' onClick={() => setCurrentId(product._id)}>Edit</button> {/*ID set so unique product can be targetted*/}
                </Link>
                ):(
                    <Link to={`/${product._id}/updateStock`}>
                        <button className='btn' onClick={() => setCurrentId(product._id)}>More Info & Rent</button> {/*ID set so unique product can be targetted*/}
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Product