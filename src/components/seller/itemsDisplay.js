import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import './dashboard.css';
import { useToasts } from 'react-toast-notifications';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import handleErrors from '../errorComponent';
import { useAuth } from '../Auth/Auth';
import { URL } from '../../App';
import styles from './itemsDisplay.module.css'

function ItemsDisplay() {
    const auth = useAuth();
    const { addToast } = useToasts();
    const [cartItems, setCartItems] = useState([]);
    const [data, setProductsSold] = useState([]);
    const[sellerName,setSellerName]=useState('')

    const location = useLocation();
    const { sellerId } = location.state || {};

    useEffect(() => {
        const fetchDataForSeller = async () => {
            try {
                const response = await axios.post(`${URL}/customer/items`, { sellerId });
                setProductsSold(response.data.productSold);
                setSellerName(response.data.name)
            } catch (err) {
                handleErrors(err, addToast);
            }
        };
        const fetchCartData = async () => {
            try {
                const myData = {
                    customerId: auth.id,
                    sellerId: sellerId,
                };
                const response = await axios.post(`${URL}/customer/cartItems`, { myData });
                setCartItems(response.data);
            } catch (err) {
                handleErrors(err, addToast);
            }
        };
        fetchDataForSeller();
        fetchCartData();
    }, [sellerId, auth.id]);

    const addToCart = async (item) => {
        const cartItem = {
            item: item.item,
            price: item.price,
            quantity: 1
        };
        const customerId = auth.id;
        const sellerId = location.state.sellerId;

        const data = {
            customerId: customerId,
            sellerId: sellerId,
            cartItem: cartItem
        };

        try {
            const response = await axios.post(`${URL}/customer/insertInCart`, data);
            setCartItems([...cartItems, cartItem]);
            console.log('Item added to cart:', response.data);
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };

    const removeFromCart = async (item) => {
        const customerId = auth.id;
        const sellerId = location.state.sellerId;

        const data = {
            customerId: customerId,
            sellerId: sellerId,
            cartItem: {
                item: item.item,
                price: item.price,
                quantity: 0,
            }
        };

        try {
            const response = await axios.post(`${URL}/customer/removeFromCart`, data);
            setCartItems(cartItems.filter((cartItem) => cartItem.item !== item.item));
            console.log('Item removed from cart:', response.data);
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    return (
        <>
            <div className={styles['background-image']}>
  <h1 className='text-warning'>Seller Name : {sellerName}</h1>
  <div className="row">
    {data.map((item, index) => (
      <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Item: {item.item}</Card.Title>
            <Card.Text>Price: ${item.price}</Card.Text>
            <Card.Text>Quantity: {item.quantity}</Card.Text>
          </Card.Body>
          {cartItems.find((cartItem) => cartItem.item === item.item) ? (
            <Button variant="primary" onClick={() => removeFromCart(item)}>
              Remove from Cart
            </Button>
          ) : (
            <Button variant="primary" onClick={() => addToCart(item)}>
              Add to Cart
            </Button>
          )}
        </Card>
      </div>
    ))}
  </div>
</div>

        </>
    );
}

export default ItemsDisplay;
