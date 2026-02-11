import React, {useContext} from 'react';
import './cart.css'
import CurrentCart from "../../Components/CurrentCart/CurrentCart";
import {AuthContext} from "../../context/AuthContext";
import useCart from "../../context/useCart"
import {useNavigate} from "react-router-dom";

export default function Cart() {
    const {user, loading: authLoading} = useContext(AuthContext);
    const navigate = useNavigate();
    const {items, loading: cartLoading, error, removeItem} = useCart(user);

    if (authLoading || cartLoading) {
        return <main className="cart-header">Loading Cart...</main>
    }

    if (!user) {
        navigate('/login');
        return null;
    }

    if (error) {
        return <main className="cart-header">Error: {error}</main>;
    }
    return (
    <main className="cart-page">
        <header className="cart-header">
            <h1>Cart</h1>
        </header>
        <div className="cart-main">
            <CurrentCart items={items} onRemoveItem={removeItem}/>
            <button className="checkout-btn" onClick={() => navigate('/checkout')}>Proceed to checkout</button>
        </div>
    </main>
    )
}
