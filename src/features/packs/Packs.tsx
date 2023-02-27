import React, { useEffect } from 'react'
import s from './Packs.module.css'
import { useAppDispatch } from '../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../common/hooks/useAppSelector'
import { getPacks, setPage, setPageCount } from './packsSlicer'
import { Title } from '../../common/components/Title/Title'
import { PacksTable } from './packsTable/PacksTable'
import { TablePagination } from '../../common/components/TablePagination/TablePagination'
import { SelectChangeEvent } from '@mui/material/Select'
import {
  selectPacksMax,
  selectPacksMin,
  selectPacksPage,
  selectPacksPageCount,
  selectPacksSearch,
  selectPacksSort,
  selectPacksTotalCount,
  selectPacksUserId,
} from '../../common/selectors/packsSelectors'
import { PATH } from '../../app/Pages/Pages'
import { BackTo } from '../../common/components/BackTo/BackTo'
import { useDebounce } from '../../common/hooks/useDebounce'
import Button from '@mui/material/Button'
import { PacksTableToolbar } from './packsTable/PacksTableToolbar'

export const Packs = () => {
  const dispatch = useAppDispatch()

  const id = useAppSelector(selectPacksUserId)
  const page = useAppSelector(selectPacksPage)
  const pageCount = useAppSelector(selectPacksPageCount)
  const cardPacksTotalCount = useAppSelector(selectPacksTotalCount)
  const searchValue = useAppSelector(selectPacksSearch)
  const sort = useAppSelector(selectPacksSort)
  const searchParamsMin = useAppSelector(selectPacksMin)
  const searchParamsMax = useAppSelector(selectPacksMax)

  const debouncedValue = useDebounce<string>(searchValue, 500)

  useEffect(() => {
    dispatch(getPacks())
  }, [page, pageCount, debouncedValue, searchParamsMin, id, searchParamsMax, sort])

  const handleSetPage = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setPage(value))
  }

  const handleSetPageCount = (event: SelectChangeEvent) => {
    dispatch(setPageCount(+event.target.value))
  }

  return (
    <div className={s.wrapper}>
      <BackTo title={'Profile'} direction={PATH.PROFILE} />
      <div className={s.titleWrapper}>
        <Title title={'Packs list'} />
        <Button variant={'contained'} onClick={() => {}}>
          Add new pack
        </Button>
      </div>

      <PacksTableToolbar />
      <PacksTable />

      <TablePagination
        page={page}
        pageCount={pageCount}
        totalCountItems={cardPacksTotalCount}
        handleSetPageCount={handleSetPageCount}
        handleSetPage={handleSetPage}
      />
    </div>
  )
}
