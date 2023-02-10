import { instance } from '../axiosSettings'

export const authAPI = {
  registerUser(userData: CreateUserDataType) {
    return instance.post<ResponseRegister>('auth/register', userData)
  },
  loginUser(userData: CreateUserDataType) {
    return instance.post<UserType>('auth/login', userData)
  },
  logoutUser() {
    return instance.delete<ResponseRecoveryPassword>('auth/me', {})
  },
  me() {
    return instance.post<UserType>('auth/me', {})
  },
  updateUserProfile(userData: UpdateUserProfileType) {
    return instance.put<ResponseUpdateUser>('auth/me', userData)
  },
  sendRecoveryPassword(passwordRecoveryData: PasswordRecoveryDataType) {
    return instance.post<ResponseRecoveryPassword>('auth/forgot', passwordRecoveryData)
  },
  setNewPassword(newPasswordData: NewPasswordDataType) {
    return instance.post<ResponseRecoveryPassword>('auth/set-new-password', newPasswordData)
  },
}

export type CreateUserDataType = {
  email: string
  password: string
  rememberMe?: boolean
}

export type UserType = {
  _id: string
  email: string
  name: string
  avatar?: string
  publicCardPacksCount: number | null
  created: string
  updated: string
  isAdmin: boolean
  verified: boolean
  rememberMe: boolean
  error?: string
}

export type ResponseRecoveryPassword = {
  info: string
  error: string
}
export type ResponseUpdateUser = {
  updatedUser: UserType
  error?: string
}
export type ResponseRegister = {
  addedUser: {}
  error?: string
}

export type UpdateUserProfileType = {
  name?: string | null
  avatar?: string | null
}

export type PasswordRecoveryDataType = {
  email: string
  from?: string
  message: string
}

export type NewPasswordDataType = {
  password: string
  resetPasswordToken: string
}
