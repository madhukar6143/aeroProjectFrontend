import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './Auth'

function RequiredAuth({role,children}) {
    const auth =useAuth()
    if (auth.role  === role) 
        return children;
      
        // return children;
        return <Navigate to="/login" />;
     
   
}

export default RequiredAuth