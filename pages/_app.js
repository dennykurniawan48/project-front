import axios from 'axios'
import { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import 'tailwindcss/tailwind.css'
import Constant from '../components/Constant'
import store from '../store'

function MyApp({ Component, pageProps }) {
  axios.defaults.baseURL = Constant.BaseUrl

  return <Provider store={store}>
  <Component {...pageProps} />
  </Provider>
}

export default MyApp
