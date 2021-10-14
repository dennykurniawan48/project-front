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
        console.log(props.data.main_image)
        dispatch(cartAction.addItem({id: props.data.id, price: props.data.price, qty: +qtyRef.current.value, product_name: props.data.product_name, main_image: props.data.main_image}))
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
                <h1 className="text-lg text-yellow-600">{props.data.price}</h1>
                <div className="rounded-md border-2 border-gray-500 p-2 mt-3 text-sm font-normal">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </div>
                <div className="flex justify-end mt-6 items-center">
                    <label>Qty</label>
                    <input type="number" min="1" defaultValue={1} ref={qtyRef} className="ml-2 p-1 w-16 border-2 border-gray-400 text-center"/>
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