import { useQueryClient, useMutation } from '@tanstack/react-query'
import { api } from 'utils/axios'
import { NewTask, UpdatedTask, DeletedTask } from 'types/types'

export const useMutateTask = () => {
  const queryClient = useQueryClient()

  const createTaskMutation = useMutation({
    mutationFn: async (newTask: NewTask) => {
      let res: any
      try {
        res = await api.post('/api/v1/tasks', {
          user_id: newTask.userId,
          title: newTask.title,
          description: newTask.description,
          completed: newTask.completed,
        })
        console.log(res)
      } catch (e: any) {
        throw e.error
      }
      return res.data
    },
    onSuccess: async () => {
      queryClient.invalidateQueries(['task', 1])
    },
    onError: (error: any) => {
      throw new Error('Failed to create task', error)
    },
  })

  const updateTaskMutation = useMutation({
    mutationFn: async (updatedTask: UpdatedTask) => {
      // console.log(updatedTask)
      let res: any
      try {
        res = await api.put(`/api/v1/tasks/${updatedTask.id}`, {
          title: updatedTask.title,
          description: updatedTask.description,
          completed: updatedTask.completed,
        })
        console.log(res)
      } catch (e: any) {
        throw e.error
      }
      return res.data
    },
    onSuccess: async (res: any, variables: any) => {
      console.log(res, variables)
      queryClient.invalidateQueries(['task'])
    },
    onError: (error: any) => {
      throw new Error('Failed to update task', error)
    },
  })

  const deleteTaskMutation = useMutation({
    mutationFn: async (deletedTask: DeletedTask) => {
      let res: any
      try {
        res = await api.delete(`/api/v1/tasks/${deletedTask.id}`)
        console.log(res)
      } catch (e: any) {
        throw e.error
      }
      return res
    },
    onSuccess: async (_, variables: any) => {
      console.log(variables)
      queryClient.invalidateQueries(['task'])
    },
    onError: (error: any) => {
      throw new Error('Failed to delete task', error)
    },
  })

  return {
    createTaskMutation,
    updateTaskMutation,
    deleteTaskMutation,
  }
}
