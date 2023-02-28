import React, { FC } from 'react'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import Rating from '@mui/material/Rating'
import { formatingDate } from '../../../common/utils/formatDate'
import { CardType } from '../../../api/cardsApi/cardsAPI'
import { TableCell } from '@mui/material'
import { DeleteModal } from '../../../common/components/Modals/DeleteModal/DeleteModal'
import { CardModal } from '../../../common/components/Modals/CardModal/CardModal'
import SchoolIcon from '@mui/icons-material/School'
import IconButton from '@mui/material/IconButton'
import { useNavigate, useParams } from 'react-router-dom'

type CardBodyPropsType = {
  cards: CardType[]
  removeCard: (id: string) => void
  isMyCards: boolean
}

export const CardBody: FC<CardBodyPropsType> = ({ cards, removeCard, isMyCards }) => {
  const navigate = useNavigate()
  const { packId } = useParams()

  const handleNavigateToLearn = () => {
    navigate(`/learn/${packId}`)
  }

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
                <DeleteModal name={'remove card'} onClick={() => removeCard(cardId)} />
                <CardModal titleModal={'Edit card'} openButtonType={'edit'} cardId={card._id} />
                <IconButton title={'learn pack'} onClick={handleNavigateToLearn}>
                  <SchoolIcon />
                </IconButton>
              </TableCell>
            )}
          </TableRow>
        )
      })}
    </TableBody>
  )
}
