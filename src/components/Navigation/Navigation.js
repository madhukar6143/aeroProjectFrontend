import { Link } from 'react-router-dom';
import { useAuth } from '../Auth/Auth';
import { useState } from 'react';
import './Navigation.css';

const Navigation = () => {
  const [active, setActive] = useState('home');
  const auth = useAuth()
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

      <div className="container-fluid ">
        <Link to="/" className="navbar-brand">
          HomePage
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

          {auth.role==="customer" &&
              <li className="nav-item">
                <Link to="/customershop" className={`nav-link ${active === 'customershop' ? 'active' : ''}`}>
                  <button onClick={() => setActive('customershop')}>Shop</button>
                </Link>
              </li>
            }

            {auth.role==="customer" &&
              <li className="nav-item">
                <Link to="/customerdashboard" className={`nav-link ${active === 'customerdashboard' ? 'active' : ''}`}>
                  <button onClick={() => setActive('customerdashboard')}>Dashboard</button>
                </Link>
              </li>
            }

            {auth.role==="seller" &&
              <li className="nav-item">
                <Link to="/addItem" className={`nav-link ${active === 'addItems' ? 'active' : ''}`}>
                  <button onClick={() => setActive('addItems')}>Add Items</button>
                </Link>
              </li>
            }
              {auth.role==="manufacturer" &&
              <li className="nav-item">
                <Link to="/addItems" className={`nav-link ${active === 'addItems' ? 'active' : ''}`}>
                  <button onClick={() => setActive('addItems')}>Add Items</button>
                </Link>
              </li>
            }
            {auth.role==="seller" &&
              <li className="nav-item">
                <Link to="/sellerdashboard" className={`nav-link ${active === 'sellerdashboard' ? 'active' : ''}`}>
                  <button onClick={() => setActive('sellerdashboard')}>Dashboard</button>
                </Link>
              </li>
            }

            {!auth.role &&
              <li className="nav-item">
                <Link to="/login" className={`nav-link ${active === 'login' ? 'active' : ''}`}>
                  <button onClick={() => setActive('login')}>Login</button>
                </Link>
              </li>
            }

            {!auth.role &&
              <li className="nav-item">
                <Link to="/signup" className={`nav-link ${active === 'signup' ? 'active' : ''}`}>
                  <button onClick={() => setActive('signup')}>SignUp</button>
                </Link>
              </li>
            }
            {auth.role==="customer" &&
              <li className="nav-item">
                <Link to="/customercart" className={`nav-link ${active === 'customercart' ? 'active' : ''}`}>
                  <button onClick={() => setActive('customercart')}>Cart</button>
                </Link>
              </li>
            }
            {auth.role==="seller" &&
              <li className="nav-item">
                <Link to="/sellercart" className={`nav-link ${active === 'sellercart' ? 'active' : ''}`}>
                  <button onClick={() => setActive('sellercart')}>Cart</button>
                </Link>
              </li>
            }
            {auth.role &&
              <li className="nav-item">
                <Link to="/logout" className={`nav-link ${active === 'logout' ? 'active' : ''}`}>
                  <button onClick={() => setActive('logout')}>Logout</button>
                </Link>
              </li>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;