import React from 'react'

function Order({order}) {
 
  
    

    return (
        <>
            







            <h2>Order # {order.id}</h2>
            {
                order.order_products.map(item =>{
                    return (                        
                        <div class="card" style={{width: '18rem'}}>
                            <div class="card-header">
                            
                            Item: {item.product.name}
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Quantity {item.product_qty}</li>
                                <li class="list-group-item">Total $ {(item.product_qty*item.product.price)}</li>
                                
                            </ul>
                        </div>
                    )
                })
            }
            
        </>
    )
}

export default Order
