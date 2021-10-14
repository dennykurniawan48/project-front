import axios from 'axios'
import { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import 'tailwindcss/tailwind.css'
import store from '../store'

function MyApp({ Component, pageProps }) {
  axios.defaults.baseURL = 'http://localhost:8000/'

  return <Provider store={store}>
  <Component {...pageProps} />
  </Provider>
}

export default MyApp
