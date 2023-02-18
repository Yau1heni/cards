import React, { FC } from 'react'
import IconButton from '@mui/material/IconButton'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Tooltip from '@mui/material/Tooltip'
import SchoolIcon from '@mui/icons-material/School'
import { useNavigate } from 'react-router-dom'
import { formatingDate } from '../../common/utils/formatDate'
import { useAppSelector } from '../../common/hooks/useAppSelector'
import { PackType } from '../../api/cardsApi/packsAPI'
import {selectProfileUserId} from '../../common/selectors/profileSelectors';

export type PacksListTableRowPropsType = {
  pack: PackType
}

export const PackRow: FC<PacksListTableRowPropsType> = ({ pack }) => {
  const navigate = useNavigate()

  const handleNavigateToPack = () => {
    if (pack.user_id) navigate(`/cards/${pack._id}`)
  }

  const myUserId = useAppSelector(selectProfileUserId)
  const isMyPack = pack.user_id === myUserId

  const tooltipWhosePack = isMyPack ? 'go to my pack' : 'go to friend pack'
  const tooltipLearn = isMyPack ? 'go learn my pack' : 'go learn friend pack'

  const formattedDate = formatingDate(pack.updated)

  return (
    <TableRow key={pack._id}>
      <TableCell component="th" scope="row" onClick={handleNavigateToPack}>
        <Tooltip title={tooltipWhosePack}>
          <span>{pack.name}</span>
        </Tooltip>
      </TableCell>
      <TableCell>{pack.cardsCount}</TableCell>
      <TableCell>{formattedDate}</TableCell>
      <TableCell>{pack.user_name}</TableCell>
      <TableCell>
        <Tooltip title={tooltipLearn}>
          <IconButton disabled={pack.cardsCount === 0}>
            <SchoolIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  )
}
