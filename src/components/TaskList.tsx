import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { memo } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Task } from 'types/types'

const TaskList = () => {
  const queryClient = useQueryClient()
  const tasks = queryClient.getQueryData<Task[]>(['task'])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks?.map((task) => (
            <TableRow
              key={task.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="task">
                {task.title}
              </TableCell>
              <TableCell align="right">{task.description}</TableCell>
              <TableCell align="right">{task.priority}</TableCell>
              <TableCell align="right">{task.completed}</TableCell>
              <TableCell align="right">{task.start}</TableCell>
              <TableCell align="right">{task.end}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default memo(TaskList)
