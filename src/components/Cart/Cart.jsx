import React, { useContext } from 'react';
import Style from './Cart.module.css'
import { cartContext } from '../../Context/cartContext';
import { ThreeDots } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Cart() {
    const {removeAllCart,updateCount, cartProducts, totalCartPrice, numOfCartItems,deletCart } = useContext(cartContext)
    console.log(cartProducts)
    async function deleteElement(id){
        const res=await deletCart(id)
        if (res.status==='success') {
            toast.success("product Removed")
        }
        else{
            toast.error("error ")
        }
    }
    async function updateProductCount(id,count)
    {
        const res=await updateCount(id,count)
        if (res.status==='success') {
            toast.success("product Updated")
        }
        else{
            toast.error("error ")
        }
    }
    if (cartProducts === null) {
        return <>
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
        </>
    }
    if(cartProducts.length===0){
        return<>
        <h1>No Product Found</h1>
        </>
    }
    return <>
        <div style={{ backgroundColor: "#eee" }} className="container py-3 ">
            <h2 className='h4 fw-bold mt-3'>Shop Cart : </h2>
            <p style={{ fontSize: 14 }}>Total Price : {totalCartPrice} EGP</p>
            <p style={{ fontSize: 14 }}>Total Items : {numOfCartItems} </p>
            <div className="d-flex justify-content-between align-items-center">
            <button onClick={removeAllCart} className='btn btn-outline-danger'>Remove All</button>
            <Link to={"/Payment"}  className='btn btn-outline-success'>Confirm Payment</Link>
            </div>
            {cartProducts.map(function (product, indx) {
                console.log(product)
                return <div key={indx} className="row mt-3 align-items-center  border-bottom border-3 pb-3">

                    <div className="col-sm-1">
                        <img className='w-100 m-1' src={product.product.imageCover} alt="" />
                    </div>
                    <div className="col-sm-9">
                        <h2 className='h6'>{product.product.title}</h2>
                        <h5 className='h6'>Price : {product.price}</h5>
                        <button onClick={()=>deleteElement(product.product.id)} className='btn btn-outline-danger'>Remove</button>
                    </div>
                    <div className="col-sm-2 ">
                        <button onClick={()=>updateCount(product.product.id,product.count+1)} className='btn btn-outline-success fw-bolder'>+</button>
                        <span style={{ fontSize: 14, padding: 10 }}>{product.count}</span>
                        <button onClick={()=>updateProductCount(product.product.id,product.count-1)} className='btn btn-outline-success fw-bolder'>-</button>
                    </div>
                </div>
            })}
        </div>
    </>
}