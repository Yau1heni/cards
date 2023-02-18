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
import {
  selectPacksMax,
  selectPacksMin,
  selectPacksPage,
  selectPacksPageCount,
  selectPacksSearch,
  selectPacksTotalCount,
  selectPacksUserId,
} from '../../common/selectors/packsSelectors'
import {selectProfileUserId} from '../../common/selectors/profileSelectors';

export const Packs = () => {
  const dispatch = useAppDispatch()

  const userId = useAppSelector(selectProfileUserId)
  const page = useAppSelector(selectPacksPage)
  const id = useAppSelector(selectPacksUserId)
  const pageCount = useAppSelector(selectPacksPageCount)
  const cardPacksTotalCount = useAppSelector(selectPacksTotalCount)
  const searchValue = useAppSelector(selectPacksSearch)
  const searchParamsMin = useAppSelector(selectPacksMin)
  const searchParamsMax = useAppSelector(selectPacksMax)

  const [whosePacks, setWhosePacks] = React.useState('all')

  useEffect(() => {
    dispatch(getPacks())
  }, [page, pageCount, searchValue, dispatch, searchParamsMin, searchParamsMax, id])

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
