import { useDispatch, useSelector } from 'react-redux'
import { authAction } from '../store/auth'
import { useRouter } from 'next/router'
import axios from 'axios'
import HeaderNotLogin from '../components/HeaderNotLogin'
import Constant from '../components/Constant'
import Link from 'next/link'

export default function Home(props) {
  const dispatch = useDispatch()
  const loggedIn = useSelector(state => state.auth.isLoggedIn);
  const router = useRouter()

  console.log(props.data)

  const data = props.data.map(item => 
  <div className="m-6 h-1/6">
    <img className="w-full object-center" src={Constant.BaseUrl + item.main_image}/>
    <h1 className="text-left mt-2 h-9 text-sm mx-2 text-gray-700">
      {item.product_name}
    </h1>
    <Link href={`/${item.id}`}><button className="w-full bg-blue-500 my-2 p-2 text-white">Detail</button></Link>
  </div>)

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
    <HeaderNotLogin/>
    <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6" >
      {data}
    </div>
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
