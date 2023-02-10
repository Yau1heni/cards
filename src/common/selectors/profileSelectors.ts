import { AppRootStateType } from '../../app/store'

export const selectProfileUser = (state: AppRootStateType) => state.profile.userData
