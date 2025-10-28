import React from 'react';
import ProductList from '../../Components/ProductList/ProductList';
import './ProductPage.css'

export default function ProductPage() {
    return (
        <main className='product-page'>
            <header>
                <h2>Products</h2>
                <p>Browse items available for sale.</p>
            </header>
            <ProductList />
        </main>
    )
}
