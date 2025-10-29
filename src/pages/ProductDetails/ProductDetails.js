import './ProductDetails.css';
import {useEffect, useState, useMemo} from 'react';
import {useParams, useNavigate} from 'react-router-dom';

const API = 'http://localhost:4000';

export default function ProductDetails() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [adding, setAdding] = useState(false);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                setLoading(true);
                const res = await fetch(`${API}/products/${id}`, {
                    credentials: 'omit',
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                if (!res.ok) throw new Error('Not Found');
                const data = await res.json();
                if (!cancelled) setProduct(data);
            } catch (e) {
                if (!cancelled) setError(e.message || 'Failed to fetch product');
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        }
    }, [id]);

    const imgSrc = useMemo(() => {
        if (!product) return "";
        return product.imageUrl || "https://via.placeholder.com/150";
    }, [product]);

    const addToCart = async () => {
        try {
            setAdding(true);
            const res = await fetch(`${API}/cart`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({productId: id, quantity: 1}),
            });
            if (res.status === 401) {
                navigate('/login');
                return;
            }
            if (!res.ok) {
                throw new Error('Failed to add to cart');
            }
            setAdded(true);
        } catch (e) {
            setError(e.message || 'Failed to add to cart');
        } finally {
            setAdding(false);
        }
    };

    if (loading) return <main className='loading'>Loading...</main>;
    if (error) return <main className='error'>Error: {error}</main>;
    if (!product) return null;

    return (
        <main className='product-details'>
            <button className='back-btn' onClick={() => navigate(-1)}>Back</button>
            <div className='product-details-container'>
                <img src={imgSrc} alt={product.name} className='product-image'/>
                <section className='product-info'>
                    <h2>{product.name}</h2>
                    <p className='price'>${product.price}</p>
                    <p className='description'>{product.description}</p>
                    <button className='add-to-cart-btn' onClick={addToCart} disabled={adding || added}>
                        {added ? "added to cart!" : adding ? "adding..." : "add to cart"}
                    </button>
                </section>
            </div>
        </main>
    )
}

