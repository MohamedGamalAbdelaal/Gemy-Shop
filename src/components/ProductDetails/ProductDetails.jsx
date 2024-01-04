import axios from 'axios'
import React, { useContext, useState } from 'react'
import { RotatingLines, ThreeDots } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { cartContext } from '../../Context/cartContext'
import toast from 'react-hot-toast'
export default function ProductDetails() {
    const [addLoading, setaddLoading] = useState(false)
    const { addProductToCart } = useContext(cartContext)
    const { id } = useParams()
    async function addProduct(id) {
        setaddLoading(true)
        const res = await addProductToCart(id)
        if (res.status === "success") {
            toast.success(res.message, {
                duration: 2000,
                style: { fontSize: 12 }
            })
        }
        else {
            toast.error(res.message, {
                duration: 2000,
                style: { fontSize: 12 }
            })
        }
        setaddLoading(false)
    }
    function getProductDetails() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }
    const { data, isLoading } = useQuery('productDetails', getProductDetails)
    if (isLoading) {
        return <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#4fa94d"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
        />
    }

    console.log(data?.data.data.id)

    return <>
        <div className="container">
            <div className="row align-items-center mt-5">
                <div className="col-md-3">
                    <figure>
                        <img className='w-100' src={data.data.data.imageCover} alt={data.data.data.title} />
                    </figure>
                </div>
                <div className="col-md-9 text-center">
                    <div className="productdetails">
                        <h1>{data.data.data.title}</h1>
                        <p>{data.data.data.description}</p>
                        <h5 className='fw-bold '>Price : {data.data.data.price} EGP</h5>
                        <button onClick={() => { addProduct(data.data.data.id) }} className='btn bg-main w-100 mt-5 text-white p-1'>
                            {addLoading ? <>
                                <RotatingLines
                                    strokeColor="grey"
                                    strokeWidth="5"
                                    animationDuration="0.75"
                                    width="96"
                                    visible={true}
                                />
                            </>

                                : "+ Add To Cart"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
}
