import React from 'react';
import {useSelector} from 'react-redux';

const SingleProduct = ({currentId}) => {//used to display a singular product which can then be booked with the booking component
    const products = useSelector((state) => state.products);
    const filteredProducts = products.filter((products)=> products._id === currentId); 

    return (
        !products.length ? <h2>Loading...</h2> : (
            <div>
                    {filteredProducts.map((product) => (//array maps the specific product the user is looking for
                        <div key={product._id} className='booking-content-wrap'>
                            <div className='booking-image'><img src={product.img} alt={product.title + " product image"}/></div>
                            <div className='booking-content'>
                                <h2>{product.title}</h2>
                                Type:<h3>{product.type}</h3>
                                Description:<p>{product.desc}</p>
                                <p className={`${product.inStock > 0 ? 'inStock': 'noStock'}`}>{product.inStock}  out of {product.allStock} in stock</p>
                            </div>
                        </div>
                    ))}
            </div>
        )
    )
}

export default SingleProduct;