import React, { useContext, useEffect, useState } from 'react';
import Style from './Products.module.css'
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import HomeSlide from '../HomeSlide/HomeSlide.jsx'
import CategorySlide from '../CategorySlide/CategorySlide';
import { Link } from 'react-router-dom'
import { cartContext } from '../../Context/cartContext';
import toast from 'react-hot-toast';


export default function Products(){
    // const [allProducts, setallProducts] = useState(null)
    // async function getProducts(){
    //     const {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/products')
    //     setallProducts(data.data)
       
        
    // }
    // useEffect(function(){
    //     getProducts()
    // },[])
    const{addProductToCart}=useContext(cartContext)
     function getProducts(){
       return axios.get('https://ecommerce.routemisr.com/api/v1/products')
     }
    const {isError,isFetched,isLoading,data}=useQuery('allProducts',getProducts,)
 async function addProduct(id){
  const res=await addProductToCart(id)
  if (res.status==="success") {
    toast.success(res.message,{
        duration:2000 ,
        style:{fontSize:12}

    })
    
  }
  else{
    toast.error("error in Added")
  }
}

    return <>
   
    {isLoading ?

<div className="vh-100 d-flex justify-content-center align-items-center">
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

:
    <div className="container">
        <HomeSlide/>
        <CategorySlide/>
    <div className="row g-4">
    {data?.data.data.map(function(product,idx){ 
        return <div key={idx} className="col-md-2">
            <div className="products">
            <Link to={`/ProductDetails/${product.id}`}>
            
                <img src={product.imageCover} alt="" className='w-100' />
                <h6 className='text-main'>{product.category.name}</h6>
                <h6>{product.title.split(' ').slice(0,2).join(' ')}</h6>
                
                <div style={{fontSize:'13px'}} className="d-flex justify-content-between align-items-center  ">
                <p>{product.price}  EGP</p>
                <p><span><i className='fa-solid fa-star yellow'></i></span> {product.ratingsAverage}</p>
                </div>
                </Link>  
                <button style={{fontSize:"13px"}} onClick={()=>{addProduct(product.id)}} className='btn text-white  p-0 w-100 mt-2 rounded-3 bg-main'>+ ADD To Cart</button>
            </div>
            
        </div>
            })}
        
    </div>
</div>
 
    
}
    
    
    
    </>
}