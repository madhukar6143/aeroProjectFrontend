import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ItemCard({ item }) {
    
  const navigate = useNavigate();
  const redirectToSellerItems = (sellerId) => {
    navigate('/seller/items', { state: { sellerId: sellerId } });
      };

  return (
    <Button variant="primary" onClick={() => redirectToSellerItems(item.sellerId)}>
        
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{item.item}</Card.Title>
        <Card.Text>Price: ${item.price}</Card.Text>
        <Card.Text>Seller: {item.seller}</Card.Text>
      </Card.Body>
    </Card>
    </Button>
  );
}

export default ItemCard;
