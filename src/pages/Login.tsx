import { useForm } from 'react-hook-form'
import { useMutateAuth } from 'hooks/useMutateAuth'
import { Layout } from 'components'
import { LogInUserData, errorResponse } from 'types/types'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from 'schema/loginSchema'
import { TextField, Button, Card } from '@mui/material'
import { successToast, errorToast } from 'utils/toast'
import {
  LOGIN_SUCCESS,
  INVALID_LOGIN_CREDENTIALS,
  LOGIN_ERROR,
} from 'constants/authMessages'
import LoginIcon from '@mui/icons-material/Login'
import styled from '@emotion/styled'
import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useQueryAuth } from 'hooks'
// import { toast } from 'react-toastify'

const CustomCard = styled(Card)`
  width: 330px;
  background-color: #fafafa;
  margin: 0 auto;
  padding: 1rem;
  border-radius: 0.5rem;
`

const CustomTextField = styled(TextField)`
  width: 100%;
`

const Login: FC = () => {
  const navigate = useNavigate()
  const { loginMutation } = useMutateAuth()
  const { status: userStatus, data: user, error: userError } = useQueryAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInUserData>({
    mode: 'onSubmit',
    resolver: yupResolver(loginSchema),
  })
  const onSubmit = async (data: LogInUserData) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        successToast(LOGIN_SUCCESS)
      },
      onError: (error: errorResponse) => {
        console.log(error)
        if (error.status === 422 && error.data.message === 'auth.failed') {
          errorToast(INVALID_LOGIN_CREDENTIALS)
        } else {
          errorToast(LOGIN_ERROR)
        }
      },
    })
  }
  if (userStatus === 'success' && user) {
    navigate('/')
    return null
  }
  if (userStatus === 'error' && userError) {
    if (userError.status !== 401) {
      return <Layout>サーバーとの接続でエラーが発生しました</Layout>
    }
  }

  return (
    <Layout>
      <div>
        <h1 className="text-3xl text-center mb-4 text-neutral-800">ログイン</h1>
      </div>
      <CustomCard>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="m-2">
            <CustomTextField
              id="email"
              label="メールアドレス"
              {...register('email')}
              helperText={errors?.email?.message}
              error={!!errors?.email}
            />
          </div>
          <div className="m-2">
            <CustomTextField
              id="password"
              label="パスワード"
              type="password"
              {...register('password')}
              helperText={
                errors?.password?.message || '8-20 文字で入力してください'
              }
              error={!!errors?.password}
            />
          </div>
          <div className="m-2 flex justify-center">
            <Button
              startIcon={<LoginIcon />}
              variant="outlined"
              type="submit"
              style={{ width: '100%' }}
            >
              ログイン
            </Button>
          </div>
        </form>
      </CustomCard>
      <div className="m-2 mt-4">
        <span className="text-sm text-neutral-600">
          アカウントをお持ちでない方は
          <Link to="/signup">
            <span className="text-blue-400 hover:text-blue-600">こちら</span>
          </Link>
        </span>
      </div>
    </Layout>
  )
}

export default Login
