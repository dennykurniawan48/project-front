/* This example requires Tailwind CSS v2.0+ */

import axios from "axios"
import { useRef } from "react"

export default function Modal(props) {

    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()

    const handleRegister = async () => {
        try{
            const response = await axios.post('register', {
                first_name: firstNameRef.current.value,
                last_name: lastNameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value
            })
            console.log(response)
        }catch(e){
            console.log(e.response)
        }finally{

        }
    }

  return (
   <div className="bg-black inset-0 absolute bg-opacity-50 text-white flex justify-center items-center">
       <div className="bg-white border-1 border-gray-500 text-gray-500 p-4 w-96">
        <div className="flex justify-between items-center sm:h-2/4 md:h-auto">
            <h2 className="text-xl font-bold">Create new Account</h2>
            <svg onClick={props.onClose} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </div>
        <div className="mt-4 md:space-x-3 sm:space-x-2 sm:grid sm:grid-cols-2">
            <div>
            <input type="text" ref={firstNameRef} placeholder="First Name" className="p-2 w-full md:w-40 border border-gray-200" />
            </div>
            <div className="mt-4 md:mt-0">
            <input type="text" ref={lastNameRef} placeholder="Last Name" className="p-2 w-full md:w-40 border border-gray-200" />
            </div>
        </div>
        <div className="mt-4">
            <input type="email" ref={emailRef} placeholder="Email" className="p-2 w-full border border-gray-200" />
        </div>
        <div className="mt-4">
            <input type="password" ref={passwordRef} placeholder="Password" className="p-2 w-full border border-gray-200" />
        </div>
        <div className="mt-4 flex justify-between px-8">
            <button onClick={props.onClose} className="bg-red-500 py-2 px-4 rounded-md w-24 text-white">Cancel</button>
            <button onClick={handleRegister} className="bg-green-500 py-2 px-4 rounded-md w-24 text-white">Ok</button>
        </div>
       </div>
   </div>
  )
}