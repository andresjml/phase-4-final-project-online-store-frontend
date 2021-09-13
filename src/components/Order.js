import React from 'react'

function Order({order}) {
 
  
    

    return (
        <>
            <p>Order # {order.id}</p>
            {
                order.order_products.map(item =>{
                    return (
                        
                        <p>Item: {item.product.name} - Quantity {item.product_qty}- Total{item.product_qty*item.product.price}</p>
                    )
                })
            }
            
        </>
    )
}

export default Order
