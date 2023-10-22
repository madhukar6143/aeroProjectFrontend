import React from 'react';
import ItemCard from '../reusableComponents/ItemCard';
import './dashboard.css'; // Import your CSS file with the hover effect
import { useState ,useEffect } from 'react';
import axios from 'axios';
import "./form.css"
import { useAuth } from '../Auth/Auth';
import { URL } from '../../App';


function SellerDashboard() {
  const auth = useAuth()
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const sellerId= auth.id
    // Make the API request when the component mounts
    axios.post(`${URL}/seller/myItems`,{sellerId})
      .then((response) => {
        setData(response.data); 
        console.log(response.data)// Update the state with the data received
      })
      .catch((err) => {
        console.log(err)
        setError(err);
      });
  }, []); // The empty dependency array ensures this effect runs only once, like componentDidMount


  
  return (
    <>
    <h1>Products Sold </h1>
    <div>
      {data.map((item, index) => (
        <ItemCard key={index} item={item} />
      ))}
    
    </div>
    </>
  );
}

export default SellerDashboard;
