import { useQuery } from '@tanstack/react-query'
import { api } from 'utils/axios'
import { paginatedResponse, errorResponse } from 'types/types'

export const fetchTask = async (page: number = 1) => {
  try {
    const { data } = await api.get(`/api/v1/tasks?page=${page}`)
    return data
  } catch (e: any) {
    throw e.error
  }
}

export const useQueryTask = (page: number) => {
  const result = useQuery<paginatedResponse, errorResponse>(
    ['task', page],
    () => fetchTask(page),
    {
      keepPreviousData: true,
      staleTime: 5000,
    },
  )
  return result
}
