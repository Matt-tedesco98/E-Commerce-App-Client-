import React from "react";
import { useParams, Link } from "react-router-dom";
import {getOrderByOrderId} from "../../apis/orders";

export default function OrderConfirmation() {
    const { orderid } = useParams();
    console.log("orderId:", orderid);
    const order = getOrderByOrderId(orderid);
    console.log("order:", order);
    return (
       <main className="order-confirmation">
           <h1>Thank you for your order!</h1>
           <p>Order #{orderid} confirmed!</p>
           <p>Order total is {}</p>
           <Link to="/orders">View all orders</Link>
       </main>
    )
}
