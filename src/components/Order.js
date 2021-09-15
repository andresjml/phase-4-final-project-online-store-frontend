import React, {useState} from 'react'
import OrderProduct from '../components/OrderProduct'


function Order({order,onEdit}) {
    const[total, setTotal]=useState([])

    function populateOrder(){        
        return(order.order_products.map(item => <OrderProduct key={item.id} item={item} onEdit={onEdit} />))
    }

    
    const totalOrder = order.order_products.map(item=>item.product_qty*item.product.price)
        
    

    
    return (
        <>
        <h2>Order # {order.id}</h2>
        {populateOrder()}       
        <p className="card-header">Total Order $ {totalOrder.flat().reduce((acc,sum)=>acc+sum)}</p>
        </>
    )
}

export default Order
