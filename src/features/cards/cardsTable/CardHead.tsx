import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableSortLabel from '@mui/material/TableSortLabel'
import TableHead from '@mui/material/TableHead'
import React from 'react'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { setCardsSort } from '../cardsSlice'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'

export const CardHead = () => {
  const dispatch = useAppDispatch()

  const sort = useAppSelector((state) => state.cards.sort)

  const handleSortCards = (property: string) => {
    dispatch(setCardsSort(sort === `0${property}` ? `1${property}` : `0${property}`))
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell onClick={() => handleSortCards('question')}>
          <b>Question</b>
          <TableSortLabel
            active={sort === '0question' || sort === '1question'}
            direction={sort === '1question' ? 'asc' : 'desc'}
          />
        </TableCell>
        <TableCell align={'right'} onClick={() => handleSortCards('answer')}>
          <b>Answer</b>
          <TableSortLabel
            active={sort === '0answer' || sort === '1answer'}
            direction={sort === '1answer' ? 'asc' : 'desc'}
          />
        </TableCell>
        <TableCell align={'right'} onClick={() => handleSortCards('updated')}>
          <b>Last Updated</b>
          <TableSortLabel
            active={sort === '0updated' || sort === '1updated'}
            direction={sort === '1updated' ? 'asc' : 'desc'}
          />
        </TableCell>
        <TableCell align={'right'} onClick={() => handleSortCards('grade')}>
          <b>Grade</b>
          <TableSortLabel
            active={sort === '0grade' || sort === '1grade'}
            direction={sort === '1grade' ? 'asc' : 'desc'}
          />
        </TableCell>
        <TableCell align={'right'} onClick={() => handleSortCards('grade')}>
          <b>Action</b>
        </TableCell>
      </TableRow>
    </TableHead>
  )
}
