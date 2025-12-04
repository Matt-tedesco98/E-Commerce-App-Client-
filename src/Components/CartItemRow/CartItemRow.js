import react from 'react';
import './CartItemRow.css';

export default function CartItemRow({item, onRemoveItem}) {
    const lineTotal = (item.price || 0) * item.quantity;

    return (
        <li className="cart-item-row">
            {item.image_url && (
                <img
                    src={item.image_url}
                    alt={item.name}
                    className="cart-item-image"
                />
            )}

        <div></div>
        </li>
    )
}
