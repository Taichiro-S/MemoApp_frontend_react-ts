import { create } from 'zustand'

export type PageState = {
  page: number
  setPage: (page: number) => void
  totalPage: number
  setTotalPage: (totalPage: number) => void
}

export const usePageStore = create<PageState>((set) => ({
  page: 1,
  setPage: (page: number) => set({ page: page }),
  totalPage: 1,
  setTotalPage: (totalPage: number) => set({ totalPage: totalPage }),
}))
