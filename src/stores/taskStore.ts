import { create } from 'zustand'
import { Task } from 'types/types'

export type TaskState = {
  editedTaskId: number
  currentPageTasks: Task[]
  isDelete: boolean
  updateEditedTaskId: (id: number) => void
  setCurrentPageTasks: (tasks: Task[]) => void
  setIsDelete: (isDelete: boolean) => void
}

export const useTaskStore = create<TaskState>((set) => ({
  editedTaskId: 0,
  currentPageTasks: [],
  isDelete: false,
  updateEditedTaskId: (id) => set({ editedTaskId: id }),
  setCurrentPageTasks: (tasks) => set({ currentPageTasks: tasks }),
  setIsDelete: (isDelete) => set({ isDelete: isDelete }),
}))
