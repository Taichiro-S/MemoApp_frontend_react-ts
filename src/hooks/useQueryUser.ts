import { useQuery } from '@tanstack/react-query'
import { api } from 'utils/axios'

const getUser = async () => {
  // await api.get('/sanctum/csrf-cookie')
  const response = await api.get('/api/user')
  return response
}

export const useQueryUser = () => {
  return useQuery(['user'], getUser)
}
