import React from 'react'
import {Link} from 'react-router-dom'
import './ProductCard.css'

export default function ProductCard({product}) {
    const {id, name, price, description, imageUrl} = product;
    return (
        <article className="product-card">
            <Link to={`/products/${id}`} className="product-link" >
                <img className="image" src={imageUrl} alt={name} loading={'lazy'}/>
                <h3 className="name">{name}</h3>
            </Link>
            <p className="description">{description}</p>
            <p className="price">${price}</p>
        </article>
    )
}
