import Slider from '@mui/material/Slider'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { Box, Grid, OutlinedInput, Typography } from '@mui/material'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { setRange } from '../packsSlicer'
import { useDebounce } from '../../../common/hooks/useDebounce'

const valueText = (value: number) => `${value}`

const MIN_DISTANCE = 10

export const SliderRange = () => {
  const dispatch = useAppDispatch()
  const maxCardsCount = useAppSelector((state) => state.packs.maxCardsCount)
  const minCardsCount = useAppSelector((state) => state.packs.minCardsCount)
  const [value, setValue] = useState([minCardsCount, maxCardsCount])

  const minValueCount = useDebounce(value[0], 1000)
  const maxValueCount = useDebounce(value[1], 1000)

  useEffect(() => {
    dispatch(setRange({ min: minValueCount, max: maxValueCount }))
  }, [minValueCount, maxValueCount])

  const handleSliderChange = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return
    }
    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - MIN_DISTANCE), value[1]])
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + MIN_DISTANCE)])
    }
  }

  const handleSetMinValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = +event.currentTarget.value
    if (newValue > value[1]) {
      setValue([value[1], newValue])
    } else {
      setValue([newValue, value[1]])
    }
  }

  const handleSetMaxValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = +event.currentTarget.value
    if (newValue < value[0]) {
      setValue([newValue, value[0]])
    } else {
      setValue([value[0], newValue])
    }
  }

  return (
    <Box sx={{ width: 300 }}>
      <Typography id="input-slider" gutterBottom align={'left'}>
        Number of cards
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <OutlinedInput
            value={value[0]}
            onChange={handleSetMinValueChange}
            sx={{ width: 70 }}
            size="small"
            inputProps={{
              min: minCardsCount,
              max: maxCardsCount,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
        <Grid item xs>
          <Slider
            getAriaLabel={() => 'Minimum distance'}
            value={[value[0], value[1]]}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            getAriaValueText={valueText}
            max={maxCardsCount}
            disableSwap
          />
        </Grid>
        <Grid item>
          <OutlinedInput
            value={value[1]}
            onChange={handleSetMaxValueChange}
            sx={{ width: 70 }}
            size="small"
            inputProps={{
              min: minCardsCount,
              max: maxCardsCount,
              type: 'number',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  )
}
