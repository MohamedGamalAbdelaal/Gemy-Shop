
import Style from './NavBar.module.css'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../Assets/images/freshcart-logo.svg'
import Login from './../Login/Login';
import { useContext, useState } from 'react';
import { authContext } from '../../Context/Authentication';
import { data } from 'jquery';
import { cartContext } from '../../Context/cartContext';
export default function NavBar() {
  const { token, setToken } = useContext(authContext)
  const navigate = useNavigate()
  const{numOfCartItems}=useContext(cartContext)
  console.log(token)
  function logOut() {
    localStorage.removeItem('userToken')
    setToken(null)
    navigate('/Login')
  }
  return <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="market logo" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {token !== null ?
              <>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/Proudcts">Products</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/Categories">Categories</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/Brands">Brands</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/AllOrders">AllOrders</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active position-relative" aria-current="page" to="/Cart">
                    Cart
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {numOfCartItems}
                      <span class="visually-hidden">unread messages</span>
                    </span>
                  </Link>
                </li>
              </>
              : ''
            }
          </ul>
          <div className=' ms-auto mb-2 mb-lg-0'>
            <li className="nav-item d-flex align-items-center">
              <i className='fab fa-facebook mx-2 '></i>
              <i className='fab fa-instagram mx-2 '></i>
              <i className='fab fa-twitter mx-2 '></i>
              <i className='fab fa-youtube mx-2 '></i>
              <i className='fab fa-tiktok mx-2 '></i>
            </li>
          </div>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {token !== null ?
            <>  <li className="nav-item">
                <span onClick={logOut} className="nav-link active cursor-pointer"  >LogOut</span>
              </li> 
              <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/Profile">Profile</Link>
                </li>
              </>
              :
              <>
                <li className="nav-item">
                  <Link className="nav-link active" to="/Login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/Register">Register</Link>
                </li>
              </>



            }








          </ul>

        </div>
      </div>
    </nav>

  </>
}