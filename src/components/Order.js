import React from 'react'
import OrderProduct from '../components/OrderProduct'
import OrderProductPaid from '../components/OrderProductPaid'
import { BASE_URL } from '../constraints'


function Order({order,onEdit, onDelete,onPaid}) {
    
    //POPULATE ORDERPRODUCT  PENDING PAYMENT
    function populateOrder(){        
        return(order.order_products.map(item => <OrderProduct key={item.id} item={item} onEdit={onEdit} />))
    }

    //POPULATE ORDERPRODUCT  PAID
    function populateOrderPaid(){        
        return(order.order_products.map(item => <OrderProductPaid key={item.id} item={item} />))
    }

    //CALCULATE ORDER TOTAL$ (ARRAY)
    const totalOrder = order.order_products.map(item=>item.product_qty*item.product.price)
        
     function onPay(){
        
        fetch(BASE_URL +`/orders/${order.id}`, {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({paid:true}),
        })
            .then(res => res.json())
            .then(onPaid);   
          
     }   

    
    return (
        <>
        <h2>Order # {order.id} Total $ {totalOrder.flat().reduce((acc,sum)=>acc+sum)} Status {order.paid? 'Paid':'Paid Pending'}</h2>
        <button className="btn btn-danger" onClick={onPay}>Pay Order</button>
        <button className="btn btn-danger" onClick={()=>onDelete(order)}>Delete Order</button>
        {order.paid? populateOrderPaid(): populateOrder()}       
        
        </>
    )
}

export default Order
