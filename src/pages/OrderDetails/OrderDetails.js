import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../../context/AuthContext";
import {useParams} from "react-router-dom";
import {getOrderByOrderId, getOrderDetailsById} from "../../apis/orders";
import {getProductById} from "../../apis/product";
import './OrderDetails.css';

export default function OrderDetails() {
    const {orderid} = useParams();
    const {user} = useContext(AuthContext);
    const [items, setItems] = useState([]);
    const [orderDetails, setOrderDetails] = useState('')
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let cancelled = false;

        (async () => {
            try {
                setLoading(true);
                setError('');

                const orderItems = await getOrderByOrderId(orderid);
                if (cancelled) return;

                const order = await getOrderDetailsById(orderid)
                const orderDetails = order.map((item) => item.status);
                setOrderDetails(orderDetails);

                const ids = [...new Set(orderItems.map((item) => item.productid))]

                const productList = await Promise.all(ids.map((id) => getProductById(id)))
                if (cancelled) return;

                const productMap = {}
                for (const p of productList) {
                    productMap[p.productid] = p;
                }

                const merged = orderItems.map((item) => ({
                    ...item,
                    product: productMap[item.productid] || null,
                }))
                setItems(merged);
            } catch (e) {
                if (!cancelled) setError(e.message || 'Failed to fetch order');
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        }
    }, [orderid, user])
    if (error) {
        return <main className="error">Error: {error}</main>;
    }

    return (
        <main className="order-details">
            <h1 className="order-id">Order #{orderid} Details</h1>
            <h1 className="status">{orderDetails}</h1>
            <div className="product-list">
                <ul className="order-items">
                    {items.map((item) => {
                        const name = item.product?.name;
                        const img = item.product?.image_url;
                        const price = Number(item.price) || 0;
                        const lineTotal = price * item.quantity;

                        return (
                            <li className="order-item" key={item.orderitemid}>
                                {img && <img className="order-image" src={img} alt={name} width={80}/>}
                                <div className= "product-details">
                                    <strong>{name}</strong>
                                    <div>
                                        ${price.toFixed(2)} × {item.quantity} = ${lineTotal.toFixed(2)}
                                    </div>
                                </div>
                            </li>
                        );

                    })}
                </ul>
                <div className="total">
                    <strong>Total: ${items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</strong>
                </div>
            </div>
        </main>
    )
}

