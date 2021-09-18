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
       return(event.target.value=='All'?  setFilterP(products):  setFilterP(products.filter(p=>p.category_id==event.target.value)));
    }
    
    

    return (
        <div className="container">
          <h1>Products:</h1>
          <select class="form-select" aria-label="Default select example" onChange={handleImputChange} style={{width: '18rem'}}>
                <option value>Select a Category</option>
                <option  name='id' value="All" >All</option>
                {categories&&populateCategories()}
          </select>
          
          <div className="row">{filterP && populateProducts()}</div>
          
          
        </div>
    )
}

export default ProductContainer
