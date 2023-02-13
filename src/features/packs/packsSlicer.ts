import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { packsAPI, PackType, ParamsTypePacks } from '../../api/cardsApi/packsAPI'
import { setAppStatus } from '../../app/appSlice'
import { errorNetworkUtil } from '../../common/utils/errorNetworkUtil'
import { AppRootStateType } from '../../app/store'

const initialState = {
  packs: [] as PackType[],
  cardPacksTotalCount: 0,
  maxCardsCount: 100,
  minCardsCount: 0,
  searchParams: {
    max: 0,
    min: 0,
    page: 1,
    pageCount: 4,
    packName: '',
    sortPacks: '',
    user_id: '',
  },
}

export const packsSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setPacksData: (state, action: PayloadAction<PackType[]>) => {
      state.packs = action.payload
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.searchParams.page = action.payload
    },
    setPageCount: (state, action: PayloadAction<number>) => {
      state.searchParams.pageCount = action.payload
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.searchParams.packName = action.payload
    },
    setRange: (state, action: PayloadAction<{ max: number; min: number }>) => {
      state.searchParams.min = action.payload.min
      state.searchParams.max = action.payload.max
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.searchParams.user_id = action.payload
    },
    setCardPacksTotalCount: (state, action: PayloadAction<number>) => {
      state.cardPacksTotalCount = action.payload
    },
  },
})

export const {
  setPacksData,
  setPage,
  setPageCount,
  setSearch,
  setRange,
  setUserId,
  setCardPacksTotalCount,
} = packsSlice.actions
export const packsReducer = packsSlice.reducer

export const getPacks = createAsyncThunk('packs/setPacks', async (_, { dispatch, getState }) => {
  const state = getState() as AppRootStateType
  const { min, max, page, pageCount, sortPacks, packName, user_id } = state.packs.searchParams

  const params: ParamsTypePacks = {
    page,
    pageCount,
    packName,
    max,
    min,
    user_id,
    sortPacks,
  }

  dispatch(setAppStatus('loading'))
  try {
    const res = await packsAPI.getPacks(params)
    dispatch(setPacksData(res.data.cardPacks))
    dispatch(setAppStatus('succeeded'))
    dispatch(setCardPacksTotalCount(res.data.cardPacksTotalCount))
  } catch (e: any) {
    errorNetworkUtil(e, dispatch)
  } finally {
    dispatch(setAppStatus('idle'))
  }
})