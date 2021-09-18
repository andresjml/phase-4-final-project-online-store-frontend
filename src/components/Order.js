import React from 'react'
import OrderProduct from '../components/OrderProduct'
import OrderProductPaid from '../components/OrderProductPaid'
import { BASE_URL } from '../constraints'


function Order({order,onEdit, onDelete,onPaid}) {
    
    
    //POPULATE ORDERPRODUCT COMPONENT  PENDING PAYMENT
    function populateOrder(){        
        return(order.order_products.map(item => <OrderProduct key={item.id} item={item} onEdit={onEdit} />))
    }

    //POPULATE ORDERPRODUCT  COMPONENT PAID
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
          
        onDelete(deletedItem)        
    }

    
    return (
        <div className='col'>
        <div class="card" style={{width: '32rem'}}>
            <div class="card-header">
            Order # {order.id}
            </div>
            <div class="card-body">
                <h5 class="card-title">Total Order $ {totalOrder}, Status: {order.paid? 'Completed':'Paid Pending'}</h5>
                <p class="card-text">{order.paid? populateOrderPaid(): populateOrder()}</p>
                {order.paid? null: <button className="btn btn-danger" onClick={onPay}>Pay Order</button>}
                <button className="btn btn-danger" onClick={()=>onDeleteOrder(order)}>Delete Order</button>
            </div>
        </div>
        </div>
    )
}

export default Order
