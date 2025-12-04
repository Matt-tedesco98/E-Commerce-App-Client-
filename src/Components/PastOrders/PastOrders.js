import react from "react";
import './PastOrders.css'

export default function PastOrders({orders = []}) {
    return (
        <section className="past-orders">
            <h2>Past orders</h2>
            {orders.length === 0 ? (
                <p>No past orders yet</p>
            ) : (
                <ul>
                    {orders.map(order => (
                        <li key={order.id}>
                            Order #{order.orderid} - Total: ${order.total}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}
