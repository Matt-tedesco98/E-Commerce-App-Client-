import React from 'react';
import './cart.css'
import CurrentCart from "../../Components/CurrentCart/CurrentCart";

export default function Cart() {
    return (
        <header className="cart-header">
            <h1>Cart</h1>
        <div className="cart-main">
            <CurrentCart/>
        </div>
        </header>
    )
}
