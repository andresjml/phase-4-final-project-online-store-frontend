import React, {useEffect, useState} from 'react'
import { BASE_URL } from '../constraints';
import Product from '../components/Product'


function ProductContainer() {
    const [products, setProducts]=useState(null)
    const [filterP, setFilterP]=useState(null)
    const [categories, setCategories]=useState(null)
   


    //FETCH PRODUCTS
    useEffect(() => {
        fetch(BASE_URL+`/products`)
        .then((response) => {
            if (response.ok) {
            response.json().then(setProducts);
          }
        });
    }, []);

    

    //FETCH CATEGORIES
    useEffect(() => {
        fetch(BASE_URL+`/categories`)
        .then((response) => {
            if (response.ok) {
            response.json().then((resp) => setCategories(resp));
          }
        });
    }, []);

    
    


    //POPULATE CATEGORIES FOR INPUT FORM
    function populateCategories(){               
        return (categories.map(category => <option key={category.id} value={category.id} >{category.name}</option>))
    }  
    //POPULATE PRODUCTS
    function populateProducts(){             
        return (filterP.map(product => <Product key={product.id} product={product} />))        
    }
    //HANDLE FILTER CHANGE
    function handleImputChange(event){  
        console.log(event.target.value)     
       return(event.target.value=='All'?  setFilterP(products):  setFilterP(products.filter(p=>p.category_id==event.target.value)));
    }
    
    console.log(filterP)

    return (
        <>
          <h1>Product Container</h1>
          <select class="form-select" aria-label="Default select example" onChange={handleImputChange}>
                <option value>Select a Category</option>
                <option  name='id' value="All" >All</option>
                {categories&&populateCategories()}
          </select>
          
          <div>{filterP && populateProducts()}</div>
          
          
        </>
    )
}

export default ProductContainer
