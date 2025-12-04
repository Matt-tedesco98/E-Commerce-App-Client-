const API_URL = 'http://localhost:4000/api';

export async function getAllProducts() {
    const res = await fetch(`${API_URL}/products/`, {
        credentials: 'omit',
    });
    if (!res.ok) {
        throw new Error('Failed to fetch products');
    }

    const data = await res.json();
    return data || [];
}

export async function getProductById(productId) {
    const res = await fetch(`${API_URL}/products/${productId}`, {
        credentials: 'omit',
    });
    if (!res.ok) {
        throw new Error('Failed to fetch product');
    }

    return res.json();
}

export async function getProductsByIds(productIds) {
    const promise = productIds.map(id => getProductById(id));
    const products = await Promise.all(promise);

    const map = {}
    for (const p of products) {
        map[p.productid] = p;
    }
    return map;
}

