import { useState, createContext, useContext } from "react";


const AuthContext=createContext(null)

export const AuthProvider =({children}) =>
{
  const [user,setUser]=useState(null);
  const [role,setRole]=useState(null);
  const [id,setId]=useState(null);
  
  const login =(role,user,id) =>
  {
    
    setUser(user)
    setRole(role)
    setId(id)
  }
  const logout =() =>
  {
    setUser(null)
    setRole(null)
    setId(null)
  }
  return <AuthContext.Provider value ={{user,role,id,login,logout}}>{children}</AuthContext.Provider>
}

export const useAuth =() =>
{
    return useContext(AuthContext)
}