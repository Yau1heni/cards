import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { SignUp } from '../../features/auth/SignUp/SignUp'
import { SignIn } from '../../features/auth/SignIn/SignIn'
import { Profile } from '../../features/profile/Profile'
import { CheckEmailPage } from '../../features/auth/password/CheckEmailPage/CheckEmailPage'
import { ForgotPassword } from '../../features/auth/password/ForgotPassword/ForgotPassword'
import { NewPassword } from '../../features/auth/password/NewPassword/NewPassword'
import { PrivateRoutes } from './PrivateRoutes'
import { Cards } from '../../features/cards/Cards'
import { Packs } from '../../features/packs/Packs'

export const PATH = {
  SIGN_UP: '/signup',
  SIGN_IN: '/signin',
  PROFILE: '/profile',
  NOT_FOUND: '/404',
  CHECK_EMAIL: '/check',
  FORGOT_PASSWORD: '/forgot',
  CREATE_NEW_PASSWORD: '/create-new-password/:token',
  CARDS: '/cards/:packId',
  PACKS: '/packs',
}

export const Pages = () => {
  return (
    <Routes>
      <Route path={PATH.SIGN_UP} element={<SignUp />} />
      <Route path={PATH.SIGN_IN} element={<SignIn />} />
      <Route path={PATH.CHECK_EMAIL} element={<CheckEmailPage />} />
      <Route path={PATH.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path={PATH.CREATE_NEW_PASSWORD} element={<NewPassword />} />

      <Route element={<PrivateRoutes />}>
        <Route path={'/'} element={<Navigate to={PATH.PACKS} />} />
        <Route path={PATH.PROFILE} element={<Profile />} />
        <Route path={PATH.CARDS} element={<Cards />} />
        <Route path={PATH.PACKS} element={<Packs />} />
        <Route path={PATH.NOT_FOUND} element={<h1>404: PAGE NOT FOUND</h1>} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  )
}
