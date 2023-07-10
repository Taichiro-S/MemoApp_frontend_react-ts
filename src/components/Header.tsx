import Button from '@mui/material/Button'
import { Link, useNavigate } from 'react-router-dom'
import LoginIcon from '@mui/icons-material/Login'
import { FC, FormEvent } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { User } from 'types/types'
import { successToast, errorToast } from 'utils/toast'
import { useMutateAuth } from 'hooks'

const Header: FC = () => {
  const queryClient = useQueryClient()
  const user = queryClient.getQueryData<User | null | undefined>(['user'])
  const navigate = useNavigate()
  const { logoutMutation } = useMutateAuth()
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const variables = void 0
    logoutMutation.mutate(variables, {
      onSuccess: () => {
        successToast('ログアウトしました')
        return navigate('/login')
      },
      onError: () => {
        errorToast('ログアウトに失敗しました')
      },
    })
  }
  if (!user) return null
  return (
    <nav className="bg-neutral-800 h-10 flex items-center">
      <div className="w-screen mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex justify-between items-center">
          <Link to="/">
            <p className="text-lg text-neutral-50 font-bold flex items-center">
              Memo App
            </p>
          </Link>
          <div className="flex justify-end items-center">
            <li className="ml-2">
              <form onSubmit={handleSubmit}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<LoginIcon />}
                  size="small"
                  type="submit"
                  style={{
                    backgroundColor: '#f87171',
                  }}
                >
                  Logout
                </Button>
              </form>
            </li>
          </div>
        </ul>
      </div>
    </nav>
  )
}

export default Header
