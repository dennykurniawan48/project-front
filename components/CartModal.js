import { useDispatch, useSelector } from "react-redux"
import { cartAction } from "../store/cart"
import Constant from "./Constant"

const CartModal = (props) => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const isDisabled = cart.qty === 0 ? "true" : ""
    const color = cart.qty != 0 ? "bg-green-500" : "bg-gray-300"

    const handleIncrease = (item) => {
        dispatch(cartAction.controlItem({id: item.id, price: item.price, product_name: item.product_name, qty: 1}))
    }

    const handleDecrease = (item) => {
        dispatch(cartAction.controlItem({id: item.id, price: item.price, product_name: item.product_name, qty: -1}))
    }

    const data = cart.items.map(item => 
    <div className="pt-3 flex items-center text-xs font-semibold">
        <img src={Constant.BaseUrl + item.main_image} className="max-h-10 w-10 object-cover mr-2"/>
        <span className="w-40">{item.product_name}</span>
        <div className="text-base items-center pb-1">
            <button onClick={() => {handleDecrease(item)}} className="ml-3 mr-3 border border-gray-500 px-2">-</button> {item.qty} 
            <button onClick={() => {handleIncrease(item)}} className="ml-3 mr-3 border border-gray-500 px-2">+</button></div>
    </div>)
    console.log(data)
    const handleCheckout = () => {

    }
    return (
        <div className="bg-black inset-0 fixed bg-opacity-0 text-white flex justify-center items-center">
            <div className="bg-white border-1 border-gray-500 text-gray-500 p-4 w-96">
             <div className="flex justify-between items-center sm:h-2/4 md:h-auto">
                 <h2 className="text-xl font-bold">Cart items</h2>
                 <svg onClick={props.onClose} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                 </svg>
             </div>
                
             <div className="overflow-auto max-h-80 grid grid-cols-1 divide-gray-400 divide-y text-base">
             {cart.qty === 0 && <p className="my-4 text-center text-lg text-gray-700">Cart is empty</p>}
             {cart.qty > 0 && data}
             </div>
             <div className="mt-6 flex justify-between px-8">
                 <button onClick={props.onClose} className="bg-red-500 py-2 px-4 rounded-md w-24 text-white">Cancel</button>
                 <button onClick={handleCheckout} className={ color + " py-2 px-4 rounded-md w-24 text-white"} disabled={isDisabled}>Checkout</button>
             </div>
            </div>
        </div>
       )
}

export default CartModal