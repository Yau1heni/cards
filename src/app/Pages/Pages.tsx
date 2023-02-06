import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { SignUp } from '../../features/auth/SignUp/SignUp'
import { SignIn } from '../../features/auth/SignIn/SignIn'
import { Profile } from '../../features/profile/Profile'

export const PATH = {
  SIGN_UP: '/signup',
  SIGN_IN: '/signIN',
  PROFILE: '/profile',
  NOT_FOUND: '/404',
}

export const Pages = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Navigate to={PATH.PROFILE} />} />

      <Route path={PATH.SIGN_UP} element={<SignUp />} />
      <Route path={PATH.SIGN_IN} element={<SignIn />} />
      <Route path={PATH.PROFILE} element={<Profile />} />

      <Route path={PATH.NOT_FOUND} element={<h1>404: PAGE NOT FOUND</h1>} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  )
}
