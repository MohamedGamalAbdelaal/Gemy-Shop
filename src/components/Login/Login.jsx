import Style from './Login.module.css'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Register from '../Register/Register';
import { RotatingLines } from 'react-loader-spinner'
import { useState } from 'react';
import { authContext } from './../../Context/Authentication';
import { useContext } from 'react';

export default function Login() {
 const {token,setToken}=useContext(authContext)
  const [error, seterror] = useState(null)
  const [isLoading, setisLoading] = useState(false)
  let navigate = useNavigate();
  async function submitLogin(values) {
    setisLoading(true)
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .catch((err) => {
        setisLoading(false)
        seterror(err.response.data.message)
      }

      )
    if (data.message === 'success') {
      
      localStorage.setItem('userToken', data.token)
      setToken(data.token)
      setisLoading(false)
      
      navigate('/')
      console.log(data.token)
      console.log(token)
    }

    console.log(values);
  }
  let validation = Yup.object({
    email: Yup.string().email('email is invalid').required('email is required'),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, 'password is wrong').required('password is requierd'),
  })
  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: submitLogin,
    validationSchema: validation,
  })




  return <>
    <form onSubmit={formik.handleSubmit}>
      {error !== null ? <div className='alert alert-danger w-75 mx-auto my-3'> {error}</div> : ''}
      <div className='w-75 mx-auto'>
        <h3>Login Now</h3>

        <label htmlFor="email">Email :</label>
        <input className='form-control' type='email' id='email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} name='email' />
        {formik.errors.email && formik.touched.email ? <div className='alert alert-danger p-1 mt-2'>{formik.errors.email}</div> : ''}
        <label htmlFor="name">Password :</label>
        <input className='form-control' id='password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} name='password' />
        {formik.errors.password && formik.touched.password ? <div className='alert alert-danger p-1 mt-2'>{formik.errors.password}</div> : ''}

        {isLoading === false ? <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='bg-main text-white btn mt-2'>Login</button> :
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
        {/* <link to={'/Register'}>Register Now</link> */}
      </div>

    </form>

  </>
}