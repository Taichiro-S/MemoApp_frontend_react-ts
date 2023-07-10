import { useForm } from 'react-hook-form'
import { useMutateAuth } from 'hooks/useMutateAuth'
import { Layout } from 'components'
import { SignUpUserData, errorResponse } from 'types/types'
import { yupResolver } from '@hookform/resolvers/yup'
import { signupSchema } from 'schema/signupSchema'
import { TextField, Button, Card } from '@mui/material'
import { successToast, errorToast } from 'utils/toast'
import { SIGNUP_SUCCESS, SIGNUP_ERROR } from 'constants/authMessages'
import LoginIcon from '@mui/icons-material/Login'
import styled from '@emotion/styled'
import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useQueryAuth } from 'hooks'

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

const Signup: FC = () => {
  const navigate = useNavigate()
  const { signupMutation } = useMutateAuth()
  const { status: userStatus, data: user, error: userError } = useQueryAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpUserData>({
    mode: 'onSubmit',
    resolver: yupResolver(signupSchema),
  })
  const onSubmit = async (data: SignUpUserData) => {
    // console.log('signup', data)
    signupMutation.mutate(data, {
      onSuccess: () => {
        successToast(SIGNUP_SUCCESS)
      },
      onError: (error: errorResponse) => {
        console.log(error)
        if (error.status === 422) {
          if (error.data.errors.email.includes('validation.unique')) {
            errorToast('既に登録されているメールアドレスです')
          }
          if (error.data.errors.name.includes('validation.unique')) {
            errorToast('既に登録されているユーザ名です')
          }
        } else {
          errorToast(SIGNUP_ERROR)
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
    <>
      <Layout>
        <div>
          <h1 className="text-3xl text-center mb-4 text-neutral-800">
            ユーザ登録
          </h1>
        </div>
        <CustomCard>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="m-2">
              <CustomTextField
                id="name"
                label="ユーザ名"
                {...register('name')}
                helperText={errors?.name?.message}
                error={!!errors?.name}
              />
            </div>
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
            <div className="m-2">
              <CustomTextField
                id="repassword"
                label="パスワード再入力"
                type="password"
                {...register('repassword')}
                helperText={errors?.repassword?.message}
                error={!!errors?.repassword}
              />
            </div>
            <div className="m-2 flex justify-center">
              <Button
                startIcon={<LoginIcon />}
                variant="outlined"
                type="submit"
                style={{ width: '100%' }}
              >
                登録
              </Button>
            </div>
          </form>
        </CustomCard>
        <div className="m-2 mt-4">
          <span className="text-sm text-neutral-600">
            アカウントをお持ちの方は
            <Link to="/login">
              <span className="text-blue-400 hover:text-blue-600">こちら</span>
            </Link>
          </span>
        </div>
      </Layout>
    </>
  )
}

export default Signup
