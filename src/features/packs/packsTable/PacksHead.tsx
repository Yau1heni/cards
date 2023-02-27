import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import React from 'react'
import { TableCellSort } from '../../../common/components/TableCellSort/TableCellSort'

export const PacksHead = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCellSort title={'Name'} property={'name'} titleTable={'packs'} />
        <TableCell align={'left'}>
          <b>Cards</b>
        </TableCell>
        <TableCellSort title={'Last Updated'} property={'updated'} titleTable={'packs'} />
        <TableCell align={'left'}>
          <b>Created by</b>
        </TableCell>
        <TableCell align={'right'}>
          <b>Actions</b>
        </TableCell>
      </TableRow>
    </TableHead>
  )
}
