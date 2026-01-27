import react from "react";
import './PastOrders.css'
import {Link} from "react-router-dom";

export default function PastOrders({orders = []}) {
    return (
        <section className="past-orders">
            <h2>Past orders</h2>
            {orders.length === 0 ? (
                <p>No past orders yet</p>
            ) : (
                <ul>
                    {orders.map(order => (
                        <Link to={`/orders/details/${order.orderid}`}>
                            <li key={order.id}>
                                Order #{order.orderid} - Total: ${order.total}
                            </li>
                        </Link>
                    ))}
                </ul>
            )}
        </section>
    )
}
