import React from 'react'
import './ProductCard.css'

export default function ProductCard({product}) {
    const {name, price, description, imageURL} = product;
    return (
        <article className="product-card">
        <img className="image" src={imageURL} alt={name} loading={'lazy'}/>
        <h3 className="name">{name}</h3>
        <p className="description">{description}</p>
        <p className="price">${price}</p>
        </article>
    )
}
