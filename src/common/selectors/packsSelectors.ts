import { AppRootStateType } from '../../app/store'

export const selectPacks = (state: AppRootStateType) => state.packs.packs
export const selectPacksPage = (state: AppRootStateType) => state.packs.searchParams.page
export const selectPacksUserId = (state: AppRootStateType) => state.packs.searchParams.user_id
export const selectPacksPageCount = (state: AppRootStateType) => state.packs.searchParams.pageCount
export const selectPacksTotalCount = (state: AppRootStateType) => state.packs.cardPacksTotalCount
export const selectPacksSearch = (state: AppRootStateType) => state.packs.searchParams.packName
export const selectPacksSort = (state: AppRootStateType) => state.packs.searchParams.sortPacks
export const selectPacksMax = (state: AppRootStateType) => state.packs.searchParams.max
export const selectPacksMin = (state: AppRootStateType) => state.packs.searchParams.min
