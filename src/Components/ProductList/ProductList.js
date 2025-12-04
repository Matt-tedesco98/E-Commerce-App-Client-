import {useEffect, useState, useMemo} from "react";
import ProductCard from "../ProductCard/ProductCard";
import {getAllProducts} from "../../apis/product";
import "./ProductList.css";

const API = "http://localhost:4000/api/products"

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [query, setQuery] = useState("");

    useEffect(() => {
        let cancelled = false;

        (async () => {
            try {
                setLoading(true);
                const product = await getAllProducts()
                if (!cancelled) {
                    setProducts(product);
                }
            } catch (e) {
                if (!cancelled) {
                    setError("Failed to fetch products");
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        })();
        return () => {
            cancelled = true;
        }
    }, []);
    const filteredProducts = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return products;
        return products.filter(p => (p.name || "").toLowerCase().includes(q) || (p.description || "").toLowerCase().includes(q));
    }, [products, query]);
    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">Error: {error}</p>;
    if (!filteredProducts.length) {
        return (
            <div className= "product-list">
                <div className= "product-list-container">
                    <input className="input" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search products..."/>
                </div>
                <p>No products found.</p>
            </div>
        );
    }
    return (
        <section className="product-list">
            <div className="product-list-container">
                <input className="input" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search products..."/>
            </div>
            <div className="all-products">
                {filteredProducts.map(p => (
                    <ProductCard key={p.id || p.name} product={p}/>
                ))}
            </div>
        </section>
    );
}
