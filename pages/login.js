import CustomHead from '../components/CustomHead'
import Link from 'next/link'
import Modal from '../components/Modal'
import { useState } from 'react'

export default function Login() {

    const [successRegister, setSuccessRegister] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const setModalClose = () => {
        setOpenModal(false)
    }
    const setModalOpen = () => {
        setOpenModal(true)
    }

    const registerHandler = () => {
      setSuccessRegister(true)
    }

  return <>
  <CustomHead title="Index Page"/>
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
          <input className="mt-1 w-full rounded-md text-lg p-2 border border-gray-400" type="text" placeholder="Email / Username"/>
          <input className="mt-4 w-full rounded-md text-lg p-2 border border-gray-400" type="password" placeholder="Password" />
          <button className="w-full p-2 mt-4 bg-blue-500 rounded text-white">Login</button>
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
