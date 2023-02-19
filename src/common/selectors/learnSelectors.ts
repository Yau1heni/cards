import { AppRootStateType } from '../../app/store'

export const selectLearnCard = (state: AppRootStateType) => state.learn.currentCard
export const selectIsChecked = (state: AppRootStateType) => state.learn.isCheckedAnswer
