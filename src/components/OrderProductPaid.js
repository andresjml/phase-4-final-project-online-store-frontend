import React from 'react'


function OrderProductPaid({item}) { 
    return (            
        <div className="card" style={{width: '30rem'}}>
            <div className="card-header">
                {item.product.name}/  Qty: {item.product_qty} / Price$: {item.product.price} / Total Price$ {item.product_qty*item.product.price}
                            
            </div>            
        </div>
    )
}

export default OrderProductPaid
