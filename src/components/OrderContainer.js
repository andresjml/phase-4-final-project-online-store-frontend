import React, {useEffect, useState} from 'react'
import Order from './Order'
import { BASE_URL } from '../constraints';
import {Link} from "react-router-dom";

function OrderContainer({user,onClickNewOrder}) {
    const [orders,setOrders]=useState(null)
    const [onEditItem, setOnEditItem]=useState()

    useEffect(() => {
        fetch(BASE_URL+`/users/${user.id}/orders`)
        .then((response) => {
            if (response.ok) {
            response.json().then((resp) => setOrders(resp));
          }
        });
    }, [onEditItem]);

    function onEdit(editedItem){
        setOnEditItem(editedItem)
    }

    function onDelete(deletedItem){
        console.log(deletedItem)
        fetch(BASE_URL + `/orders/${deletedItem.id}`, {
            method: "DELETE",
        })     
        setOnEditItem(1)
        
    }

    
    
    function populateOrders(){
        
        return (orders.map(order => <Order key={order.id} order={order} onEdit={onEdit} onDelete={onDelete}/>))
    }

    return (
        <>
            <h1>Order container</h1>
            <Link to="/new_order"><button type="button" class="btn btn-outline-primary" onClick={onClickNewOrder}>Start New Order</button></Link>
            <div>{orders && populateOrders()}</div>
            
        </>
    );
}

export default OrderContainer
