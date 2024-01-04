import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner'

export default function AllOrders() {
    const [userOrder, setuserOrder] = useState(null)
    useEffect(()=>{
        const res=jwtDecode(localStorage.getItem("userToken"))
        getUserOrders(res.id)

    },[])
    

    async function getUserOrders(id){
        try {
            const {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
       console.log(data)
       setuserOrder(data)
        } catch (error) {
            console.log(error)
        }
    }
    if(userOrder===null){
       return <div className="div justify-content-center d-flex align-items-center">
<ThreeDots 
height="80" 
width="80" 
radius="9"
color="#4fa94d" 
ariaLabel="three-dots-loading"
wrapperStyle={{}}
wrapperClassName=""
visible={true}
/>
        </div>
        
    }
  return <>
  <div className="row g-4">
    {userOrder.map((order,idx)=>{
        return<div key={idx} className="col-sm-6">
        <div className="Orders bg-info rounded-4 p-2">
           <div className="row">
            
                 {order.cartItems?.map(function(item,index){
                return <div   key={index} className="col-sm-3 bg-danger p-2 m-2 ">
                  <img src={item.product.imageCover} className='w-50' alt="" />
                  <h4 style={{fontSize:14}}>Title : {item.product.title}</h4>
                  <h5 style={{fontSize:14}}>count : {item.count}</h5>
                  <h5 style={{fontSize:14}}>price : {item.price}</h5>
                </div>
            })}
          
           </div>
          <p>order with phone : {order.shippingAddress.phone}
          and with details :{order.shippingAddress.details}
          at :{order.shippingAddress.city}
          </p>
          <p>Payment Method : {order.paymentMethodType}</p>
          <p>total Price: : {order.totalOrderPrice}</p>
        </div>
    </div> 
    })}
    
  </div>
  </>
}
