import React, {useEffect, useState} from 'react'
import { BASE_URL } from '../constraints/index';
import {Link} from "react-router-dom";

function NewOrder({order}) {
    const [products, setProducts]=useState(null)
    const [orderProducts, setOrderProducts]=useState(false)
    const [newItem, setNewItem]=useState({product_id: "", product_qty: ""})
    const [updateState, setUpdateState]=useState()
    
        
    
    //FETCH PRODUCTS
    useEffect(() => {
        fetch(BASE_URL+`/products`)
        .then((response) => {
            if (response.ok) {
            response.json().then((resp) => setProducts(resp));
          }
        });
    }, [updateState]);

    //HANDLE INPUT CHANGE
    function handleInputChange(event) {
        setNewItem({
            ...newItem, 
            [event.target.name]:event.target.value
        })        
    } 

    //CREATE A NEW ORDERPRODUCT ITEM
    function handleSubmit(e){
        e.preventDefault()
        const itemToCreate = {            
            order_id: order.id,
            product_id: newItem.product_id,
            product_qty: newItem.product_qty
        }
        

        fetch(BASE_URL +`/order_products`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(itemToCreate),
        })
          .then(res => res.json())
          .then(setUpdateState); 

        setNewItem({product_qty: ""})
        setProducts(null)
        //setUpdateState(!updateState)//TO UPDATE PRODUCT FETCH

        fetch(BASE_URL+`/users/${order.user_id}/orders/${order.id}`)
        .then((response) => {
            if (response.ok) {
            response.json().then((resp) => setOrderProducts(resp));
        }
        });  
    } 

    
    //DELETE ORDER
    function onDelete(deletedOrder){
        fetch(BASE_URL + `/orders/${deletedOrder.id}`, {
            method: "DELETE",
        })
    }

    //POPULATE PRODUCTS FOR INPUT FORM
    function populateProducts(){        
        return (products.map(product => <option key={product.id} value={product.id} >{product.name} // Unit Price {product.price}</option>))
    }

    //POPULATE PRODUCTS FOR DISPLAY
    function populateProductsDisplay(){        
        return (orderProducts.order_products.map(product => <li key={product.id} ><h4>{product.product.name}</h4><p>Qty: {product.product_qty}//Price $: {product.product.price}</p></li>))
    }

    

    return (
        <div>
            <h1>Order # {order.id}</h1>
            <form onSubmit={handleSubmit} style={{width: '32rem'}} >
                <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" name='product_id' onChange={handleInputChange}>
                    <option >Select Item</option>
                    {products&&populateProducts()}
                </select>
                <div className="col-5 pt-2" style={{width: '8rem'}}>
                            Product Quantity: 
                            <input
                                className="form-control"
                                type="text"
                                name="product_qty"
                                value={newItem.product_qty}
                                placeholder="Quantity"
                                onChange={handleInputChange}
                            />
                            
                </div>
                <div className="col-5 pt-2">
                    <button type="submit" className="btn btn-success">
                        Add to Order
                    </button>                        
                </div>
            </form>
            <div className="col-5 pt-2">
            <h3>Items</h3>
            <ul>
            {orderProducts&&populateProductsDisplay()}
            </ul>
            <Link to="/products"><button className="btn btn-danger" onClick={()=>onDelete(order)}>Cancel Order</button></Link>
            <Link to="/orders"><button className="btn btn-danger" >Review Orders</button></Link>
            </div>
                        
        </div>
    )
}

export default NewOrder
