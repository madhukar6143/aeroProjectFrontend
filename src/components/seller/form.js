import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import "./form.css"
import axios from 'axios';
import { useAuth } from '../Auth/Auth';
import { useToasts } from 'react-toast-notifications';
import handleErrors from '../errorComponent'
import { URL } from '../../App';


const FormComponent = () => {
  const { addToast } = useToasts();
  const {
        handleSubmit,
        control,
        formState: { errors },
      } = useForm();
      
       const auth = useAuth()
      const onSubmit = async(data) => {
        try {
            data.documentId=auth.id
            console.log(data)
            const response =await axios.post(`${URL}/seller/insert-items`, data); 
            addToast(response.data.message, { appearance: 'success',autoDismissTimeout: 1000  }); 
        } catch (error) {
          handleErrors(error, addToast);
        }
      };

    
      return (
        <div className="form-container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="itemName">Item Name</label>
              <Controller
                name="itemName"
                control={control}
                rules={{ required: 'Item Name is required' }}
                render={({ field }) => (
                  <input {...field} type="text" id="itemName" className="form-control" />
                )}
              />
              {errors.itemName && <p className="error-message">{errors.itemName.message}</p>}
            </div>
    
            <div className="form-group">
              <label htmlFor="itemQuantity">Item Quantity</label>
              <Controller
                name="itemQuantity"
                control={control}
                rules={{
                  required: 'Item Quantity is required',
                  pattern: {
                    value: /^[0-9]+$/,
                    message: 'Item Quantity should be a number',
                  },
                }}
                render={({ field }) => (
                  <input {...field} type="text" id="itemQuantity" className="form-control" />
                )}
              />
              {errors.itemQuantity && <p className="error-message">{errors.itemQuantity.message}</p>}
            </div>
    
            <div className="form-group">
              <label htmlFor="pricePerItem">Price per Item</label>
              <Controller
                name="pricePerItem"
                control={control}
                rules={{
                  required: 'Price per Item is required',
                  pattern: {
                    value: /^[0-9]+$/,
                    message: 'Price per Item should be a number',
                  },
                }}
                render={({ field }) => (
                  <input {...field} type="text" id="pricePerItem" className="form-control" />
                )}
              />
              {errors.pricePerItem && <p className="error-message">{errors.pricePerItem.message}</p>}
            </div>
    
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      );
    };
    
export default FormComponent;
