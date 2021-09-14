import React from 'react'
import OrderProduct from '../components/OrderProduct'


function Order({order}) {

    function populateOrder(){
        
        return(order.order_products.map(item => <OrderProduct key={item.id} item={item} />))
    }
    
    return (
        <>
        <h2>Order # {order.id}</h2>
        {populateOrder()}       
        <p className="card-header">Total Order $ {0}</p>
        </>
    )
}

export default Order
