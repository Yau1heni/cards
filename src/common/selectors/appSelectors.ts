import { AppRootStateType } from '../../app/store'

export const selectAppIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn
export const selectAppIsRegistered = (state: AppRootStateType) => state.auth.isRegistered
export const selectAppIsSentRecoveryEmail = (state: AppRootStateType) =>
  state.auth.isSentRecoveryEmail
export const selectAppIsSentPassword = (state: AppRootStateType) => state.auth.isSentPassword
