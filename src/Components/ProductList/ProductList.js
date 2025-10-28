import {useEffect, useState, useMemo} from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductList.css";

const API = "http://localhost:4000"

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
                const res = await fetch(`${API}/products`, {
                    credentials: "omit",
                    headers: {
                        "Accept": "application/json"
                    },
                });
                if (!res.ok) {
                    throw new Error("Failed to fetch products");
                }
                const data = await res.json();
                if (!cancelled) {
                    if (Array.isArray(data)) {
                        setProducts(data);
                    }else {
                        setProducts([]);
                    }
                    setLoading(false);
                }
            } catch (e) {
                if (!cancelled) {
                    setError("Failed to fetch products");
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
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!filteredProducts.length) {
        return (
            <div>
                <div>
                    <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search products..."/>
                </div>
                <p>No products found.</p>
            </div>
        );
    }
    return (
        <section className="product-list">
            <div>
                <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search products..."/>
            </div>
            <div className="product-list-container">
                {filteredProducts.map(p => (
                    <ProductCard key={p.id || p.name} product={p}/>
                ))}
            </div>
        </section>
    );
}
