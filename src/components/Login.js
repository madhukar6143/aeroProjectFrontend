import React from 'react';
import { useForm } from 'react-hook-form';
import "./login.css";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import handleErrors from './errorComponent';
import { useAuth } from "./Auth/Auth";
import { useNavigate } from "react-router-dom";
import { URL } from '../App';

const Login = () => {
  const { addToast } = useToasts();
  const auth = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const location = useLocation();
  const { email, password, role } = location.state || {};

  const onSubmit = async (data) => {
    try {
      let apiUrl;
      if (data.role === 'seller') {
        apiUrl = `${URL}/seller/login`;
      } else if (data.role === 'manufacturer') {
        apiUrl = `${URL}/manufacturer/login`;
      } else if (data.role === 'customer') {
        apiUrl = `${URL}/customer/login`;
      } else {
        // Handle invalid role or provide a default URL
        addToast("Invalid role selected", { appearance: 'error' });
        return;
      }

      let response = await axios.post(apiUrl, data);
      addToast(response.data.message, { appearance: 'success', autoDismissTimeout: 1000 });

      const name = response.data.user.name;
      const role = response.data.user.role;
      const user = response.data.user.name;
      const id = response.data.user._id;
      
      const token = response.data.token;

      auth.login(data.role, name, id);
      localStorage.setItem('jwt', token);
      localStorage.setItem('id', id);
      localStorage.setItem('user', user);
      localStorage.setItem("isLoggedIn",true)
      localStorage.setItem("role",role)
      localStorage.setItem("customerId",id)
      navigate('/home',{replace:true})
    } catch (error) {
      handleErrors(error, addToast);
    }
  };

  return (
    <div>
      <div className="login-page ">
        <div className="form-box  bg-light border border-warning back bg-light">
          <h1>Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("email",
                {
                  required: true,
                  pattern:
                  {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid Format"
                  }
                })}
              type="email"
              name="email"
              defaultValue={email}
              placeholder="Email"
              autoComplete="off"
            />
            {errors.email && <span className="error">{errors.email.message}</span>}
            <input
              {...register("password",
                {
                  required: true,
                  pattern: {
                    value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/,
                    message:
                      "Password must contain at least one uppercase letter, one lowercase letter, one special character, and have a minimum length of 8 and maximum length of 16 characters",
                  }
                })}
              type="password"
              name="password"
              defaultValue={password}
              autoComplete="off"
              placeholder="Password"
            />
            {errors.password && (
              <span className="error">{errors.password.message}</span>
            )}
            <select {...register("role", { required: true })}>
              <option value="">Select Role</option>
              <option value="seller">Seller</option>
              <option value="manufacturer">Manufacturer</option>
              <option value="customer">Customer</option>
            </select>
            {errors.role && <span className="error">Role is required</span>}
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
