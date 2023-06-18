import IconButton from '@mui/material/IconButton'
import defaultAva from '../../assets/img/avatar.jpg'
import { ChangeEvent, FC, useState } from 'react'
import { convertToBase64 } from '../../common/utils/convertToBase64'
import { useAppDispatch } from '../../common/hooks/useAppDispatch'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { setAppError } from '../../app/appSlice'
import s from './Profile.module.css'
import { updateUserData } from './profileSlice'
import Button from '@mui/material/Button'

export const ProfileAva: FC<ProfileAvaPropsType> = ({ avatar }) => {
  const dispatch = useAppDispatch()

  const [ava, setAva] = useState(defaultAva)
  const [isAvaBroken, setIsAvaBroken] = useState(false)
  const [isSaveAva, setIisSaveAva] = useState(false)

  const errorHandler = () => {
    setIsAvaBroken(true)
    dispatch(setAppError('broken image'))
  }

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    convertToBase64(e, setAva, dispatch)
    setIisSaveAva(true)
  }

  const saveAvaHandler = () => {
    dispatch(updateUserData({ avatar: ava }))
    setIisSaveAva(false)
  }

  return (
    <div>
      <div className={s.avatarWrapper}>
        <img
          src={isAvaBroken || !avatar ? defaultAva : avatar}
          className={s.avatar}
          style={{ width: '100px' }}
          onError={errorHandler}
          alt="ava"
        />
      </div>
      <div>{isSaveAva && <Button onClick={saveAvaHandler}>save</Button>}</div>
      <label>
        <input type="file" onChange={uploadHandler} style={{ display: 'none' }} />
        <IconButton component="span">
          <CloudUploadIcon />
        </IconButton>
      </label>
    </div>
  )
}

type ProfileAvaPropsType = {
  avatar: string
}
