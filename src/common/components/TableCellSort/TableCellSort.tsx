import React, { FC } from 'react'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { selectPacksSort } from '../../selectors/packsSelectors'
import TableCell from '@mui/material/TableCell'
import { handleSortTable } from '../../utils/handleSortTable'
import { setPacksSort } from '../../../features/packs/packsSlicer'
import TableSortLabel from '@mui/material/TableSortLabel'
import { setCardsSort } from '../../../features/cards/cardsSlice'

type PropsType = {
  property: string
  title: string
  titleTable: 'cards' | 'packs'
}

export const TableCellSort: FC<PropsType> = ({ property, title, titleTable }) => {
  const dispatch = useAppDispatch()
  const packsSort = useAppSelector(selectPacksSort)
  const cardsSort = useAppSelector((state) => state.cards.sort)

  const sort = titleTable === 'packs' ? packsSort : cardsSort
  const setSort = titleTable === 'packs' ? setPacksSort : setCardsSort

  return (
    <>
      <TableCell onClick={() => handleSortTable(property, sort, dispatch, setSort)} align={'left'}>
        <b>{title}</b>
        <TableSortLabel
          active={sort === `0${property}` || sort === `1${property}`}
          direction={sort === `1${property}` ? 'asc' : 'desc'}
        />
      </TableCell>
    </>
  )
}
