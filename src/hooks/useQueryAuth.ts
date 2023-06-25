import { useQuery } from '@tanstack/react-query'
import { api } from 'utils/axios'
import { User, errorResponse } from 'types/types'

export const useQueryAuth = () => {
  const result = useQuery<User, errorResponse>(['user'], async () => {
    try {
      const { data } = await api.get('/api/user')
      return data
    } catch (e: any) {
      throw e.error
    }
  })
  return result
}
