import React from 'react'

function Product({product}) {
    return (
        <>
            <div className="card" style={{width: '18rem'}}>
                <img src={product.img_url} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text">{product.price}</p>
                    <p className="card-text">{product.category.name}</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </>
    )
}

export default Product
