import axios from "axios"
import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import Constant from "../components/Constant"
import HeaderNotLogin from "../components/HeaderNotLogin"
import { authAction } from "../store/auth"
import { cartAction } from "../store/cart"

const DetailProduct = (props) => {
    const dispatch = useDispatch()
    const qtyRef = useRef()
    const loggedIn = useSelector(state => state.auth.isLoggedIn);

    const addHandler = () => {
        if(+qtyRef.current.value <= props.data.stock){
            dispatch(cartAction.addItem({id: props.data.id, price: props.data.price, qty: +qtyRef.current.value, product_name: props.data.product_name, main_image: props.data.main_image}))
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('_token')
        if(token){
          dispatch(authAction.login({token: token}))
        }
      }, [loggedIn])

    return <>
    <HeaderNotLogin/>
        <div className="grid md:grid-cols-2 m-4 mt-6">
            <div className="flex justify-center md:justify-end mx-8">
                <img src={Constant.BaseUrl + props.data.main_image} className="max-h-96 object-cover"/>
            </div>
            <div className="font-bold w-full md:m-4 mt-4 md:mt-0 md:max-w-sm">
                <span>
                <h1 className="text-xl">{props.data.product_name}</h1>
                <div className="flex text-gray-400">
                <p className="text-lg ">Price: ${props.data.price}</p> 
                <p className="text-lg mx-6">Stock: {props.data.stock}</p>
                </div>
                <div className="rounded-md border-2 border-gray-500 p-2 mt-3 text-sm font-normal h-44">
                {props.data.description}
                </div>
                <div className="flex justify-end mt-6 items-center">
                    <label>Qty</label>
                    <input type="number" min="1" defaultValue={1} max={props.data.stock} ref={qtyRef} className="ml-2 p-1 w-16 border-2 border-gray-400 text-center"/>
                    <button onClick={addHandler} className="ml-2 bg-green-700 px-3 py-2 rounded-md text-white">Add To Cart</button>
                </div>
                </span>
            </div>
            
        </div>
    </>
}

export const getServerSideProps = async (context) => {
    let data = {}
    try{
        const response = await axios.get('products/'+context.query.productId)
        data = response.data.data
    }catch(e){
        return{
            notFound: true
        }
    }
    return {
        props:{
            data
        }
    }
}

export default DetailProduct