import { useMutation, useQueryClient } from '@tanstack/react-query'
import { errorToast } from 'utils/toast'
import { LOGOUT_ERROR } from 'constants/authMessages'
import { api } from 'utils/axios'
import { LogInUserData, SignUpUserData } from 'types/types'

export const useMutateAuth = () => {
  const queryClient = useQueryClient()
  const loginMutation = useMutation({
    mutationFn: async (login: LogInUserData) => {
      let res: any
      try {
        await api.get('/sanctum/csrf-cookie')
        res = await api.post('/api/login', {
          email: login.email,
          password: login.password,
        })
        console.log(res)
      } catch (e: any) {
        throw e.error
      }
      return res.data
    },
    onSuccess: async () => {
      const { data: user } = await api.get('/api/user')
      queryClient.invalidateQueries(['user'], user)
    },
    onError: (error: any) => {
      throw new Error('Failed to login', error)
    },
  })

  const signupMutation = useMutation({
    mutationFn: async (signup: SignUpUserData) => {
      let res: any
      try {
        await api.get('/sanctum/csrf-cookie')
        res = await api.post('/api/register', {
          name: signup.name,
          email: signup.email,
          password: signup.password,
          password_confirmation: signup.repassword,
        })
        console.log(res)
      } catch (e: any) {
        throw e.error
      }
      return res.data
    },
    onSuccess: async () => {
      const { data: user } = await api.get('/api/user')
      queryClient.invalidateQueries(['user'], user)
    },
    onError: (error: any) => {
      throw new Error('Failed to signup', error)
    },
  })

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await api.post('/api/logout')
      if (!res) {
        errorToast(LOGOUT_ERROR)
        throw new Error('Failed to logout')
      }
    },
    onSuccess: () => {
      queryClient.clear()
    },
    onError: (error: Error) => {
      throw new Error('Failed to logout', error)
    },
  })
  return {
    loginMutation,
    signupMutation,
    logoutMutation,
  }
}
