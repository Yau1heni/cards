import React from 'react'
import s from './Profile.module.css'
import avatar from '../../assets/img/avatar.jpg'
import { Logout } from '@mui/icons-material'
import { useAppDispatch } from '../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../common/hooks/useAppSelector'
import { logout } from '../auth/authSlice'
import Button from '@mui/material/Button'
import { Title } from '../../common/components/Title/Title'
import { updateUserData } from './profileSlice'
import { EditableSpan } from '../../common/components/EditableSpan/EditableSpan'
import { useNavigate } from 'react-router-dom'

export const Profile = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector((s) => s.auth.isLoggedIn)
  const user = useAppSelector((s) => s.profile.userData)
  const userAvatar = user.avatar ? user.avatar : avatar
  const navigate = useNavigate()

  const changeNameHandler = (name: string | null) => {
    dispatch(updateUserData({ name }))
  }

  const logoutHandler = () => {
    dispatch(logout())
  }

  if (!isLoggedIn) {
    navigate('/signin')
  }

  return (
    <div className={s.wrapper}>
      <Title title={'Personal Information'} />
      <img src={userAvatar} className={s.avatar} alt="avatar" />
      <div>
        <EditableSpan name={user.name} changeName={changeNameHandler} />
      </div>
      <div className={s.mail}>{user.email}</div>

      <Button onClick={logoutHandler}>
        <Logout fontSize="small" style={{ verticalAlign: 'middle' }} />
        log out
      </Button>
    </div>
  )
}
