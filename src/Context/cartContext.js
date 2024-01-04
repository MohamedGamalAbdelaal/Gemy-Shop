import { createContext, useEffect, useState } from "react";
import Cart from "../components/Cart/Cart";
import axios from "axios";
import Products from './../components/Products/Products';
export const cartContext = createContext()
export function CartContextProvider({ children }) {
    
    const [cartProducts, setCartProducts] = useState(null)
    const [totalCartPrice, settotalCartPrice] = useState(0)
    const [numOfCartItems, setnumOfCartItems] = useState(0)
    const [cartId, setcartId] = useState(null)
    async function addProductToCart(ProductID) {
        try {
            const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
                "productId": ProductID
            }, {
                headers: { token: localStorage.getItem('userToken') }

            })
            getCartProduct()
            return data
        }
        catch (e) {
            console.log("error", e)
        }

    }
        async function getCartProduct() {
            try {
                const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
                    headers: { token: localStorage.getItem("userToken") }
                })
                setCartProducts(data.data.products)
                setnumOfCartItems(data.numOfCartItems)
                settotalCartPrice(data.data.totalCartPrice)
                setcartId(data.data._id)
            }
            catch (e) {
                console.log("error", e)
            }

        }
        async function deletCart(id){
            try {
                const{data}=await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
                    headers:{token:localStorage.getItem('userToken')}
                })
                setCartProducts(data.data.products)
                setnumOfCartItems(data.numOfCartItems)
                settotalCartPrice(data.data.totalCartPrice)
                return data
            } catch (error) {
                console.log('error:',error)
            }
            
        }
        async function updateCount(id,count){
            try {
                const{data}=await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
               'count':count},{
                headers:{token:localStorage.getItem('userToken')}
               }
           )
           setCartProducts(data.data.products)
                setnumOfCartItems(data.numOfCartItems)
                settotalCartPrice(data.data.totalCartPrice)
                
           return data;

            } catch (error) {
                console.log(error)
            }
            
        }
        async function removeAllCart(){
            try {
                const{data}=await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`
               ,{
                headers:{token:localStorage.getItem('userToken')}
               }
           )
           setCartProducts([])
                setnumOfCartItems(0)
                settotalCartPrice(0)
           return data;

            } catch (error) {
                console.log(error)
            }
        }
        useEffect(function(){
            getCartProduct();
        },[])
        return <cartContext.Provider value={{removeAllCart,
        updateCount,
        deletCart,
         getCartProduct,
         cartId,
          addProductToCart,
          setcartId,
           cartProducts, 
           totalCartPrice,
            numOfCartItems,
            setCartProducts,
            setnumOfCartItems,
            settotalCartPrice
            }}>
            {children}
        </cartContext.Provider>
    }
