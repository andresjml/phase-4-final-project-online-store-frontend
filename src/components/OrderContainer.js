import React, {useEffect, useState} from 'react'
import Order from './Order'
import { BASE_URL } from '../constraints';
import {Link} from "react-router-dom";

function OrderContainer({user,onClickNewOrder}) {
    const [orders,setOrders]=useState(null)
    const [updateState, setUpdateState]=useState()

    //READ ORDERS OF A SPECIFIC USER
    useEffect(() => {
        fetch(BASE_URL+`/users/${user.id}/orders`)
        .then((response) => {
            if (response.ok) {
            response.json().then((resp) => setOrders(resp));
          }
        });
    }, [updateState]);

    //UPDATE STATE ON EDIT ORDERPRODUCT ITEM
    function onEdit(editedItem){
        setUpdateState(editedItem)
    }

    

    //POPULATE ORDERS    
    function populateOrders(){        
        return (orders.map(order => <Order key={order.id} order={order} onEdit={onEdit} onDelete={setUpdateState} onPaid={setUpdateState} />))
    }

    return (
        <div className='container'>
            <h1>Orders</h1>
            <Link to="/new_order"><button type="button" class="btn btn-outline-primary" onClick={onClickNewOrder}>Start New Order</button></Link>
            <div className='row'>{orders && populateOrders()}</div>
            
        </div>
    );
}

export default OrderContainer
