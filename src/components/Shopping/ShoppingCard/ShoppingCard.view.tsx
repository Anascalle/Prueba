import React, { useState } from 'react';
import "./ShoppingCard.css";

interface ShoppingCardProp {
    id: number;
    image: string;
    name: string;
    price: number;
    disponibility: number;
    addToConsumption: (item: { id: number; name: string; price: number; image: string; disponibility: number }, quantity: number) => void;
}

const ShoppingCard: React.FC<ShoppingCardProp> = ({ id, image, name, price, disponibility, addToConsumption }) => {
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        addToConsumption({ id, name, price, image, disponibility }, quantity);
    };

    return (
        <div className="product-card">
            <img src={image} alt={name} />
            <div>
                <p className="product-name">{name}</p>
                <p className="product-price">${price}</p>
                <p className="product-disponibility">Disponibility: {disponibility}</p>
            </div>
            <div>
                <input
                    type="number"
                    className="quantity-input"
                    value={quantity}
                    min={1}
                    max={disponibility}
                    onChange={(e) => setQuantity(Math.min(Number(e.target.value), disponibility))}
                />
                <button className="buy-button" onClick={handleAddToCart}>Buy</button>
            </div>
        </div>
    );
};

export default ShoppingCard;