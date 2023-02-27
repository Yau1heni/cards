import React, { FC } from 'react'
import IconButton from '@mui/material/IconButton'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Tooltip from '@mui/material/Tooltip'
import SchoolIcon from '@mui/icons-material/School'
import { useNavigate } from 'react-router-dom'
import { formatingDate } from '../../../common/utils/formatDate'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { PackType } from '../../../api/cardsApi/packsAPI'
import { selectProfileUserId } from '../../../common/selectors/profileSelectors'
import { deletePack } from '../packsSlice'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { DeleteModal } from '../../../common/components/Modals/DeleteModal/DeleteModal'
import { PackModal } from '../../../common/components/Modals/PackModal/PackModal'

export type PacksListTableRowPropsType = {
  pack: PackType
}

export const PackRow: FC<PacksListTableRowPropsType> = ({ pack }) => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const handleNavigateToPack = () => {
    if (pack.user_id) navigate(`/cards/${pack._id}`)
  }

  const myUserId = useAppSelector(selectProfileUserId)
  const isMyPack = pack.user_id === myUserId

  const tooltipWhosePack = isMyPack ? 'go to my pack' : 'go to friend pack'
  const tooltipLearn = isMyPack ? 'go learn my pack' : 'go learn friend pack'

  const formattedDate = formatingDate(pack.updated)

  const handleDeletePack = () => {
    dispatch(deletePack(pack._id))
  }

  return (
    <TableRow key={pack._id}>
      <TableCell sx={style} component="th" scope="row" onClick={handleNavigateToPack}>
        <Tooltip title={tooltipWhosePack}>
          <span>{pack.name}</span>
        </Tooltip>
      </TableCell>
      <TableCell align={'left'}>{pack.cardsCount}</TableCell>
      <TableCell align={'left'}>{formattedDate}</TableCell>
      <TableCell align={'left'}>{pack.user_name}</TableCell>
      <TableCell align={'right'}>
        <Tooltip title={tooltipLearn}>
          <span>
            <IconButton disabled={pack.cardsCount === 0}>
              <SchoolIcon />
            </IconButton>
          </span>
        </Tooltip>
        <PackModal
          id={pack._id}
          titleModal={'Edit pack'}
          openButtonType={'edit'}
          packName={pack.name}
        />
        <DeleteModal name={pack.name} onClick={handleDeletePack} />
      </TableCell>
    </TableRow>
  )
}

const style = {
  maxWidth: '250px',
  overflowY: 'hidden',
  wordBreak: 'break-word',
}
