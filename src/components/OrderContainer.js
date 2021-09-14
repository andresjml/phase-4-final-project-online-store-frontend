import React, {useEffect, useState} from 'react'
import Order from './Order'
import { BASE_URL } from '../constraints';
import {Link} from "react-router-dom";

function OrderContainer({user}) {
    const [orders,setOrders]=useState(null)
    

    useEffect(() => {
        fetch(BASE_URL+`/users/${user.id}/orders`)
        .then((response) => {
            if (response.ok) {
            response.json().then((resp) => setOrders(resp));
          }
        });
    }, []);

    
    
    function populateOrders(){
        
        return (orders.map(order => <Order key={order.id} order={order}/>))
    }

    return (
        <>
            <h1>Order container</h1>
            <Link to="/new_order"><button type="button" class="btn btn-outline-primary">Start New Order</button></Link>
            <div>{orders && populateOrders()}</div>
            
        </>
    );
}

export default OrderContainer
