import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:80',
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  withCredentials: true,
})
