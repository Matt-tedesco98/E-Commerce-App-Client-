import React, {useContext, useEffect, useState} from 'react';
import PastOrders from "../../Components/PastOrders/PastOrders";
import {AuthContext} from "../../context/AuthContext";
import {useNavigate, Link} from "react-router-dom";
import {getOrders} from "../../apis/orders";
import './OrdersHistory.css';

export default function OrderHistory() {
    const {user, loading: authLoading} = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            setLoading(false);
        }

        (async () => {
            try {
                setLoading(true);
                const data = await getOrders(user.userid);
                setOrders(data)

            } catch (e) {
                setError(e.message || 'Failed to fetch orders');
            } finally {
                setLoading(false);
            }
        })()
    }, [user, navigate])

    if (authLoading || loading) {
        return <main>Loading orders...</main>;
    }

    if (error) {
        return <main className="error">Error: {error}</main>;
    }

    return (
        <main>
            <PastOrders classname="PastOrders" orders={orders}/>
        </main>
    );
}

