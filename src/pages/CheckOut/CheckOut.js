import React, { useContext, useMemo } from 'react';
import { AuthContext } from '../../context/AuthContext';
import useCart from '../../context/useCart';
import { useNavigate } from 'react-router-dom';
import CurrentCart from '../../Components/CurrentCart/CurrentCart';
import StripeCheckoutForm from "../../Components/Checkout/StripeCheckoutForm";
import './CheckOut.css';

export default function Checkout() {
  const { user, loading: authLoading } = useContext(AuthContext);
  const { items, loading: cartLoading, error, removeItem } = useCart(user);
  const navigate = useNavigate();

  const total = useMemo(() => {
    return items.reduce((sum, item) => {
      const price = item.price || 0;
      return sum + price * item.quantity;
    }, 0);
  }, [items]);

  if (authLoading || cartLoading) {
    return <main className="checkout-page">Loading checkout...</main>;
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  if (error) {
    return <main className="checkout-page">Error: {error}</main>;
  }

  if (items.length === 0) {
    return (
      <main className="checkout-page">
        <h1>Checkout</h1>
        <p>Your cart is empty.</p>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <header className="checkout-header">
        <h1>Checkout</h1>
      </header>

      <section className="checkout-content">
        <div className="checkout-items">
          <CurrentCart items={items} onRemoveItem={removeItem}/>
        </div>

        <aside className="checkout-summary">
          <h2>Order Summary</h2>
          <p>Items: {items.length}</p>
          <p>
            Total: <strong>${total.toFixed(2)}</strong>
          </p>

            <StripeCheckoutForm user={user} total={total}/>
        </aside>
      </section>
    </main>
  );
}
