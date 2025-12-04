import React from 'react';
import './CurrentCart.css';

export default function CurrentCart({items = [], onRemoveItem = () => {}}) {
    return (<section className="current-cart">
            <h2>Current Cart</h2>

            {items.length === 0 ? (<p>Your cart is empty.</p>) : (<ul>
                    {items.map((item) => {
                        const lineTotal = (item.price || 0) * item.quantity;

                        return (<li key={item.cartitemid} className="cart-item">
                                {item.image_url && (<img
                                        src={item.image_url}
                                        alt={item.name}
                                        className="cart-item-image"
                                    />)}

                                <div className="cart-item-details">
                                    <h3>{item.name || `Product #${item.productid}`}</h3>
                                    <p>
                                        ${item.price?.toFixed ? item.price.toFixed(2) : item.price}{' '}
                                        x {item.quantity}
                                    </p>
                                    <strong>
                                        Total:{' '}
                                        {Number.isFinite(lineTotal) ? lineTotal.toFixed(2) : '0.00'}
                                    </strong>

                                    <button
                                        className="remove-btn"
                                        onClick={() => onRemoveItem(item.productid)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </li>);
                    })}
                </ul>)}
        </section>);
}
