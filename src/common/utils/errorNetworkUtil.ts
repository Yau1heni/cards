import { Dispatch } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

import { setAppError, setAppStatus } from '../../app/appSlice'

export const errorNetworkUtil = (e: AxiosError<{ error: string }>, dispatch: Dispatch) => {
  if (axios.isAxiosError(e)) {
    const error = e.response ? e.response.data.error : e.message
    dispatch(setAppStatus('failed'))
    dispatch(setAppError(error))
  }
}
