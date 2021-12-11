import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Constant from "../components/Constant"
import HeaderNotLogin from "../components/HeaderNotLogin"
import { authAction } from "../store/auth"

const Checkout = () => {
    const cart = useSelector(state => state.cart.items)
    const loggedIn = useSelector(state => state.auth.isLoggedIn);
    const dispatch = useDispatch()
    const nameRef = useRef()
    const addressRef = useRef()
    const [error, setError] = useState(false)

    const [dataCart, setDataCart] = useState({data: []})

    const dataSend = cart.map(item => ({id: item.id, qty: item.qty}))

    const total = dataCart.data.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue.qty*currentValue.price;
    }, 0);

    const handleCheckout = async ()=> {
        setError(null)
        try{
            const token = localStorage.getItem('_token')
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const response = await axios.post('transaction', {
                item: dataSend,
                name: nameRef.current.value,
                address: addressRef.current.value
            }, config)
            console.log(response.data)
           // setDataCart(response.data)
        }catch(e){
            if(e.response.data.code === 422){
                if(e.response.data.error.name){
                    setError(e.response.data.error.name[0])
                }if(e.response.data.error.address){
                    setError(e.response.data.error.address[0])
                }
            }else if(r.response.data.code === 401){
                setError("Your session is expired please login again.")
            }else{
                setError("Unknown error.")
            }
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('_token')
        if(!token){
          dispatch(authAction.logout())
          router.replace('/login')
        }else{
            dispatch(authAction.login({token}))
        }
      }, [loggedIn])


   
    useEffect(async() => {
        try{
            const token = localStorage.getItem('_token')
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const response = await axios.post('checkout', {
                item: dataSend
            }, config)
            setDataCart(response.data)
        }catch(e){
            console.log(e)
        }
    }, [cart])

    const items = dataCart.data.map(item => 
        
   <div key={item.id} className="p-2 ml-3">
       <div className="flex">
            <img src={Constant.BaseUrl + item.image} className="w-20 max-h-20 object-cover mr-2"/>
            <div className="ml-3 ">
                <p className="font-semibold">{item.product_name}</p>
                <div className="flex justify-between items-center">
                    <p className="w-14">{item.qty}</p>
                    <p className="w-14"> X </p>
                    <p className="w-14">{`$${item.price}`}</p>
                    <div className="text-right w-20 md:w-32 font-bold">
                        {`$${item.qty*item.price}`}
                    </div>
                </div>
                <div className="font-semibold text-red-600 text-xs mt-2">
                    <p>{item.error}</p>
                </div>
            </div>
        </div>
       
    </div>
    )

   
    return <>
     <HeaderNotLogin/>
     <div className="flex items-center justify-center">
        <div className="border-2 w-96 max-w-md md:w-4/6">
            {items}
            <div className="flex justify-end p-3">
                <p className="mr-6">Total Cart: </p>
                <p className="font-bold font-xl">${total}</p>
            </div>
            <div className="m-4">
                <form>
                    <input type="text" ref={nameRef} placeholder="Name" className="w-full p-2 border border-gray-500 rounded-md"/>
                    <input type="text" ref={addressRef} placeholder="Address" className="mt-4 w-full p-2 border border-gray-500 rounded-md"/>
                </form>
            </div>
            <div className="flex justify-between m-4">
                <p className="text-red-600">{error}</p>
                <button onClick={handleCheckout} className="p-2 bg-green-500 text-white rounded-md">Checkout</button>
            </div>
        </div>
    </div>
    </>
}

export default Checkout