import {useState} from "react";

const API_ROOT = 'http://localhost:4000/api'

export async function getOrders(userId) {
    const res = await fetch(`${API_ROOT}/orders/${userId}`,
        {credentials: 'include'});

    if (!res.ok) {
        throw new Error('Failed to fetch orders');
    }

    const data = await res.json();
    console.log(typeof data)
    console.log(data)
    return data || [];
}

export async function getOrderByOrderId(orderId) {
    const res = await fetch(`${API_ROOT}/orders/details/${orderId}`,
        {credentials: 'include'});

    if (!res.ok) {
        throw new Error('Failed to fetch order details');
    }

    const data = await res.json();

    console.log(data)
    console.log(typeof data)
    return data || [];
}

export async function getOrderDetailsById(orderId) {
    const res = await fetch(`${API_ROOT}/orders/details/status/${orderId}`,
        {credentials: 'include'});
    if (!res.ok) {
        throw new Error('Failed to fetch order details');
    }
    const data = await res.json();
    return data || [];
}
