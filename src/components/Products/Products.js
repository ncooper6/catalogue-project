import React from 'react';
import {useSelector} from 'react-redux';
import { useGlobalContext } from '../../context';
import Product from './Product/Product';

const Products = ({setCurrentId}) => { //used to display all the products of a certain type which is determined by the sidebar component
    const products = useSelector((state) => state.products);
    const {catalogueType} = useGlobalContext();
    const filteredProducts = products.filter((products)=> products.type === catalogueType);//filters so the products are of the same type selected on the sidebar 

    return (
        !products.length ? <h2>Loading...</h2> : (
            <div className="catalogueWrapper">
                <div className="catalogueGrid">
                    {filteredProducts.map((product) => (//array map to display every product
                        <div key={product._id}>
                            <Product product={product} setCurrentId={setCurrentId}/>
                        </div>
                    ))}
                </div>
            </div>
        )
    )
}

export default Products;