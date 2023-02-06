import { authAPI, UpdateUserProfileType, UserType } from '../../api/authApi/authApi'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setAppInitialized, setAppStatus } from '../../app/appSlice'
import { setLoggedIn } from '../auth/authSlice'
import { errorNetworkUtil } from '../../common/utils/errorNetworkUtil'

const initialState = {
  userData: {} as UserType,
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserType>) => {
      state.userData = action.payload
    },
  },
})

export const { setUserData } = profileSlice.actions
export const profileReducer = profileSlice.reducer

export const updateUserData = createAsyncThunk(
  'auth/login',
  async (data: UpdateUserProfileType, { dispatch }) => {
    dispatch(setAppStatus('loading'))
    try {
      const res = await authAPI.updateUserProfile(data)
      dispatch(setUserData(res.data.updatedUser))
      dispatch(setLoggedIn(true))
      dispatch(setAppStatus('succeeded'))
    } catch (e: any) {
      errorNetworkUtil(e, dispatch)
    } finally {
      dispatch(setAppStatus('succeeded'))
      dispatch(setAppInitialized(true))
    }
  },
)
