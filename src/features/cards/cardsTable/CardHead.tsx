import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import React from 'react'
import { TableCellSort } from '../../../common/components/TableCellSort/TableCellSort'

export const CardHead = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCellSort title={'Question'} property={'question'} titleTable={'cards'} />
        <TableCellSort title={'Answer'} property={'answer'} titleTable={'cards'} />
        <TableCellSort title={'Last Updated'} property={'updated'} titleTable={'cards'} />
        <TableCellSort title={'Grade'} property={'grade'} titleTable={'cards'} />
        <TableCell align={'right'}>
          <b>Action</b>
        </TableCell>
      </TableRow>
    </TableHead>
  )
}
