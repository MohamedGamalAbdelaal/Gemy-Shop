import React, { Component } from 'react';
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom'
import Home from './components/Home/Home'
import Brands from './components/Brands/Brands'
import Proudcts from './components/Products/Products'
import Cart from './components/Cart/Cart'
import Categories from './components/Categories/Categories'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Layout from './components/Layout/Layout'
import NotFound from './components/NotFound/NotFound'
import ProductDetails from './components/ProductDetails/ProductDetails';
import { authContext, AuthProvider } from './Context/Authentication';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { QueryClient, QueryClientProvider,  } from 'react-query'
import { CartContextProvider } from './Context/cartContext';
import {Toaster} from 'react-hot-toast'
import Profile from './components/Profile/Profile';
import Payment from './components/Payment/Payment';
import AllOrders from './components/AllOrders/AllOrders';
import { Offline, Online } from "react-detect-offline";
let clientQuery=new QueryClient()
let routers = createHashRouter([
  {
    path: "/", element: <Layout />, children: [
      { index: true, element: <Proudcts/> },
      { path: 'Brands', element:<ProtectedRoute><Brands /></ProtectedRoute> },
      { path: 'Profile', element:<ProtectedRoute><Profile /></ProtectedRoute> },
      { path: 'Payment', element:<ProtectedRoute><Payment /></ProtectedRoute> },
      { path: 'Proudcts', element:<ProtectedRoute><Proudcts /></ProtectedRoute>  },
      { path: 'AllOrders', element:<ProtectedRoute><AllOrders /></ProtectedRoute>  },
      { path: 'Cart', element:<Cart />  },
      { path: 'Categories', element:<ProtectedRoute><Categories /></ProtectedRoute>  },
      { path: 'Login', element: <Login /> },
      { path: 'Register', element: <Register /> },
      { path: 'ProductDetails/:id', element:<ProtectedRoute><ProductDetails/></ProtectedRoute>  },
      { path: '*', element: <NotFound /> },

    ]
  }
])
function App () {
  
     return <>
   
     <QueryClientProvider client={clientQuery}>
     <CartContextProvider>
     <AuthProvider>
        <RouterProvider router={routers} />
     </AuthProvider> 
      </CartContextProvider> 
    <Toaster/>
     </QueryClientProvider>
    
     
     <Offline>
      <div className='position-fixed bg-dark bottom-0 start-0 text-white p-3 rounded-3'> You Offline Now</div>
     </Offline>
     </> 
   
    
}

export default App;