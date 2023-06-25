import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  withCredentials: true,
})

api.interceptors.response.use(
  (response) => {
    return Promise.resolve(response)
  },
  (error) => {
    return Promise.reject({
      error: error.response,
    })
  },
)
