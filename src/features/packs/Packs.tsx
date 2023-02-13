import React, { useEffect } from 'react'
import FormControl from '@mui/material/FormControl'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Tooltip from '@mui/material/Tooltip'
import s from './Packs.module.css'
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import { useAppDispatch } from '../../common/hooks/useAppDispatch'
import { TableSearchBar } from '../../common/components/TableSearchbar/TableSearchbar'
import { useAppSelector } from '../../common/hooks/useAppSelector'
import { getPacks, setPage, setPageCount, setUserId } from './packsSlicer'
import { Title } from '../../common/components/Title/Title'
import { PacksTable } from './PacksTable'
import { SliderRange } from './SliderRange/SliderRange'
import { TablePagination } from '../../common/components/TablePagination/TablePagination'
import IconButton from '@mui/material/IconButton'
import { SelectChangeEvent } from '@mui/material/Select'

export const Packs = () => {
  const dispatch = useAppDispatch()

  const userId = useAppSelector((state) => state.profile.userData._id)
  const page = useAppSelector((state) => state.packs.searchParams.page)
  const id = useAppSelector((state) => state.packs.searchParams.user_id)
  const pageCount = useAppSelector((state) => state.packs.searchParams.pageCount)
  const cardPacksTotalCount = useAppSelector((state) => state.packs.cardPacksTotalCount)
  const searchVal = useAppSelector((state) => state.packs.searchParams.packName)
  const searchParamsMin = useAppSelector((state) => state.packs.searchParams.min)
  const searchParamsMax = useAppSelector((state) => state.packs.searchParams.max)

  const [whosePacks, setWhosePacks] = React.useState('all')

  useEffect(() => {
    dispatch(getPacks())
  }, [page, pageCount, searchVal, dispatch, searchParamsMin, searchParamsMax, id])

  const handleSetPage = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setPage(value))
  }

  const handleSetPageCount = (event: SelectChangeEvent) => {
    dispatch(setPageCount(+event.target.value))
  }

  const handleSetWhosePacks = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: 'all' | 'my',
  ) => {
    if (newAlignment !== null) {
      setWhosePacks(newAlignment)
      dispatch(setUserId(newAlignment === 'my' ? userId : ''))
    }
  }

  return (
    <div>
      <div className={s.wrapper}>
        <div className={s.titleWrapper}>
          <Title title={'Packs list'} />
        </div>
        <div className={s.toolbar}>
          <TableSearchBar onChange={() => {}} />
          <FormControl variant="standard">
            <ToggleButtonGroup
              color="primary"
              value={whosePacks}
              exclusive
              onChange={handleSetWhosePacks}
              aria-label="Platform"
            >
              <ToggleButton value="my">my</ToggleButton>
              <ToggleButton value="all">all</ToggleButton>
            </ToggleButtonGroup>
          </FormControl>
          <SliderRange />
          <Tooltip title="clear filters">
            <IconButton>
              <FilterAltOffIcon />
            </IconButton>
          </Tooltip>
        </div>

        <PacksTable />

        <TablePagination
          page={page}
          pageCount={pageCount}
          totalCountItems={cardPacksTotalCount}
          handleSetPageCount={handleSetPageCount}
          handleSetPage={handleSetPage}
        />
      </div>
    </div>
  )
}
