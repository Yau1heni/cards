import { instance } from '../axiosSettings'

export const packsAPI = {
  getPacks(params: ParamsTypePacks) {
    return instance.get<ResponsePacksType>('cards/pack', {
      params,
    })
  },
  createPack(payload: CreatePackType) {
    return instance.post<ResponsePostPackType>('cards/pack', { cardsPack: payload })
  },
  deletePack(id: string) {
    return instance.delete<ResponseDeletePackType>(`cards/pack?id=${id}`)
  },
  updatePack(payload: UpdatePackType) {
    return instance.put<ResponseUpdatedPackType>('cards/pack', { cardsPack: payload })
  },
}

export type PackType = {
  _id: string
  user_id: string
  user_name: string
  name: string
  cardsCount: number
  created: string
  updated: string
}

export type ParamsTypePacks = {
  packName?: string
  min?: number
  max?: number
  sortPacks?: string
  page?: number
  pageCount?: number
  user_id?: string
}

export type CreatePackType = {
  name: string
  deckCover?: string
  private?: boolean
}

export type UpdatePackType = {
  _id: string
  name: string
}

export type ResponsePacksType = {
  cardPacks: Array<PackType>
  cardPacksTotalCount: number
  maxCardsCount: number
  minCardsCount: number
  page: number
  pageCount: number
}

export type ResponsePostPackType = {
  newCardsPack: PackType
}

export type ResponseDeletePackType = {
  deletedCardsPack: PackType
}

export type ResponseUpdatedPackType = {
  updatedCardsPack: PackType
}
