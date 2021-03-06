import React from 'react'

function Product({product}) {
    


    return (
        <>
            
            <div className="card col-6 col-md-4 m-2 shadow p-3 mb-5 bg-body rounded" style={{width: '18rem'}}>
                <img src={product.img_url} className="card-img-top m-2" alt={product.name}/>
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">Product Description :{product.description}</p>
                    <p className="card-text">Price$: {product.price}</p>
                    <p className="card-text">Category: {product.category.name}</p>
                    
                </div>
            </div>           

        </>
    )
}

export default Product
