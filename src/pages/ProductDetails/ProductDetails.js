import './ProductDetails.css';
import {useEffect, useState, useMemo} from 'react';
import {useParams, useNavigate} from 'react-router-dom';

const API = 'http://localhost:4000/api';

export default function ProductDetails() {
    const {productid} = useParams();
    console.log("productid:", productid);
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
                const res = await fetch(`http://localhost:4000/api/products/${productid}`, {
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
    }, [productid]);

    const imgSrc = useMemo(() => {
        if (!product) return "";
        return product.image_url || "https://via.placeholder.com/150";
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
                body: JSON.stringify({productid: productid, quantity: 1}),
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

