import React, { FC } from 'react'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import Rating from '@mui/material/Rating'
import { formatingDate } from '../../../common/utils/formatDate'
import { CardType } from '../../../api/cardsApi/cardsAPI'
import { TableCell } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddIcon from '@mui/icons-material/Add'
import Tooltip from '@mui/material/Tooltip'

type CardBodyPropsType = {
  cards: CardType[]
  removeCard: (id: string) => void
  addCard: (newQuestion: string, newAnswer: string) => void
  isMyCards: boolean
}

export const CardBody: FC<CardBodyPropsType> = ({ cards, removeCard, addCard, isMyCards }) => {
  return (
    <TableBody>
      {cards.map((card) => {
        const cardId = card._id ? card._id : ''
        const formattedDate = formatingDate(card.updated)
        return (
          <TableRow key={cardId}>
            <TableCell component="th" scope="row">
              {card.question}
            </TableCell>
            <TableCell align={'left'}>{card.answer}</TableCell>
            <TableCell align={'left'}>{formattedDate}</TableCell>
            <TableCell align={'left'}>
              <Rating name="simple-controlled" value={card.grade} />
            </TableCell>
            {isMyCards && (
              <TableCell align={'right'}>
                <Tooltip title={'remove card'}>
                  <IconButton onClick={() => removeCard(cardId)}>
                    <DeleteForeverIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title={'add card'}>
                  <IconButton onClick={() => addCard('new question', 'new answer')}>
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            )}
          </TableRow>
        )
      })}
    </TableBody>
  )
}
