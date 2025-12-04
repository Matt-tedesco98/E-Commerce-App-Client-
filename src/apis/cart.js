const API_ROOT = 'http://localhost:4000/api'

export async function getCart(userId) {
    const res = await fetch(`${API_ROOT}/cart/${userId}`,
        {credentials: 'omit'});

    if (!res.ok) {
        throw new Error('Failed to fetch cart');
    }

    const data = await res.json();
    return Array.isArray(data) ? data : data.cart || [];
}

export async function addToCart(userId, productId) {
    const res = await fetch(`${API_ROOT}/cart/${userId}/${productId}`, {
        method: 'POST',
        credentials: 'include',
    });
    if (!res.ok) {
        throw new Error('Failed to add to cart');
    }
}

export async function removeFromCart(userId, productId) {
    const res = await fetch(`${API_ROOT}/cart/${userId}/${productId}`, {
        method: 'DELETE',
        credentials: 'include',
    });
    if (!res.ok && res.status !== 204) {
        throw new Error('Failed to remove from cart');
    }
}
