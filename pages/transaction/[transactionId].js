import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Constant from "../../components/Constant"
import HeaderNotLogin from "../../components/HeaderNotLogin"
import { authAction } from "../../store/auth"

const DetailTransaction = () => {
    const router = useRouter()
    const transactionId = router.query.transactionId
    const [success, setSuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const [dataTransaction, setDataTransaction] = useState({})
    const dispatch = useDispatch()

    const loggedIn = useSelector(state => state.auth.isLoggedIn)

    useEffect(() => {
        const token = localStorage.getItem('_token')
        if(token){
            dispatch(authAction.login({token}))
        }
    }, [])

    

    useEffect(async () => {
        setSuccess(false)
        if(transactionId){
            try{
                const token = localStorage.getItem('_token')
                const response = await axios.get('transaction/' + transactionId, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setDataTransaction(response.data)
                setSuccess(true)
            }catch(e){
                if(e.response){
                    switch(e.response.status){
                        case 404: {
                            setErrorMessage("Sorry transaction not found")
                            break;
                        }
                        case 403: {
                            setErrorMessage("Sorry you dont have access to this resources")
                            break;
                        }
                        case 401:{
                            setErrorMessage("You need to login to view this resources")
                            break;
                        }
                    }
                }
            }
        }
        
    }, [transactionId, errorMessage])

    const totalTransaction = success ? dataTransaction.products.reduce(function(accumulator, newValue){
        return accumulator + newValue.pivot.price * newValue.pivot.qty;
    }, 0) : 0

    const transactionItem = success ? dataTransaction.products.map(item => 
        <div>
            <div className="pt-3 flex items-center text-xs">
                <img src={Constant.BaseUrl + item.main_image} className="max-h-10 w-10 object-cover mr-2"/>
                <span className="w-56">{item.product_name}</span>
                <div className="flex justify-between w-40">
                    <p>{item.pivot.qty} X </p>
                    <p>${item.pivot.price}</p>
                    <p className="font-bold">${item.pivot.price * item.pivot.qty}</p>
                </div>
            </div>
        </div>) : null

   
    return <>
        <HeaderNotLogin/>
        {!loggedIn && !errorMessage && <div className="p-2 bg-blue-700">
            <p className="text-lg text-white">Sorry you need login to view this resources</p>
            </div>}
        {loggedIn && errorMessage && <div className="p-2 bg-blue-700">
            <p className="text-lg text-white">{errorMessage}</p>
            </div>}
        {loggedIn && success && <div className="flex items-center justify-center">
            <div className="border-2 w-96 max-w-md md:w-4/6 grid grid-cols-1 divide-y">
                <div class="p-2 m-3 text-center text-xl">
                    <p>Detail Transaction</p>
                </div>
               <div className="p-2 ml-3 space-y-1">
                    <div>
                        <p className="inline-block w-24">Order code</p><p className="inline-block">: {dataTransaction.code_transaction}</p>
                    </div>
                    <div >
                        <p className="inline-block w-24">Order date</p>
                        <p className="inline-block">: {new Date(dataTransaction.created_at).toDateString()}</p>
                    </div>
                    <div>
                        <p className="inline-block w-24">Name</p>
                        <p className="inline-block">: {dataTransaction.name}</p>
                    </div>
                    <div>
                        <p className="inline-block w-24">Address</p>
                        <p className="inline-block">: {dataTransaction.address}</p>
                    </div>
                    <div>
                        <div className="divide-x"></div>
                    </div>
                   
                </div>
                <div className="p-2 ml-3 space-y-1">
                    {transactionItem}
                </div>
                <div className="p-2 ml-3 space-y-1 flex justify-end items-center">
                <p className="w-24">Total: </p><p className="font-bold">${totalTransaction}</p>
                </div>
            </div>
        </div>}
        
    </>
}

export default DetailTransaction