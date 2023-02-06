import { authAPI } from '../api/authApi/authApi'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setUserData } from '../features/profile/profileSlice'
import { errorNetworkUtil } from '../common/utils/errorNetworkUtil'

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as null | string,
  initialized: false,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setAppStatus: (state, action: PayloadAction<RequestStatusType>) => {
      state.status = action.payload
    },
    setAppInitialized: (state, action: PayloadAction<boolean>) => {
      state.initialized = action.payload
    },
  },
})

export const { setAppError, setAppStatus, setAppInitialized } = appSlice.actions
export const appReducer = appSlice.reducer

export const initializedAppTC = createAsyncThunk('app/initialized', async (arg, { dispatch }) => {
  dispatch(setAppStatus('loading'))
  try {
    const res = await authAPI.me()
    dispatch(setUserData(res.data))
    console.log(res.data)
    dispatch(setAppStatus('succeeded'))
  } catch (e: any) {
    errorNetworkUtil(e, dispatch)
  } finally {
    dispatch(setAppStatus('succeeded'))
    dispatch(setAppInitialized(true))
  }
})
