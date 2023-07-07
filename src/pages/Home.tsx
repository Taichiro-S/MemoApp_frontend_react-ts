import { useQueryClient } from '@tanstack/react-query'
import { Layout, Pagination, Spinner, TaskList } from 'components'
import { useQueryAuth, useQueryTask, fetchTask } from 'hooks'
import { FC, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { usePageStore } from 'stores/pageStore'
import Skeleton from '@mui/material/Skeleton'

const Home: FC = () => {
  const queryClient = useQueryClient()
  const page = usePageStore((state) => state.page)
  const setPage = usePageStore((state) => state.setPage)
  const setTotalPage = usePageStore((state) => state.setTotalPage)
  const navigate = useNavigate()
  const [query] = useSearchParams()
  const { status: userStatus, data: user, error: userError } = useQueryAuth()
  const {
    status: taskStatus,
    data: tasks,
    error: taskError,
    isFetching: isFetchingTasks,
    isPreviousData: isPreviousTasks,
  } = useQueryTask(page)

  useEffect(() => {
    if (!isPreviousTasks && tasks?.links.next) {
      queryClient.prefetchQuery(['task', page + 1], () => fetchTask(page + 1))
    }
  }, [page, isPreviousTasks, tasks, queryClient])

  useEffect(() => {
    if (tasks?.meta) {
      setTotalPage(tasks.meta.last_page)
    }
  }, [tasks])

  useEffect(() => {
    setPage(Number(query.get('page')) || 1)
  }, [query.get('page')])

  useEffect(() => {
    if (
      userStatus === 'error' &&
      userError.status === 401 &&
      userError.data.message === 'Unauthenticated.'
    ) {
      navigate('/login')
    }
  }, [userStatus, taskStatus])

  if (userStatus === 'loading' || taskStatus === 'loading') {
    return (
      <Layout>
        <Spinner />
      </Layout>
    )
  }

  if (
    (userStatus === 'error' && userError.status !== 401) ||
    taskStatus === 'error'
  ) {
    console.log(userError, taskError)
    return <Layout>サーバーとの接続でエラーが発生しました</Layout>
  }

  if (userStatus === 'success' && taskStatus === 'success' && user && tasks) {
    return (
      <Layout>
        <div className="mb-10">
          <p className="text-lg font-semibold">タスク一覧</p>
        </div>
        <div className="mb-10">
          {isFetchingTasks ? (
            <Skeleton variant="rounded" width={600} height={300} />
          ) : (
            <TaskList />
          )}
        </div>
        <div>
          <Pagination />
        </div>
      </Layout>
    )
  }
  return null
}

export default Home
