import s from '../Packs.module.css'
import { TableSearchBar } from '../../../common/components/TableSearchbar/TableSearchbar'
import FormControl from '@mui/material/FormControl'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'
import { SliderRange } from './SliderRange/SliderRange'
import React, { useState } from 'react'
import { setPacksSearch, setUserId } from '../packsSlice'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { selectProfileUserId } from '../../../common/selectors/profileSelectors'

export const PacksTableToolbar = () => {
  const dispatch = useAppDispatch()

  const userId = useAppSelector(selectProfileUserId)

  const [whosePacks, setWhosePacks] = useState('all')

  const handleSetSearch = (value: string) => {
    dispatch(setPacksSearch(value))
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
    <div className={s.toolbar}>
      <TableSearchBar onChange={handleSetSearch} />
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
    </div>
  )
}
