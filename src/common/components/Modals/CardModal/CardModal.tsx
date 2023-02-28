import React, { FC, useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import s from './CardModal.module.css'
import { BasicModal, OpenButtonType } from '../BasicModal/BasicModal'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { addCard, updateCard } from '../../../../features/cards/cardsSlice'

export const CardModal: FC<AddCardModalPropsType> = ({
  titleModal,
  openButtonName,
  packId,
  cardId,
  openButtonType,
}) => {
  const dispatch = useAppDispatch()

  const [newCardQuestion, setNewCardQuestion] = useState('')
  const [newCardAnswer, setNewCardAnswer] = useState('')

  const handleSetNewCardQuestion = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCardQuestion(event.currentTarget.value)
  }

  const handleSetNewCardAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCardAnswer(event.currentTarget.value)
  }

  const handleAddCard = () => {
    if (packId) {
      dispatch(
        addCard({
          cardsPack_id: packId,
          question: newCardQuestion,
          answer: newCardAnswer,
        }),
      )
    }
  }

  const handleUpdateCard = () => {
    if (cardId) {
      dispatch(
        updateCard({
          _id: cardId,
          question: newCardQuestion,
          answer: newCardAnswer,
        }),
      )
    }
  }

  const onClick = openButtonType === 'edit' ? handleUpdateCard : handleAddCard

  return (
    <BasicModal
      modalButtonType={'save'}
      title={titleModal}
      onClick={onClick}
      openButtonName={openButtonName}
      openButtonType={openButtonType}
    >
      <Box>
        <div className={s.cardBlock}>
          <TextField
            fullWidth
            id="question"
            label="Question"
            variant="standard"
            onChange={handleSetNewCardQuestion}
          />
          <TextField
            fullWidth
            id="answer"
            label="Answer"
            variant="standard"
            onChange={handleSetNewCardAnswer}
          />
        </div>
      </Box>
    </BasicModal>
  )
}

type AddCardModalPropsType = {
  titleModal: string
  onClick?: () => void
  openButtonName?: string
  packId?: string
  cardId?: string
  openButtonType?: OpenButtonType
}
