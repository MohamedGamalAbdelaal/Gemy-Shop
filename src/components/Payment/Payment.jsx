import React, { useContext, useState } from 'react'
import { cartContext } from '../../Context/cartContext'
import axios from 'axios'
import toast from 'react-hot-toast';

export default function Payment() {
    const{cartId, setCartProducts,setnumOfCartItems,settotalCartPrice}=useContext(cartContext)
    async function confirmCashPayment(){
        const phoneValue= document.querySelector("#phone").value;
        const cityValue= document.querySelector("#city").value;
        const detailsValue= document.querySelector("#details").value;
        const shippingAddress={
            "shippingAddress":{
                "details":detailsValue
                ,"city":cityValue
                ,"phone":phoneValue
            }
        }
        try {
            const {data} =await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
            shippingAddress,{headers:{ token:localStorage.getItem("userToken")}}
         
        )
        console.log(data)
        if(data.status==="success"){
          toast.success("Order Done")
          setCartProducts([])
          setnumOfCartItems(0)
          settotalCartPrice(0)
        }

        else{
          toast.error("error found")
        }
        console.log(cartId )
        } catch (error) {
          console.log("error",error)  
        }
        
    }
    async function confirmOnlinePayment(){
        const phoneValue= document.querySelector("#phone").value;
        const cityValue= document.querySelector("#city").value;
        const detailsValue= document.querySelector("#details").value;
        const shippingAddress={
            "shippingAddress":{
                "details":detailsValue
                ,"city":cityValue
                ,"phone":phoneValue
            }
        }
        try {
            const {data} =await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
            shippingAddress,
            {
              headers:{ token:localStorage.getItem("userToken")},
              params:{url:"http://localhost:3000"}
          
          },         
        )
        window.open(data.session.url,"_blank")
        console.log(data)
        if(data.status==="success"){
          toast.success("Order Done")
          setCartProducts([])
          setnumOfCartItems(0)
          settotalCartPrice(0)
        }

        else{
          toast.error("error found")
        }
        console.log(cartId )
        } catch (error) {
          console.log("error",error)  
        }
        
    }
  return<>
  <div className="container mt-5">
    <form action="">
        <label htmlFor="phone" >Phone </label>
        <input type="tel" className='form-control mb-2' placeholder='Phone' id='phone' />
        <label htmlFor="phone" >City </label>
        <input type="text" className='form-control mb-2' placeholder='city' id='city' />
        <label htmlFor="Details" >Details </label>
        <textarea type="text" className='form-control mb-2' placeholder='Details' id='details' />
    <button type='button' onClick={confirmCashPayment} className='btn btn-success mt-4 '>Confirm Cash Payment</button>
    <button type='button' onClick={confirmOnlinePayment} className='btn btn-success mt-4 mx-3'>Confirm Online Payment</button>
    </form>
  </div>
  </>
}
