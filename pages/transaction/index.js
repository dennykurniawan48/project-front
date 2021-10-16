import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import HeaderNotLogin from "../../components/HeaderNotLogin"
import { authAction } from "../../store/auth"

const Transaction = () => {
    const route = useRouter
    const [transaction, setTransaction] = useState([])
    const [error, setError] = useState(null)
    const loggedIn = useSelector(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()
    useEffect(async () => {
        const token = localStorage.getItem('_token')
        if(token){
          dispatch(authAction.login({token: token}))
          try{
            const response = await axios.get('/transaction',{
                headers: { Authorization: `Bearer ${token}` }
            })
            console.log(response.data)
            setTransaction(response.data.data)
          }catch(e){

          }
        }else{
            route.replace('/login')
        }
      }, [loggedIn])

      const items = transaction.map(item => 
            <div className=" flex justify-between items-center">
                <div key={item.code_transaction} className="p-2 ml-3">
                <p>{item.code_transaction}</p>
                <div className="flex justify-between items-center">
                    <p className="w-60">{new Date(item.created_at).toDateString()}</p>
                    <div className="divide-x"></div>
                </div>
            </div>
            <div className="text-right w-20 md:w-32 font-bold">
            <button className="p-2 mr-2 bg-blue-700 text-white rounded-sm">Detail</button>
        </div></div>)
    return <>
    <HeaderNotLogin/>
    
    <div className="flex items-center justify-center">
    
        <div className="border-2 w-96 max-w-md md:w-4/6 grid grid-cols-1 divide-y">
        <div class="p-2 m-3 text-center text-xl font-bold">
           <p>List Transaction</p>
        </div>
         {items}
        </div>
    </div>


    </>
}

export default Transaction