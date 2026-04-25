import axios from 'axios'

const apiInstance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000
})

// Add a request interceptor
apiInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    } else {
      console.log('You dont have a token')
    }
    return config // You must return the config
  },
  error => {
    // Handle request errors
    return Promise.reject(error)
  }
)

export {apiInstance as api}
