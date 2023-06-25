import { Layout, Spinner } from 'components'
import { useQueryAuth, useQueryTask } from 'hooks'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const { status: userStatus, data: user, error: userError } = useQueryAuth()
  const { status: taskStatus, data: tasks, error: taskError } = useQueryTask()

  if (userStatus === 'loading' || taskStatus === 'loading') {
    return (
      <Layout>
        <Spinner />
      </Layout>
    )
  }
  if (userStatus === 'error' || taskStatus === 'error') {
    navigate('/login')
    console.log(userError)
    return null
  }
  if (userStatus === 'success' && taskStatus === 'success') {
    return <Layout>Home</Layout>
  }
  return null
}

export default Home
