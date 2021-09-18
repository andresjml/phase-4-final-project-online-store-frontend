import React, {useEffect, useState} from 'react'
import { BASE_URL } from '../constraints';

function CategoryNavBar() {
    const [categories, setCategories]=useState(null)
    const [products, setProducts]=useState({})
    const [newItem, setNewItem]=useState({id: ""})

    //FETCH CATEGORIES
    useEffect(() => {
        fetch(BASE_URL+`/categories`)
        .then((response) => {
            if (response.ok) {
            response.json().then((resp) => setCategories(resp));
          }
        });
    }, []);

    //FETCH PRODUCTS
    useEffect(() => {
        fetch(BASE_URL+`/products`)
        .then((response) => {
            if (response.ok) {
            response.json().then((resp) => setProducts(resp));
          }
        });
    }, []);

     

    function handleCategoryChange(event){
        setNewItem({
            ...newItem, 
            [event.target.name]:event.target.value
        })

        fetch(BASE_URL+`/categories/${event.id}`)
            .then(r=>r.json())
            .then(setProducts)
    }

    
    //POPULATE CATEGORIES FOR INPUT FORM
    function populateCategories(){        
        return (categories.map(category => <option key={category.id} name='id' value={category.id} >{category.name}</option>))
    }

    //POPULATE PRODUCTS
    function populateProducts(){
        
        return (products.products.map(product => <Product key={product.id} product={product} />))
    }

    return (
        <>
            <select class="form-select" aria-label="Default select example" onChange={handleCategoryChange}>
                <option selected>Open this select menu</option>
                {categories&&populateCategories()}
            </select>
            {products && populateProducts()}
        </>
    )
}

export default CategoryNavBar
