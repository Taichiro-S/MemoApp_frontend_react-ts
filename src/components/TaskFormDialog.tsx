import { yupResolver } from '@hookform/resolvers/yup'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import { NewTask, Task } from 'types/types'
import { taskSchema } from 'schema/taskSchema'
import { useForm } from 'react-hook-form'
import { FC, memo, useEffect, useState } from 'react'
import { useMutateTask } from 'hooks'
// import { useQueryClient } from '@tanstack/react-query'
import { successToast, errorToast } from 'utils/toast'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { usePageStore } from 'stores/pageStore'
// import { useTaskStore } from 'stores/taskStore'

type Props = {
  isDelete: boolean
  task?: Task
  userId: number
}

const FormDialog: FC<Props> = (props) => {
  const { isDelete, task, userId } = props
  //   const queryClient = useQueryClient()
  //   const taskId = useTaskStore((state) => state.editedTaskId)
  //   const currentPageTasks = useTaskStore((state) => state.currentPageTasks)
  //   const isDelete = useTaskStore((state) => state.isDelete)
  //   const task = currentPageTasks.find((task) => task.id === taskId)
  const page = usePageStore((state) => state.page)
  const [open, setOpen] = useState(false)
  const { createTaskMutation, updateTaskMutation, deleteTaskMutation } =
    useMutateTask()
  const handleClickOpen = () => {
    setOpen(true)
    reset({
      title: task ? task.title : '',
      description: task ? task.description : '',
      completed: task ? task.completed : false,
    })
  }

  const handleClose = () => {
    setOpen(false)
    reset({
      title: task ? task.title : '',
      description: task ? task.description : '',
      completed: task ? task.completed : false,
    })
  }

  let useFormSettings = {}

  if (isDelete) {
    useFormSettings = {
      mode: 'onSubmit',
    }
  } else {
    useFormSettings = {
      mode: 'onSubmit',
      resolver: yupResolver(taskSchema),
      defaultValues: {
        title: task ? task.title : '',
        description: task ? task.description : '',
        completed: task ? task.completed : false,
      },
    }
  }
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    setValue,
    reset,
    watch,
  } = useForm<NewTask>(useFormSettings)
  const publicValue = watch('completed')
  useEffect(() => {
    register('completed')
  }, [register])

  const onSubmit = async (data: Omit<NewTask, 'userId'>) => {
    if (!task) {
      createTaskMutation.mutate(
        {
          userId: userId,
          title: data.title,
          description: data.description,
          completed: data.completed,
        },
        {
          onSuccess: () => {
            successToast('タスクを作成しました')
            handleClose()
          },
          onError: () => {
            errorToast('タスクの作成に失敗しました')
            handleClose()
          },
        },
      )
    } else {
      if (isDelete) {
        deleteTaskMutation.mutate(
          { id: task.id, page: page },
          {
            onSuccess: () => {
              successToast('タスクを削除しました')

              handleClose()
            },
            onError: () => {
              errorToast('タスクの削除に失敗しました')
              handleClose()
            },
          },
        )
      } else {
        updateTaskMutation.mutate(
          {
            id: task.id,
            page: page,
            title: data.title,
            description: data.description,
            completed: data.completed,
          },
          {
            onSuccess: () => {
              successToast('タスクを更新しました')

              handleClose()
            },
            onError: () => {
              errorToast('タスクの更新に失敗しました')
              handleClose()
            },
          },
        )
      }
    }
  }

  return (
    <div>
      {!task && (
        <Button variant="outlined" onClick={handleClickOpen}>
          タスクを追加
        </Button>
      )}
      {task && isDelete && (
        <IconButton aria-label="delete" onClick={handleClickOpen}>
          <DeleteIcon color="error" />
        </IconButton>
      )}
      {task && !isDelete && (
        <IconButton aria-label="edit" onClick={handleClickOpen}>
          <EditIcon color="primary" />
        </IconButton>
      )}

      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>
            {!task && '新規タスク'}
            {task && isDelete && 'タスクを削除'}
            {task && !isDelete && 'タスクを編集'}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="タスク名"
              type="text"
              fullWidth
              defaultValue={task ? task.title : ''}
              variant="outlined"
              {...register('title')}
              helperText={touchedFields.title && errors?.title?.message}
              error={!!errors?.title}
              disabled={isDelete}
            />
            <TextField
              id="description"
              margin="dense"
              label="説明"
              multiline
              rows={3}
              fullWidth
              defaultValue={''}
              {...register('description')}
              helperText={touchedFields.title && errors?.description?.message}
              error={!!errors?.description}
              disabled={isDelete}
            />
            <div className="ml-4">
              <FormControlLabel
                control={
                  <Checkbox
                    {...register('completed')}
                    checked={publicValue}
                    onChange={(e) => setValue('completed', e.target.checked)}
                    disabled={isDelete}
                  />
                }
                label="ステータス"
              />
            </div>
            {isDelete && (
              <Alert severity="error">
                本当に削除してよろしいですか？
                <br />
                この操作は取り消せません
              </Alert>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>キャンセル</Button>
            <Button type="submit">
              {!task && '作成'}
              {task && isDelete && '削除'}
              {task && !isDelete && '更新'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default memo(FormDialog)
