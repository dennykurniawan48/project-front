import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import HeaderNotLogin from "../components/HeaderNotLogin"
import { authAction } from "../store/auth"
import Link from 'next/link'

const BecomeSeller = () => {
    const [errorMessage, setErrorMessage] = useState(null)
    const [candidateSeller, setSeller] = useState(false)
    const dispatch = useDispatch()
    const nameRef = useRef()
    const [errorSend, setErrorSend] = useState(null)
    const [success, setSuccess] = useState(null)

    useEffect(async () => {
        setSeller(false)
        const token = localStorage.getItem('_token')
        if(token){
            dispatch(authAction.login({token}))
        }
        try{
            const response = await axios.get('becomeseller', {
                headers: { Authorization: `Bearer ${token}` }
            })
            console.log(response)
            setSeller(true)
        }catch(e){
            if(e.response){
                setSeller(false)
                switch(e.response.status){
                    case 401:{
                        setErrorMessage("You need to login to view this page")
                        break
                    }case 403:{
                        setErrorMessage("You need to login to view this page")
                        break
                    }
                    case 409:{
                        try{
                            setErrorMessage(e.response.data.error)
                        }catch(e){
                            setErrorMessage("You are already a seller")
                        }
                        break
                    }
                    default: {
                        setErrorMessage("Unknown error")
                        break
                    }
                }
            }
        }
    }, [])

    const handleRegister = async () => {
        setSuccess(null)
        const token = localStorage.getItem('_token')
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try{
            const response = await axios.post('becomeseller', {
                'name': nameRef.current.value
            }, config)
            setSuccess(true)
            setErrorSend(null)
        }catch(e){
            setErrorSend("Error when registering")
            setSuccess(false)
        }
        
    }

    return (
    <><HeaderNotLogin/>
        <div className="flex justify-center">
             
        {candidateSeller && !errorMessage && <div className="m-2 w-80">
             <p>Please fill form to be a partner</p>
             <div>
                <input ref={nameRef} type="text" className="w-full mt-2 p-2 border border-gray-400 rounded-md" placeholder="Your shop name"/>
             </div>
             <div className="text-red-600"><p>{errorSend}</p></div>
             {success && <div className="text-center"><p>Success Registering<br/>Please <Link href="/"><span className="underline cursor-pointer">Login</span></Link></p></div>}
             <div><button onClick={handleRegister} className="text-white bg-green-500 w-full p-2 mt-4">Become Seller</button></div>
        </div>}
        {!candidateSeller && errorMessage && <div className="m-2"><p>{errorMessage}</p></div>}
        </div></>
    )
}

export default BecomeSeller