import { cardsAPI, CardType } from '../../api/cardsApi/cardsAPI'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setAppStatus } from '../../app/appSlice'
import { errorNetworkUtil } from '../../common/utils/errorNetworkUtil'
import { AppRootStateType } from '../../app/store'

const initialState = {
  cards: [] as Array<CardType>,
  cardsTotalCount: 0,
  page: 1,
  pageCount: 5,
  cardsPack_id: '',
  cardSearch: '',
  sort: '',
}

export const cardsSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setCards: (state, action: PayloadAction<CardType[]>) => {
      state.cards = action.payload
    },
    setCardsPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    setCardsPageCount: (state, action: PayloadAction<number>) => {
      state.pageCount = action.payload
    },
    setCardsTotalCount: (state, action: PayloadAction<number>) => {
      state.cardsTotalCount = action.payload
    },
    setCardsSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload
    },
    setCardUserId: (state, action: PayloadAction<string>) => {
      state.cardsPack_id = action.payload
    },
    setCardSearchWord: (state, action: PayloadAction<string>) => {
      state.cardSearch = action.payload
    },
  },
})

export const {
  setCards,
  setCardsPage,
  setCardsPageCount,
  setCardsTotalCount,
  setCardsSort,
  setCardUserId,
  setCardSearchWord,
} = cardsSlice.actions
export const cardsReducer = cardsSlice.reducer

export const getCards = createAsyncThunk(
  'cards/getCards',
  async (cardsPack_id: string, { dispatch, getState }) => {
    const state = getState() as AppRootStateType
    const { page, pageCount, cardSearch, sort } = state.cards
    const params = {
      cardsPack_id,
      page,
      pageCount,
      cardQuestion: cardSearch,
      sortCards: sort,
    }
    dispatch(setAppStatus('loading'))

    try {
      const response = await cardsAPI.getCards(params)
      dispatch(setCards(response.data.cards))
      dispatch(setCardsTotalCount(response.data.cardsTotalCount))
      dispatch(setCardUserId(response.data.packUserId))

      dispatch(setAppStatus('succeeded'))
    } catch (e: any) {
      errorNetworkUtil(e, dispatch)
    } finally {
      dispatch(setAppStatus('idle'))
    }
  },
)

export const addCard = createAsyncThunk('cards/addCard', async (card: CardType, { dispatch }) => {
  dispatch(setAppStatus('loading'))

  try {
    const response = await cardsAPI.postCard(card)
    dispatch(getCards(response.data.newCard.cardsPack_id))
    dispatch(setAppStatus('succeeded'))
  } catch (e: any) {
    errorNetworkUtil(e, dispatch)
  } finally {
    dispatch(setAppStatus('idle'))
  }
})

export const removeCard = createAsyncThunk('cards/addCard', async (id: string, { dispatch }) => {
  dispatch(setAppStatus('loading'))

  try {
    const response = await cardsAPI.deleteCard(id)
    dispatch(getCards(response.data.deletedCard.cardsPack_id))
    dispatch(setAppStatus('succeeded'))
  } catch (e: any) {
    errorNetworkUtil(e, dispatch)
  } finally {
    dispatch(setAppStatus('idle'))
  }
})
