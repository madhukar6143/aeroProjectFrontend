import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemCard from '../reusableComponents/ItemCard';
import { useForm, Controller } from 'react-hook-form';
import styles from './shop.module.css';
import { URL } from '../../App';

function Shop() {
  const { handleSubmit, control } = useForm();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [searchString, setSearchString] = useState('');

  const fetchData = (search) => {
    axios
      .post(`${URL}/customer/listAllItems`, { search })
      .then((response) => {
        setData(response.data.allItems);
      })
      .catch((err) => {
        setError(err);
      });
  };

  useEffect(() => {
    fetchData(searchString);
  }, [searchString]);

  const onSubmit = (data) => {
    setSearchString(data.searchOption);
  };

  return (
    <div className={styles['background-image']}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label>
          <span className=' h4 text-warning'>Search by:</span>
          <Controller
            name="searchOption"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <select {...field} className={styles.select}>
                <option value="">None</option>
                <option value="location">Location</option>
                <option value="city">City</option>
              </select>
            )}
          />
        </label>
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>
      <div className="row">
        {data.map((item, index) => (
          <div key={index} className="col-12 col-sm-6 col-md-6 col-lg-4">
            <div className={styles['item-card']}>
              <ItemCard item={item} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;
