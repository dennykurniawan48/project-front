import CustomHead from '../components/CustomHead'
import Link from 'next/link'
import Modal from '../components/Modal'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { authAction } from '../store/auth'
import { useRouter } from 'next/router'

export default function Login() {

    const loggedIn = useSelector(state => state.auth.isLoggedIn);
    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
      const token = localStorage.getItem('_token')
      if(token){
        dispatch(authAction.login({token: token}))
        router.replace('/')
      }
    }, [loggedIn])

    const [successRegister, setSuccessRegister] = useState(false)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [openModal, setOpenModal] = useState(false)

    const emailRef = useRef()
    const passwordRef = useRef()

    const setModalClose = () => {
        setOpenModal(false)
    }
    const setModalOpen = () => {
        setOpenModal(true)
    }

    const registerHandler = () => {
      setSuccessRegister(true)
    }

    const loginHandler = async () => {
      setSuccessRegister(false)
      setError(false)
      setLoading(true)
      try{
          const response = await axios.post('login', {
              email: emailRef.current.value,
              password: passwordRef.current.value
          })
          if(response.data){
              setError(null)
              localStorage.setItem('_token', response.data.data.token)
              dispatch(authAction.login({token: response.data.data.token}))
          }
      }catch(e){
        console.log(e)
        if(e.response){
          if(e.response.data.error){
              if(e.response.data.error.email){
                  setError(e.response.data.error.email[0])
              }else if(e.response.data.error.password){
                  setError(e.response.data.error.password[0])
              }else{
                  setError("Error while login")
              }
          }
          else{
            setError("Error while login")
          }
        }
        else{
          setError("Error while login")
        }
          
      }finally{
          setLoading(false)
      }
    }

    const color = loading ? "bg-gray-300":"bg-blue-500"
    const isDisabled = loading ? "true" : ""

  return <>
  <CustomHead title="Login Page"/>
  <div className="h-screen grid md:grid-cols-2 md:bg-gray-100">
    <div className="col-span-1 flex flex-col justify-center md:p-24 mx-8">
      <img src="/img/toko.jpg" alt="logo" className=""/>
      <h1 className="mt-4 md:mt-8 font-bold text-base md:text-2xl sm:text-base md:leading-7 text-gray-500">Online shop terbaik untuk memenuhi kebutuhan belanja elekronik anda.</h1>
    </div>
    <div className="col-span-1 flex md:justify-center md:items-center sm:mt-4">
      <div className="rounded mx-4 md:mx-24 shadow-sm hover:shadow-lg border border-gray-300">
        <div>
            {successRegister && <p className="text-lg text-center ml-3 text-green-500 mt-3">Register success, please login.</p>}
            
        </div>
        <form className="p-6 w-full md:w-96">
          <input ref={emailRef} className="mt-1 w-full rounded-md text-lg p-2 border border-gray-400" type="text" placeholder="Email / Username"/>
          <input ref={passwordRef} className="mt-4 w-full rounded-md text-lg p-2 border border-gray-400" type="password" placeholder="Password" />
          <div>
            {error && <p className="text-sm text-center ml-3 text-red-500 mt-3">{error}</p>}
          </div>
          <button type="button" onClick={loginHandler} className={color + " w-full p-2 mt-4 rounded text-white"} disabled={isDisabled}>Login</button>
          <div className="my-4 flex justify-center text-blue-600 font-thin text-sm no-underline hover:underline">
            <Link href="/reset">Forgot password?</Link>
          </div>
          <div className="relative mt-4">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
                <span className="px-2 bg-white text-sm text-gray-500">
                Or
                </span>
            </div>
        </div>
          <div className="my-4 flex justify-center bg-green-500 py-2 text-indigo-50">
            <p className="cursor-pointer" onClick={setModalOpen}>Register new account</p>
          </div>
        </form>
      </div>
    </div>
  </div>
 {openModal && <Modal onClose={setModalClose} onRegister={registerHandler} />}
  </>
}
