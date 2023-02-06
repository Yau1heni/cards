import { authAPI, CreateUserDataType, UserType } from '../../api/authApi/authApi'
import { setAppInitialized, setAppStatus } from '../../app/appSlice'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setUserData } from '../profile/profileSlice'
import { errorNetworkUtil } from '../../common/utils/errorNetworkUtil'

const initialState = {
  isLoggedIn: false,
  isRegistered: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload
    },
    setRegistration: (state, action: PayloadAction<boolean>) => {
      state.isRegistered = action.payload
    },
  },
})

export const { setLoggedIn, setRegistration } = authSlice.actions
export const authReducer = authSlice.reducer

export const login = createAsyncThunk(
  'auth/login',
  async (data: CreateUserDataType, { dispatch }) => {
    dispatch(setAppStatus('loading'))
    try {
      const res = await authAPI.loginUser(data)
      console.log(res.data)
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

export const register = createAsyncThunk(
  'auth/register',
  async (data: CreateUserDataType, { dispatch }) => {
    dispatch(setAppStatus('loading'))
    try {
      const res = await authAPI.registerUser(data)
      console.log(res.data)
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

export const logout = createAsyncThunk('auth/logout', async (arg, { dispatch }) => {
  dispatch(setAppStatus('loading'))
  try {
    await authAPI.logoutUser()
    dispatch(setLoggedIn(false))
    dispatch(setAppStatus('succeeded'))
    dispatch(setUserData({} as UserType))
  } catch (e: any) {
    errorNetworkUtil(e, dispatch)
  } finally {
    dispatch(setAppStatus('succeeded'))
    dispatch(setAppInitialized(true))
  }
})
