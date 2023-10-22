import './App.css';
import { Routes,Route, Form  } from 'react-router-dom';
import SignUp from './components/seller/signup';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Logout from './components/logout';
import { AuthProvider } from './components/Auth/Auth';
import Navigation from './components/Navigation/Navigation';
import Shop from './components/customer/shop';
import Dashboard from './components/customer/dashboard'
import SellerDashboard from './components/seller/dashboard';
import Cart from './components/customer/cart';
import RequiredAuth from './components/Auth/RequiredAuth';
import ItemsDisplay from './components/seller/itemsDisplay';
import PaymentPage from './components/payment/paymentpage';
import FormComponent from './components/seller/form'
import PrivateRoute from './components/Auth/PrivateRoute';
//export  const URL ="https://aeroproject.onrender.com/"
export  const URL = "http://localhost:3000"

function App() {
  const isLoggedIn=localStorage.getItem("isLoggedIn");
  return (
    <AuthProvider>
    <div className="App">
      <Navigation/>
    <Routes>
    <Route path='' exact  element={isLoggedIn?<HomePage/>:<Login/>}/>
    <Route path='home' exact  element={isLoggedIn?<HomePage/>:<Login/>}/>
    <Route path='login' element={<Login/>}/>
    <Route path='logout' element={<Logout/>}/>
    <Route path='customershop' element={<RequiredAuth role="customer" ><Shop/></RequiredAuth>}/>
    <Route path='customerdashboard' element={<RequiredAuth role="customer" ><Dashboard/></RequiredAuth>}/>
    <Route path='sellerdashboard' element={<RequiredAuth role="seller" ><SellerDashboard/></RequiredAuth>}/>
    <Route path='customercart' element={<RequiredAuth role="customer" ><Cart/></RequiredAuth>}/>
    <Route path='sellercart' element={<RequiredAuth role="seller" ><Cart/></RequiredAuth>}/>
    <Route path='addItem' element={<RequiredAuth role="seller" ><FormComponent/></RequiredAuth>}/>
    <Route path='additems' element={<RequiredAuth role="manufacturer" ><FormComponent/></RequiredAuth>}/>
    <Route path='signup' element={<SignUp/>}/>
    <Route path="seller/items" element={<ItemsDisplay/>} />
    <Route path="/payment/:data" element={<PaymentPage />} /> 
    <Route path="*" element={isLoggedIn?<HomePage/>:<Login/>}/>
    </Routes>
   
    </div>
    </AuthProvider>
  );
}

export default App;

