import { create } from 'zustand'

export type TaskState = {
  EditedTaskId: string
  updateEditedTaskId: (id: string) => void
}

export const useTaskStore = create<TaskState>((set, get) => ({
  EditedTaskId: '',
  updateEditedTaskId: (id: string) => set({ EditedTaskId: id }),
}))
