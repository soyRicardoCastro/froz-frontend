import axios from 'axios'

export default axios.create(
  {
    baseURL: 'https://rest-api-froz.onrender.com'
  }
)
