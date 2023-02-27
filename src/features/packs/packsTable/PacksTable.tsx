import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { selectPacks } from '../../../common/selectors/packsSelectors'
import { PacksHead } from './PacksHead'
import { PackRow } from './PackRow'

export const PacksTable = () => {
  const packs = useAppSelector(selectPacks)

  const mappedPacks = packs.map((pack) => {
    return <PackRow key={pack._id} pack={pack} />
  })

  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <PacksHead />
        <TableBody>{mappedPacks}</TableBody>
      </Table>
    </TableContainer>
  )
}
