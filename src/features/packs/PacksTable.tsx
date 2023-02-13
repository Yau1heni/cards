import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { PackRow } from './PackRow'
import { useAppSelector } from '../../common/hooks/useAppSelector'

export const PacksTable = () => {
  const packs = useAppSelector((state) => state.packs.packs)

  const mappedPacks = packs.map((pack) => {
    return <PackRow key={pack._id} pack={pack} />
  })

  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Name</b>
            </TableCell>
            <TableCell>
              <b>Cards</b>
            </TableCell>
            <TableCell>
              <b>Last Updated</b>
            </TableCell>
            <TableCell>
              <b>Created by</b>
            </TableCell>
            <TableCell>
              <b>Actions</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{mappedPacks}</TableBody>
      </Table>
    </TableContainer>
  )
}
