import { api } from 'utils/axios'
import { FC } from 'react'

const Login: FC = () => {
  const register = async () => {
    await api.get('/sanctum/csrf-cookie').then(() => {
      api
        .post('/api/register', {
          name: 'test',
          email: 'test@co.jp',
          password: 'password',
          password_confirmation: 'password',
        })
        .then((res: any) => {
          console.log(res)
        })
        .catch((err: Error) => {
          console.error(err.message)
        })
    })
  }

  const login = async () => {
    await api.get('/sanctum/csrf-cookie').then(() => {
      api
        .post('/api/login', {
          email: 'test@co.jp',
          password: 'password',
        })
        .then((res: any) => {
          console.log(res)
        })
        .catch((err: Error) => {
          console.error(err.message)
        })
    })
  }
  const logout = async () => {
    const res = await api.post('/api/logout')
    console.log(res)
  }
  const user = async () => {
    await api.get('/sanctum/csrf-cookie').then(() => {
      api
        .get('/api/user')
        .then((res: any) => {
          console.log(res)
        })
        .catch((err: Error) => {
          console.error(err.message)
        })
    })
  }
  return (
    <div>
      <input type="text" placeholder="test" />
      <button className="border-2 p-2 bg-blue-400" onClick={register}>
        register
      </button>
      <button className="border-2 p-2 bg-blue-400" onClick={login}>
        login
      </button>
      <button className="border-2 p-2 bg-blue-400" onClick={logout}>
        logout
      </button>
      <button className="border-2 p-2 bg-blue-400" onClick={user}>
        user
      </button>
    </div>
  )
}

export default Login
