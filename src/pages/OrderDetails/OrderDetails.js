import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../../context/AuthContext";
import {useParams} from "react-router-dom";
import {getOrderByOrderId, getOrderDetailsById} from "../../apis/orders";
import {getProductById} from "../../apis/product";

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
                console.log("orderItems:", orderItems);
                if (cancelled) return;

                const order = await getOrderDetailsById(orderid)
                console.log("order:", order);
                const orderDetails = order.map((item) => item.status);
                console.log("orderDetails:", orderDetails);
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
        return <main>Error: {error}</main>;
    }

    return (
        <main>
            <h1>Order #{orderid} Details</h1>
            <h1>{orderDetails}</h1>
            <ul>
                {items.map((item) => {
                    const name = item.product?.name;
                    const img = item.product?.image_url;
                    const price = Number(item.price) || 0;
                    const lineTotal = price * item.quantity;

                    return (
                        <li key={item.orderitemid}>
                            {img && <img src={img} alt={name} width={80}/>}
                            <div>
                                <strong>{name}</strong>
                                <div>
                                    ${price.toFixed(2)} × {item.quantity} = ${lineTotal.toFixed(2)}
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </main>
    )
}

