import { CardType } from '../../api/cardsApi/cardsAPI'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppRootStateType } from '../../app/store'
import { setAppStatus } from '../../app/appSlice'
import { errorNetworkUtil } from '../../common/utils/errorNetworkUtil'
import { learnAPI, SetGradeDataType } from '../../api/cardsApi/learnAPI'

const initialState = {
  currentCard: {} as CardType,
  isFirst: true,
  isCheckedAnswer: false,
  grade: 1,
}

export const learnSlice = createSlice({
  name: 'learn',
  initialState,
  reducers: {
    setCurrentCard: (state, action: PayloadAction<CardType>) => {
      state.currentCard = action.payload
    },
    setLearnGrade: (state, action: PayloadAction<number>) => {
      state.grade = action.payload
    },
    setIsCheckedAnswer: (state, action: PayloadAction<boolean>) => {
      state.isCheckedAnswer = action.payload
    },
  },
})

export const { setCurrentCard, setLearnGrade, setIsCheckedAnswer } = learnSlice.actions
export const learnReducer = learnSlice.reducer

export const updateGrade = createAsyncThunk('cards/getCards', async (_, { dispatch, getState }) => {
  const state = getState() as AppRootStateType
  const card_id = state.learn.currentCard._id!
  const grade = state.learn.grade

  const model: SetGradeDataType = { card_id, grade }
  dispatch(setAppStatus('loading'))

  try {
    const res = await learnAPI.setGrade(model)
    dispatch(setLearnGrade(res.data.updatedGrade.grade))
    dispatch(setAppStatus('succeeded'))
    dispatch(setIsCheckedAnswer(false))

    dispatch(setAppStatus('succeeded'))
  } catch (e: any) {
    errorNetworkUtil(e, dispatch)
  } finally {
    dispatch(setAppStatus('idle'))
  }
})
