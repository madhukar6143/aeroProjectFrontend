import React from 'react';
import { useEffect } from 'react';
import { useAuth } from '../Auth/Auth';
import { useToasts } from 'react-toast-notifications';
import handleErrors from '../errorComponent';
import styles from './home.module.css' // Import your module.css

function Home() {
  const { addToast } = useToasts();
  const auth = useAuth();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  useEffect(() => {
    try {
      const role = localStorage.getItem('role');
      const user = localStorage.getItem('user');
      const id = localStorage.getItem('id');
      if (isLoggedIn) {
        auth.login(role, user, id);
      } else {
        localStorage.setItem('isLoggedIn', false);
      }
    } catch (err) {
      handleErrors(err, addToast);
    }
  }, []);

  return (
    <div className={styles.container}>
      <h1>Welcome to Our Platform</h1>
      <p>Your Trusted Source for Aviation Components</p>
      <button className={styles.button}>Get Started</button>
    </div>
  );
}

export default Home;
