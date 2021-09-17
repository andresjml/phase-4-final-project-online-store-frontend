import React from 'react'
import OrderProduct from '../components/OrderProduct'
import OrderProductPaid from '../components/OrderProductPaid'
import { BASE_URL } from '../constraints'
import {Link} from "react-router-dom"


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
    const totalOrder = order.order_products.map(item=>item.product_qty*item.product.price).reduce((acc,a)=> {return (acc+a)},0)
     
    //CHANGE PAID KEY TO TRUE
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

    //DELETE AN ORDER
    function onDeleteOrder(deletedItem){
        
        fetch(BASE_URL + `/orders/${deletedItem.id}`, {
            method: "DELETE",
        })     
        onDelete(Math.random())        
    }

    
    return (
        <>
        <h2>Order # {order.id} Total $ {totalOrder} Status {order.paid? 'Completed':'Paid Pending'}</h2>
        {order.paid? null: <button className="btn btn-danger" onClick={onPay}>Pay Order</button>}
        
        <button className="btn btn-danger" onClick={()=>onDeleteOrder(order)}>Delete$Order</button>
        {order.paid? populateOrderPaid(): populateOrder()}       
        
        </>
    )
}

export default Order
