import { AppRootStateType } from '../../app/store'

export const selectCards = (state: AppRootStateType) => state.cards.cards
export const selectCardsPage = (state: AppRootStateType) => state.cards.page
export const selectCardsSort = (state: AppRootStateType) => state.cards.sort
export const selectCardsPageCount = (state: AppRootStateType) => state.cards.pageCount
export const selectCardsSearch = (state: AppRootStateType) => state.cards.cardSearch
export const selectCardsTotalCount = (state: AppRootStateType) => state.cards.cardsTotalCount
export const selectCardsUserId = (state: AppRootStateType) => state.cards.cardsPack_id
