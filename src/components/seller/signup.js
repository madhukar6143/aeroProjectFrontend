import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./Signup.css";
import axios from "axios";
import { URL } from "../../App";

const Signup = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  const handleLocationClick = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLocation({ latitude, longitude });
      });
    } else {
      return;
    }
  };

  const onSubmit = async (data) => {
    // Include the extracted location in the form data
    if (location.latitude && location.longitude) {
      data.latitude = location.latitude;
      data.longitude = location.longitude;
    }

    try {
        if (data.role === "customer") {
          // Make a request for customer registration
          let response = await axios.post(`${URL}/customer/signup`, data);
          console.log(response.data.message);
        } else if (data.role === "seller") {
          // Make a request for seller registration
          let response = await axios.post(`${URL}/seller/signup`, data);
          console.log(response.data.message);
        } else if (data.role === "manufacturer") {
          // Make a request for manufacturer registration
          let response = await axios.post(`${URL}/manufacturer/signup`, data);
          console.log(response.data.message);
        }
    
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signup-page">
      <div className="form-box">
        <h1>Customer Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("name", {
              required: true,
              pattern: {
                value: /^[A-Za-z]+$/,
                message: "Name should contain only alphabets",
              },
            })}
            type="text"
            name="name"
            placeholder="Name"
            autoComplete="off"
          />

          {errors.name && <span className="error">{errors.name.message}</span>}

          <input
            {...register("email", {
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid Format",
              },
            })}
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="off"
          />

          {errors.email && <span className="error">{errors.email.message}</span>}

          <input
            {...register("password", {
              required: true,
              pattern: {
                value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/,
                message: "Password must contain at least one uppercase letter, one lowercase letter, and one special character",
              },
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="off"
          />

          {errors.password && <span className="error">{errors.password.message}</span>}

          <input
            {...register("phone", {
              required: true,
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Phone number should be 10 digits",
              },
            })}
            type="tel"
            name="phone"
            placeholder="Phone"
            autoComplete="off"
          />

          {errors.phone && <span className="error">{errors.phone.message}</span>}

          <input
            {...register("city")}
            type="text"
            name="city"
            placeholder="City"
            autoComplete="off"
          />

          <button type="button" onClick={handleLocationClick}>
            Get Location
          </button>

          {location.latitude && location.longitude && (
            <div>
              <p>Latitude: {location.latitude}</p>
              <p>Longitude: {location.longitude}</p>
            </div>
          )}

          <select
            {...register("role", {
              required: true,
            })}
            name="role"
            defaultValue="customer" // Set the default value to "customer"
          >
            <option value="customer">Customer</option>
            <option value="seller">Seller</option>
            <option value="manufacturer">Manufacturer</option>
          </select>

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
