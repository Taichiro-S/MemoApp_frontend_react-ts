import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

// Define a function to fetch user data
const getUser = async () => {
  // First, get CSRF cookie
  await axios.get('/sanctum/csrf-cookie')

  // Then make the request for the user
  const response = await axios.get('/api/user')

  return response.data
}

// Custom hook to use the user query
export const useQueryUser = () => {
  return useQuery(['user'], getUser)
}
