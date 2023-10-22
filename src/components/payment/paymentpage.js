import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { loadStripe } from "@stripe/stripe-js";
import { useAuth } from '../Auth/Auth';
import { URL } from '../../App';
import styles from './PaymentPage.module.css'

function PaymentPage(props) {
  const auth = useAuth();
  const { data } = useParams();
  const sellerCart = JSON.parse(data);
  const sellerId = sellerCart.sellerId;
  const customerId = auth.id;

  const total = sellerCart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const [product, setProduct] = useState({
    name: "Aeroplane parts",
    price: total,
    productOwner: sellerId,
    customerId: customerId,
    description: "These are genuine spare parts of an Aeroplane",
    quantity: 1,
  });

  const makePayment = async () => {
    const stripe = await loadStripe("pk_test_51O2IaBSE8YAZ2XErcBAOyTemyGvvnmgJoCKFhisRTPOYTi1jRsOhi3k8fNcUSon1MdGpFYLnPrvUntKPYBdSwKoM00YsWtytwr");
    const body = { product };
    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(
      `${URL}/api/create-checkout-session`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );
    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  return (
    <div className={styles['background-image']}>
    <div className=" p-5 container border border-warning">
      <h1 className='text-warning'>Transaction Details</h1>
      <table className="table table-bordered border border-info">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {sellerCart.items.map((item, index) => (
            <tr key={index}>
              <td>{item.item}</td>
              <td>${item.price}</td>
              <td>{item.quantity}</td>
              <td>${item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="h4 mt-3 text-danger">Total: ${total}</p>
      <button className="btn btn-primary" onClick={makePayment}>
        Make Payment
      </button>
    </div>
    </div>
  );
}

export default PaymentPage;
