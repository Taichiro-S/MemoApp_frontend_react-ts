import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import { FC, memo, useEffect } from 'react'
import { useIsFetching, useQueryClient } from '@tanstack/react-query'
import { paginatedResponse, User } from 'types/types'
import { usePageStore } from 'stores/pageStore'
import { useTaskStore } from 'stores/taskStore'
import { TaskFormDialog } from 'components'
import { dateTimeFormat } from 'utils/dateTimeFormat'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

const TaskList: FC = () => {
  const page = usePageStore((state) => state.page)
  const queryClient = useQueryClient()
  const currentPageTasks = useTaskStore((state) => state.currentPageTasks)
  const setCurrentPageTasks = useTaskStore((state) => state.setCurrentPageTasks)
  const isFetching = useIsFetching({ queryKey: ['task', page] })

  useEffect(() => {
    if (!isFetching) {
      const pagenatedTasks = queryClient.getQueryData<paginatedResponse>([
        'task',
        page,
      ])
      setCurrentPageTasks(pagenatedTasks?.data || [])
    }
  }, [page, isFetching])

  const user = queryClient.getQueryData<User>(['user'])
  if (!user) return null

  if (isFetching) {
    return null
  }

  return (
    <>
      <TaskFormDialog isDelete={false} task={undefined} userId={user.id} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">タイトル</StyledTableCell>
              <StyledTableCell align="center">ユーザ名</StyledTableCell>
              <StyledTableCell align="center">ステータス</StyledTableCell>
              <StyledTableCell align="center">作成日</StyledTableCell>
              <StyledTableCell align="center">更新日</StyledTableCell>
              <StyledTableCell align="center">更新</StyledTableCell>
              <StyledTableCell align="center">削除</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPageTasks?.map((task) => (
              <StyledTableRow key={task.id}>
                <TableCell component="th" scope="row" align="center">
                  {task.title}
                </TableCell>
                <TableCell align="center">{task.user.name}</TableCell>
                <TableCell align="center">
                  {task.completed ? '完了' : '未完了'}
                </TableCell>
                <TableCell align="center">
                  {dateTimeFormat(task.createdAt)}
                </TableCell>
                <TableCell align="center">
                  {dateTimeFormat(task.updatedAt)}
                </TableCell>

                {task.userId === user?.id ? (
                  <>
                    <TableCell align="center">
                      <TaskFormDialog
                        isDelete={false}
                        task={task}
                        userId={user.id}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TaskFormDialog
                        isDelete={true}
                        task={task}
                        userId={user.id}
                      />
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </>
                )}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
export default memo(TaskList)
