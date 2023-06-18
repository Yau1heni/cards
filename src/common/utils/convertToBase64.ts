import { ChangeEvent } from 'react'
import { Dispatch } from '@reduxjs/toolkit'
import { setAppError } from '../../app/appSlice'

export const convertToBase64 = (
  e: ChangeEvent<HTMLInputElement>,
  callback: (img: string) => void,
  dispatch: Dispatch,
) => {
  if (e.target.files && e.target.files.length) {
    const file = e.target.files[0]
    if (file.size < 4000000) {
      convertFileToBase64(file, (file64: string) => {
        callback(file64)
      })
    } else {
      dispatch(setAppError('File is too large'))
    }
  }
}

const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
  const reader = new FileReader()
  reader.onloadend = () => {
    const file64 = reader.result as string
    callBack(file64)
  }
  reader.readAsDataURL(file)
}
