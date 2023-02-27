import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'

import { authReducer } from '../features/auth/authSlice'
import { appReducer } from './appSlice'
import { profileReducer } from '../features/profile/profileSlice'
import { packsReducer } from '../features/packs/packsSlice'
import { cardsReducer } from '../features/cards/cardsSlice'
import { learnReducer } from '../features/learn/learnSlice'

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    profile: profileReducer,
    packs: packsReducer,
    cards: cardsReducer,
    learn: learnReducer,
  },
})

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>
