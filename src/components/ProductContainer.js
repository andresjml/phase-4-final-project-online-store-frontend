import React, {useEffect, useState} from 'react'
import { BASE_URL } from '../constraints';
import Product from '../components/Product'

function ProductContainer({user}) {
    const [products, setProducts]=useState(null)

    useEffect(() => {
        fetch(BASE_URL+`/products`)
        .then((response) => {
            if (response.ok) {
            response.json().then((resp) => setProducts(resp));
          }
        });
    }, []);
    
    console.log(products)

    function populateProducts(){
        
        return (products.map(product => <Product key={product.id} product={product}/>))
    }

    return (
        <>
          <h1>Product Container</h1>
          
          <div>{products && populateProducts()}</div>
          
        </>
    )
}

export default ProductContainer
