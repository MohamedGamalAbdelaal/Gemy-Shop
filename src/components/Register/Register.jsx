import React, { useEffect, useState } from 'react';
import Style from './Register.module.css'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from'axios'
import{useNavigate}from'react-router-dom'
import { RotatingLines } from  'react-loader-spinner'

export default function Register(){
    const [error, seterror] = useState(null)
    const [isLoading, setisLoading] = useState(false)
    let navigate=useNavigate();
   async function submitRegister(values){
    setisLoading(true)
      let {data}=await  axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values)
      .catch((err)=>{
        setisLoading(false)
        seterror(err.response.data.message)
      }
      
      )
      if(data.message ==='success'){
        setisLoading(false)
        navigate('/Login')
      }
      
        console.log(values);
    }   
    let phoneNumberRegex = /^(\+\d{1,3}\s?)?(\()?\d{3}(\))?[-.\s]?\d{3}[-.\s]?\d{5}$/;
    let validation=Yup.object({
        name:Yup.string().min(3,'name min is 3').max(15,'name max is 15').required('name is required'),
        email:Yup.string().email('email is invalid').required('email is required'),
        phone:Yup.string().matches(phoneNumberRegex,'phone is invalid').required('phone is required'),
        password:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/,'password is wrong').required('password is requierd'),
        rePassword:Yup.string().oneOf([Yup.ref('password')],'password dont match').required('rePassword is required')
    })
    let formik=useFormik({
        initialValues:{
            name:'',
            phone:'',
            email:'',
            password:'',
            rePassword:'',
        },
        onSubmit:submitRegister,
        validationSchema:validation,
    })


    
   
    return <>
    <form onSubmit={formik.handleSubmit}>
      {error!==null?<div className='alert alert-danger w-75 mx-auto '> {error}</div>:''}  
        <div className='w-75 mx-auto'>
            <h3>Register Now</h3>
        <label htmlFor="name">Name :</label>
        <input className='form-control' id='name' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} name='name' />
        {formik.errors.name&&formik.touched.name?<div className='alert alert-danger p-1 mt-2'>{formik.errors.name}</div>:''}
        <label htmlFor="name">Phone :</label>
        <input className='form-control' id='phone' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} name='phone' />
        {formik.errors.phone&&formik.touched.phone?<div className='alert alert-danger p-1 mt-2'>{formik.errors.phone}</div>:''}
        <label htmlFor="email">Email :</label>
        <input className='form-control' type='email' id='email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} name='email' />
        {formik.errors.email&&formik.touched.email?<div className='alert alert-danger p-1 mt-2'>{formik.errors.email}</div>:''}
        <label htmlFor="name">Password :</label>
        <input className='form-control' id='password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} name='password' />
        {formik.errors.password&&formik.touched.password?<div className='alert alert-danger p-1 mt-2'>{formik.errors.password}</div>:''}
        <label htmlFor="name">rePassword :</label>
        <input className='form-control' id='rePassword' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} name='rePassword' />
        {formik.errors.rePassword&&formik.touched.rePassword?<div className='alert alert-danger p-1 mt-2'>{formik.errors.rePassword}</div>:''}
       {isLoading===false?<button disabled ={!(formik.isValid&&formik.dirty)} type='submit' className='bg-main text-white btn mt-2'>Register</button>:
       <button className='bg-main text-white btn mt-2'>
        <RotatingLines
  strokeColor="white"
  strokeWidth="5"
  animationDuration="0.75"
  width="20"
  visible={true}
/>
       </button>
       
       }
        </div>
        
    </form>
    
    </>
}