import React from 'react'
import {Link} from 'react-router-dom'
import './ProductCard.css'

export default function ProductCard({product}) {
    const {productid, name, price, description, image_url} = product;
    return (
        <article className="product-card">
            <Link to={`/products/${productid}`} className="product-link" >
                <img className="image" src={image_url} alt={name} loading={'lazy'}/>
                <h3 className="name">{name}</h3>
            </Link>
            <p className="description">{description}</p>
            <p className="price">${price}</p>
        </article>
    )
}
