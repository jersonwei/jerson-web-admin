import axios from 'axios'

const serviceInstance = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 3000
})

export default serviceInstance
