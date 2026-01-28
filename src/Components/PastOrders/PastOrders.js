import './PastOrders.css'
import {Link} from "react-router-dom";

export default function PastOrders({orders = []}) {
    return (
        <section className="past-orders">
            <div className="line">
                <h2 className="Title">Past orders</h2>
                {orders.length === 0 ? (
                    <p>No past orders yet</p>
                ) : (
                    <ul className="OrderList">
                        {orders.map(order => (
                            <Link to={`/orders/details/${order.orderid}`}>
                                <li className="orders" key={order.id}>
                                    Order #{order.orderid} - Total: ${order.total}
                                </li>
                            </Link>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    )
}
