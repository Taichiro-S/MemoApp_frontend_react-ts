import Button from '@mui/material/Button'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import LoginIcon from '@mui/icons-material/Login'
import { FC, FormEvent } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { User } from 'types/types'
import { successToast, errorToast } from 'utils/toast'
import { useMutateAuth } from 'hooks'

const Header: FC = () => {
  const queryClient = useQueryClient()
  const user = queryClient.getQueryData<User | null | undefined>(['user'])
  const location = useLocation()
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
  return (
    <nav className="bg-neutral-800 h-10 flex items-center">
      <div className="w-screen mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex justify-between items-center">
          <Link to="/">
            <p className="text-lg text-neutral-50 font-bold flex items-center">
              FullCalendar
            </p>
          </Link>
          <div className="flex justify-end items-center">
            {!user ? (
              <>
                <li>
                  <Link to="/">
                    <span
                      className={
                        location.pathname === '/'
                          ? ' text-blue-400 mx-1 px-2 py-2 border-t-2 border-blue-400 text-sm font-medium'
                          : ' text-gray-400 hover:bg-gray-700 hover:text-white mx-1 px-2 py-2 rounded-md text-sm font-medium'
                      }
                    >
                      Home
                    </span>
                  </Link>
                </li>
                <li className="ml-2">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      navigate('/login')
                    }}
                    startIcon={<LoginIcon />}
                    size="small"
                    style={{
                      backgroundColor: '#2196f3',
                    }}
                  >
                    Login
                  </Button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">
                    <span
                      className={
                        location.pathname === '/'
                          ? ' text-blue-400 mx-1 px-2 py-2 border-t-2 border-blue-400 text-sm font-medium'
                          : ' text-gray-400 hover:bg-gray-700 hover:text-white mx-1 px-2 py-2 rounded-md text-sm font-medium'
                      }
                    >
                      Home
                    </span>
                  </Link>
                </li>
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
              </>
            )}
          </div>
        </ul>
      </div>
    </nav>
  )
}

export default Header
