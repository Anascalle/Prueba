import "./Consumption.css";
import React from "react";

interface ConsumptionProp {
    items: { id: number; name: string; price: number; quantity: number; image: string  }[];
    total: number;
    onRemoveItem: (id: number) => void;
    onBuyAll: () => void;
}

const Consumption: React.FC<ConsumptionProp> = ({ items, total, onRemoveItem, onBuyAll }) => {
    return (
        <div className="shopping-cart">
            <h2 id="h2-consumption">My Shopping Cart</h2>
            <div>
                {items.map((item) => (
                    <div key={item.id} className="cart-item">
                        <img src={item.image} alt={item.name} />
                        <div className="cart-item-details">
                            <div>
                                <p>{item.name}</p>
                                <p>${item.price}</p>
                            </div>
                            <div className="btn-remove">
                                <p>{item.quantity} units</p>
                                <button onClick={() => onRemoveItem(item.id)}>
                                    <img src="https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/delete.png?alt=media&token=dd5d15f8-ab25-4040-ae70-ee995f75b4e4" alt="" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="total-section">
                <h2>Total: ${total}</h2>
                <button onClick={onBuyAll}>Buy all</button>
            </div>
        </div>
    );
};

export default Consumption;