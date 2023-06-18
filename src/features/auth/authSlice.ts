import {
  authAPI,
  CreateUserDataType,
  NewPasswordDataType,
  UserType,
} from '../../api/authApi/authApi'
import { setAppError, setAppInitialized, setAppStatus } from '../../app/appSlice'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setUserData } from '../profile/profileSlice'
import { errorNetworkUtil } from '../../common/utils/errorNetworkUtil'

const initialState = {
  isLoggedIn: false,
  isRegistered: false,
  isSentRecoveryEmail: false,
  isSentPassword: false,
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
    sentRecoveryEmailStatus: (state, action: PayloadAction<boolean>) => {
      state.isSentRecoveryEmail = action.payload
    },
    sentPasswordStatus: (state, action: PayloadAction<boolean>) => {
      state.isSentPassword = action.payload
    },
  },
})

export const { setLoggedIn, setRegistration, sentRecoveryEmailStatus, sentPasswordStatus } =
  authSlice.actions
export const authReducer = authSlice.reducer

export const login = createAsyncThunk(
  'auth/login',
  async (data: CreateUserDataType, { dispatch }) => {
    dispatch(setAppStatus('loading'))
    try {
      const res = await authAPI.loginUser(data)

      dispatch(setUserData(res.data))
      dispatch(setLoggedIn(true))
      dispatch(setAppStatus('succeeded'))
      dispatch(setAppError(null))
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

      dispatch(setRegistration(true))
      dispatch(setAppStatus('succeeded'))
      dispatch(setAppError(null))
    } catch (e: any) {
      errorNetworkUtil(e, dispatch)
    } finally {
      dispatch(setAppStatus('succeeded'))
      dispatch(setAppInitialized(true))
    }
  },
)

export const passwordRecovery = createAsyncThunk(
  'auth/passwordRecovery',
  async (email: string, { dispatch }) => {
    const message = `<div style="padding: 15px">
                        Password recovery:
                        <a href="${process.env.REACT_APP}#/create-new-password/$token$"/>
                       </div>`
    dispatch(setAppStatus('loading'))
    try {
      await authAPI.sendRecoveryPassword({ email, message })

      dispatch(sentRecoveryEmailStatus(true))
      dispatch(setAppStatus('succeeded'))
    } catch (e: any) {
      errorNetworkUtil(e, dispatch)
    } finally {
      dispatch(setAppStatus('succeeded'))
      dispatch(setAppInitialized(true))
    }
  },
)

export const createNewPassword = createAsyncThunk(
  'auth/passwordRecovery',
  async (data: NewPasswordDataType, { dispatch }) => {
    dispatch(setAppStatus('loading'))
    try {
      await authAPI.setNewPassword(data)

      dispatch(sentPasswordStatus(true))
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
