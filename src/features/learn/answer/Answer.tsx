import React, { FC } from 'react'
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { CardType } from '../../../api/cardsApi/cardsAPI'

type AnswerPropsType = {
  card: CardType
  grades: string[]
  onChangeGrade: (grade: number) => void
}

export const Answer: FC<AnswerPropsType> = ({ card, grades, onChangeGrade }) => {
  return (
    <FormControl sx={{ alignItems: 'start', gap: '10px' }}>
      <b>Answer: {card.answer}</b>
      <b>Rate yourself:</b>
      <RadioGroup
        aria-labelledby="radio-buttons-group-label"
        defaultValue={0}
        name="radio-buttons-group"
      >
        {grades.map((grade, index) => (
          <FormControlLabel
            key={index}
            value={index}
            control={<Radio />}
            label={grade}
            onChange={() => {
              onChangeGrade(index)
            }}
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
}
