import Link from "next/link"
import { useState } from "react"
import { useSelector } from "react-redux"
import CartModal from "./CartModal"

const HeaderNotLogin = () => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const [showCart, setShowCart] = useState(false)
    const [showMobileNav, setShowMobileNav] = useState(false)

    const showCartHandler = () => {
      setShowCart(true)
    }

    const hideCartHandler = () => {
      setShowCart(false)
    }

    const cart = useSelector(state => state.cart)
    return <>
    {showCart && <CartModal onClose={hideCartHandler}/>}
    <header className="bg-gray-200 sticky top-0 w-full mb-7">
        <div className="flex justify-between p-4 items-center">
            <h1 className="text-xl font-bold">Toko Mafia</h1>
            {!isLoggedIn && <button className="bg-blue-500 py-2 px-4 text-white"><Link href="/login">Login</Link></button>}
            {isLoggedIn && <><div className="hidden md:block"><button onClick={showCartHandler} className="h-10 px-5 transition-colors duration-150 bg-gray-200 text-black rounded-lg focus:shadow-outline hover:bg-yellow-500">
  <span class="mr-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
</svg> Cart</span>
  <span class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full"> {cart.qty}</span>
</button>
<Link href="/transaction"><button className="ml-4 h-10 inline-block px-5 transition-colors duration-150 bg-gray-200 text-black rounded-lg focus:shadow-outline hover:bg-red-500">
  <span className="mr-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-5  inline-block" viewBox="0 0 20 20" fill="currentColor">
  <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
  <path fill-rule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clip-rule="evenodd" />
</svg> Transaction</span>
  </button></Link></div>
  <div className="flex space-x-6 md:hidden">
  <div className="md:hidden">
      <button onClick={showCartHandler}>
      <span class="relative inline-block">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
  <span class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{cart.qty}</span>
</span>
      </button>
    </div>
    <div className="md:hidden">
      <button onClick={() => {setShowMobileNav(!showMobileNav)}}><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
</svg></button>
    </div></div>
  </>}
        </div>
        {showMobileNav && <div className="md:hidden flex justify-end">
          <div className="w-full text-right py-2 px-4 space-y-1">
            <div className="hover:bg-gray-300 p-2"><Link href="/"><button className="w-full">Home</button></Link></div>
            <div className="hover:bg-gray-300 p-2"><Link href="/transaction"><button className="w-full">Transaction</button></Link></div>
          </div>
        </div>}
    </header>
    </>
}

export default HeaderNotLogin