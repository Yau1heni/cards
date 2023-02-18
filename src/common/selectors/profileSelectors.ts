import { AppRootStateType } from '../../app/store'

export const selectProfileUser = (state: AppRootStateType) => state.profile.userData
export const selectProfileUserId = (state: AppRootStateType) => state.profile.userData._id
