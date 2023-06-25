import { useQuery } from '@tanstack/react-query'
import { api } from 'utils/axios'
import { Task, errorResponse } from 'types/types'

export const useQueryTask = () => {
  const result = useQuery<Task, errorResponse>(['task'], async () => {
    try {
      const { data } = await api.get('/api/tasks')
      return data
    } catch (e: any) {
      throw e.error
    }
  })
  return result
}
