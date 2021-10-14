import Link from "next/link"
import { useState } from "react"
import { useSelector } from "react-redux"
import CartModal from "./CartModal"

const HeaderNotLogin = () => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const [showCart, setShowCart] = useState(false)

    const showCartHandler = () => {
      setShowCart(true)
    }

    const hideCartHandler = () => {
      setShowCart(false)
    }

    const cart = useSelector(state => state.cart)
    return <>
    {showCart && <CartModal onClose={hideCartHandler}/>}
    <header className="bg-white sticky top-0 w-full">
        <div className="flex justify-between p-4 items-center">
            <h1 className="text-xl font-bold">Toko Mafia</h1>
            {!isLoggedIn && <button className="bg-blue-500 py-2 px-4 text-white"><Link href="/login">Login</Link></button>}
            {isLoggedIn && <button onClick={showCartHandler} class="h-10 px-5 transition-colors duration-150 bg-gray-200 text-black rounded-lg focus:shadow-outline hover:bg-yellow-500">
  <span class="mr-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
</svg> Cart</span>
  <span class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full"> {cart.qty}</span>
</button>}
        </div>
    </header>
    </>
}

export default HeaderNotLogin