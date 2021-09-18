import React,{useState} from 'react'
import { BASE_URL } from '../constraints'

function OrderProduct({item,onEdit}) {
    const [newItem, setNewItem]=useState({...item})
    const [toggle, setToggle]=useState(false)
    

    function handleEditClick(){
        setToggle(!toggle)
    }  

    //UPDATE ORDER ITEM QUANTITY
    function handleInputChange(event) {
        setNewItem({
            ...newItem, 
            [event.target.name]:event.target.value
        })
        
    }

    function handleSubmit(e){
        e.preventDefault()
        const itemToUpdate = {            
            product_qty: newItem.product_qty
        }

        fetch(BASE_URL +`/order_products/${newItem.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(itemToUpdate),
        })
          .then(res => res.json())
          .then(setNewItem);
           
        setToggle(false)
        onEdit(newItem)  
    }    

   //DELETE ITEM
   function handleDeleteClick(deletedItem){
        fetch(BASE_URL + `/order_products/${deletedItem.id}`, {
            method: "DELETE",
        })     
        onEdit(deletedItem)        
        setToggle(!toggle);
    }

     

    return (
        <> 
             
        <div className="card" style={{width: '30rem'}}>
            <div className="card-header">
                {newItem.product.name}/  Qty: {newItem.product_qty} / Price$: {newItem.product.price} / Total Price$ {newItem.product_qty*newItem.product.price}
                <button type="button" className="btn btn-outline-primary btn-sm m-2" onClick={handleEditClick}>Edit</button>                
            </div>            
        </div>
        

        {toggle &&(
            <>
                <form onSubmit={handleSubmit} >
                    <div className="form-row">
                        <div className="col-5 pt-2">
                            Product Quantity: 
                            <input
                                className="form-control"
                                type="text"
                                name="product_qty"
                                value={newItem.product_qty}
                                placeholder="Title"
                                onChange={handleInputChange}
                            />
                        </div>
                        
                        
                        <div className="col-5 pt-2">
                        <button type="submit" className="btn btn-success">
                            Submit!
                        </button>
                        </div>
                        
                        <div className="col-5 pt-2">
                        
                        </div>
                    </div>
                </form>
                <button className="btn btn-danger" onClick={()=>handleDeleteClick(item)}>
                        Delete
                </button>
            </>)}    
        
        </>
    )
}

export default OrderProduct
