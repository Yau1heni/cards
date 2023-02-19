import React, { useEffect, useState } from 'react'
import s from './Learn.module.css'
import { useParams } from 'react-router-dom'
import { setCurrentCard, setIsCheckedAnswer, setLearnGrade, updateGrade } from './learnSlice'
import { useAppDispatch } from '../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../common/hooks/useAppSelector'
import { Title } from '../../common/components/Title/Title'
import { BackTo } from '../../common/components/BackTo/BackTo'
import Button from '@mui/material/Button'
import { selectCards } from '../../common/selectors/cardsSelectors'
import { getCards } from '../cards/cardsSlice'
import { Answer } from './answer/Answer'
import { getRandomQuestion } from '../../common/utils/getRandomQuestion'
import { selectIsChecked, selectLearnCard } from '../../common/selectors/learnSelectors'

export const Learn = () => {
  const grades = ['Did not know', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer']
  const dispatch = useAppDispatch()

  const cards = useAppSelector(selectCards)
  const card = useAppSelector(selectLearnCard)
  const isCheckedAnswer = useAppSelector(selectIsChecked)

  const [first, setFirst] = useState(true)

  const { packId } = useParams()
  const cardsPack_id = packId ? packId : ''

  useEffect(() => {
    dispatch(getCards(cardsPack_id))
  }, [cardsPack_id])

  useEffect(() => {
    if (first) {
      setFirst(false)
    }
    if (cards.length > 0) {
      dispatch(setCurrentCard(getRandomQuestion(cards)))
    }
    return () => {}
  }, [dispatch, cards, first])

  const showAnswer = () => {
    dispatch(setIsCheckedAnswer(true))
  }

  const onNextQuestion = () => {
    dispatch(setIsCheckedAnswer(true))
    dispatch(updateGrade())

    if (cards.length > 0) {
      dispatch(setCurrentCard(getRandomQuestion(cards)))
    }
  }

  const onChangeGrade = (grade: number) => {
    dispatch(setLearnGrade(grade))
  }

  return (
    <div className={s.wrapper}>
      <BackTo title={'back to Cards'} direction={`/cards/${cardsPack_id}`} />
      <div className={s.wrapperLearn}>
        <Title title={'Learn'} />
        <span>
          <b>Question: {card.question}</b>
        </span>
        <span>
          Number of attempts at answering the question: <b>{card.shots}</b>
        </span>
        {isCheckedAnswer && <Answer card={card} grades={grades} onChangeGrade={onChangeGrade} />}
        {isCheckedAnswer ? (
          <Button onClick={onNextQuestion}>Next question</Button>
        ) : (
          <Button onClick={showAnswer}>Show answer</Button>
        )}
      </div>
    </div>
  )
}
