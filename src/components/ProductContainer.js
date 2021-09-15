import React, {useEffect, useState} from 'react'
import { BASE_URL } from '../constraints';
import Product from '../components/Product'
import {Link} from "react-router-dom";


function ProductContainer({onClickNewOrder}) {
    const [products, setProducts]=useState(null)

    useEffect(() => {
        fetch(BASE_URL+`/products`)
        .then((response) => {
            if (response.ok) {
            response.json().then((resp) => setProducts(resp));
          }
        });
    }, []);


    
    

    function populateProducts(){
        
        return (products.map(product => <Product key={product.id} product={product} />))
    }

    return (
        <>
          <h1>Product Container</h1>
          <Link to="/new_order"><button type="button" class="btn btn-outline-primary" onClick={onClickNewOrder}>Start New Order</button></Link>
          <div>{products && populateProducts()}</div>
          
        </>
    )
}

export default ProductContainer
