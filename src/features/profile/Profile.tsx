import React, { useEffect } from 'react'
import s from './Profile.module.css'
import { Logout } from '@mui/icons-material'
import { useAppDispatch } from '../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../common/hooks/useAppSelector'
import { logout } from '../auth/authSlice'
import Button from '@mui/material/Button'
import { Title } from '../../common/components/Title/Title'
import { updateUserData } from './profileSlice'
import { EditableSpan } from '../../common/components/EditableSpan/EditableSpan'
import { selectProfileUser } from '../../common/selectors/profileSelectors'
import { PATH } from '../../app/Pages/Pages'
import { BackTo } from '../../common/components/BackTo/BackTo'
import { ProfileAva } from './ProfileAva'

export const Profile = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectProfileUser)

  const changeNameHandler = (name: string | null) => {
    dispatch(updateUserData({ name }))
  }

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <div className={s.wrapper}>
      <BackTo title={'Pack list'} direction={PATH.PACKS} />
      <Title title={'Personal Information'} />
      <ProfileAva avatar={user.avatar!} />
      <div>
        <EditableSpan name={user.name} changeName={changeNameHandler} />
      </div>
      <div className={s.mail}>{user.email}</div>

      <Button color={'inherit'} onClick={logoutHandler}>
        <Logout fontSize="small" style={{ verticalAlign: 'middle' }} />
        log out
      </Button>
    </div>
  )
}
