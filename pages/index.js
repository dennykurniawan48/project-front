import { useDispatch, useSelector } from 'react-redux'
import { authAction } from '../store/auth'
import { useRouter } from 'next/router'
import axios from 'axios'
import HeaderNotLogin from '../components/HeaderNotLogin'
import Constant from '../components/Constant'

export default function Home(props) {
  const dispatch = useDispatch()
  const loggedIn = useSelector(state => state.auth.isLoggedIn);
  const router = useRouter()

  console.log(props.data)

  const data = props.data.map(item => <div className="ml-3 mt-3"><img src={Constant.BaseUrl + item.main_image}/><h1>{item.product_name}</h1></div>)

  // useEffect(() => {
  //   console.log("Call token" + loggedIn)
  //   const token = localStorage.getItem('_token')
  //   if(!token){
  //     dispatch(authAction.logout())
  //     router.replace('/login')
  //   }
  // }, [loggedIn])

  const logoutHandler = () => {
    localStorage.removeItem('_token')
    dispatch(authAction.logout())
  }

  return <div>
  {!loggedIn && <HeaderNotLogin/>}
  <div className="m-4 grid grid-cols-3" >
    {data}
  </div>
    <button onClick={logoutHandler}>Logout</button>
  </div>

}

export const getStaticProps = async() => {
  let data = []
  try{
    const response = await axios.get('/products')
    data = response.data.data
    console.log(data)
  }catch(e){
    console.log(e.response.data)
  }finally{
    return {
      props:{
        data
      }
    }
  }
}
