import {useState, useEffect} from 'react'
import {getProductsByIds} from "../apis/product";
import {getCart, removeFromCart} from "../apis/cart";

const API = "http://localhost:4000/api";

export default function useCart(user) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) {
            setItems([])
            setLoading(false);
            setError('');
            return;
        }

        (async () => {
            try {
                setLoading(true);
                setError(null);

                const cartItems = await getCart(user.userid);

                if (cartItems.length === 0) {
                    setItems([]);
                    return;
                }

                const productIds = cartItems.map((item) => item.productid);
                const productMap = await getProductsByIds(productIds);

                const detailed = cartItems.map((item) => {
                    const product = productMap[item.productid];
                    return {
                        ...item,
                        name: product?.name,
                        price: product?.price,
                        image_url: product?.image_url,
                    };
                });

                setItems(detailed);
            } catch (error) {
                setError(error.message || 'failed to load cart');
                setItems([]);
            } finally {
                setLoading(false);
            }
        })()
    }, [user])

    const removeItem = async (productid) => {
        if (!user) return;
        try {
             await removeFromCart(user.userid, productid);
            setItems((prev) => prev.filter((item) => item.productid !== productid));
        } catch (error) {
            setError(error.message || 'failed to remove item from cart');
        }
    }

    return {items, loading, error, removeItem};
}

