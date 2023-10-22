import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Auth/Auth';

function Logout() {
    const auth =useAuth();
    const navigate = useNavigate(); 
    
  useEffect(() => {
    // Call handleLogout when the component mounts
    handleLogout();
  }, []); 
    const handleLogout = () => {
        // Remove the JWT token from localStorage
        auth.logout();
        localStorage.clear()
        navigate('/')
      };
    
     
    }
    

export default Logout