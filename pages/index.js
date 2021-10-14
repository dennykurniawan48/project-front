import { useDispatch, useSelector } from 'react-redux'
import { authAction } from '../store/auth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Home() {
  const dispatch = useDispatch()
  const loggedIn = useSelector(state => state.auth.isLoggedIn);
  const router = useRouter()

  useEffect(() => {
    console.log("Call token" + loggedIn)
    const token = localStorage.getItem('_token')
    if(!token){
      dispatch(authAction.logout())
      router.replace('/login')
    }
  }, [loggedIn])
  const logoutHandler = () => {
    localStorage.removeItem('_token')
    dispatch(authAction.logout())
  }

  if(loggedIn){
  return <>
    <button onClick={logoutHandler}>Logout</button>
  </>
  }else{
    return <></>
  }
}
