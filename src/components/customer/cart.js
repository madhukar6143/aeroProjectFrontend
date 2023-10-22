import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Auth/Auth';
import { Link } from 'react-router-dom';
import styles from './cart.module.css'; // Import your CSS module for styling
import { URL } from "../../App"

function Cart() {
    const auth = useAuth();
    const [cartData, setCartData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const myData = {
                    customerId: auth.id,
                    sellerId: null,
                };
                const response = await axios.post(`${URL}/customer/cartItems`, { myData });
                if (response.data) {
                    setCartData(response.data);
                }
                console.log(response);
            } catch (err) {
                setError(err);
            }
        };

        fetchData();
    }, [auth.id]);

    const handleIncrement = (sellerId, itemIndex) => {
        // Implement increment logic here
        // This function should increment the quantity of the selected item
        // You may need to update the state to reflect the change
    };

    const handleDecrement = (sellerId, itemIndex) => {
        // Implement decrement logic here
        // This function should decrement the quantity of the selected item
        // You may need to update the state to reflect the change
    };

    const handleRemove = (sellerId, itemIndex) => {
        // Implement remove logic here
        // This function should remove the selected item from the cart
        // You may need to update the state to reflect the change
    };

    const handleSellerCheckout = (sellerId) => {
        console.log(sellerId);
        // Implement your seller-specific checkout logic here
        // This function will be called when the user clicks "Checkout" for a specific seller
        // You can send a request to your backend to process the seller's checkout
    };

    return (
        <div className={styles['cart-container']}>
            {cartData.map((sellerCart, index) => (
                <div key={index} className={styles['seller-cart']}>
                    <h6>Seller: {sellerCart.sellerId}</h6>
                    {sellerCart.items.map((item, itemIndex) => (
                        <div key={itemIndex} className={styles['item-card']}>
                            <div className={styles['item-info']}>
                                <h6>Item: {item.item}</h6>
                                <p>Price: ${item.price}</p>
                            </div>
                            <div className={styles['quantity-info']}>
                                <p>Quantity: {item.quantity}</p>
                            </div>
                            <div className={styles['buttons']}>
                                <button onClick={() => handleDecrement(sellerCart.sellerId, itemIndex)} className={styles['decrement-button']}>-</button>
                                <button onClick={() => handleRemove(sellerCart.sellerId, itemIndex)} className={styles['remove-button']}>Remove</button>
                                <button onClick={() => handleIncrement(sellerCart.sellerId, itemIndex)} className={styles['increment-button']}>+</button>
                            </div>
                        </div>
                    ))}
                    <Link to={`/payment/${JSON.stringify(sellerCart)}`} className={styles['checkout-link']}>
                        Checkout
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default Cart;
