import React, {useEffect, useMemo, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {getOrderByOrderId} from "../../apis/orders";
import "./OrderConfirmation.css"

export default function OrderConfirmation() {
    const {orderid} = useParams();
    console.log("orderId:", orderid);
    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let cancelled = false;

        (async () => {
            try {
                setLoading(true);
                setError('');

                const data = await getOrderByOrderId(orderid);
                if (cancelled) return;

                setItems(Array.isArray(data) ? data : []);
            } catch (error) {
                if (!cancelled) setError(error.message || 'Failed to fetch order');
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        }
    }, [orderid])

    const total = useMemo(() => {
        return items.reduce((sum, item) => {
            const price = Number(item.price) || 0;
            return sum + price * item.quantity;
        }, 0);
    }, [items]);

    if (loading) return <main>Loading order...</main>;
    if (error) return <main className="error">Error: {error}</main>;

    return (
        <main className="order-confirmation">
            <h1>Thank you for your order!</h1>
            <p>Order #{orderid} confirmed!</p>
            <p>Order total is ${total.toFixed(2)}</p>
            <button onClick={() => navigate("/orders")}>View all orders</button>
        </main>
    )
}
