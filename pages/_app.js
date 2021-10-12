import axios from 'axios'
import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }) {
  axios.defaults.baseURL = 'http://localhost:8000/'
  return <Component {...pageProps} />
}

export default MyApp
