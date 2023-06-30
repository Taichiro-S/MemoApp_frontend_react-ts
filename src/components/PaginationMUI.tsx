import Pagination from '@mui/material/Pagination'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePageStore } from 'stores/pageStore'

const PaginationMUI: FC = () => {
  const page = usePageStore((state) => state.page)
  const setPage = usePageStore((state) => state.setPage)
  const totalPage = usePageStore((state) => state.totalPage)
  const navigate = useNavigate()
  return (
    <Pagination
      count={totalPage}
      page={page}
      variant="outlined"
      shape="rounded"
      color="primary"
      onChange={(event: React.ChangeEvent<unknown>, page: number) => {
        setPage(page)
        navigate(`?page=${page}`)
      }}
    />
  )
}

export default PaginationMUI
