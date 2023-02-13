import { instance } from '../axiosSettings'

export const packsAPI = {
  getPacks(params: ParamsTypePacks) {
    return instance.get<ResponsePacksType>('cards/pack', {
      params,
    })
  },
  postPack(pack: CreatePackType) {
    return instance.post<ResponsePostPackType>('cards/pack', pack)
  },
  deletePack(id: string) {
    return instance.delete<ResponseDeletePackType>(`cards/pack?id=${id}`)
  },
  updatePack(pack: PackType) {
    return instance.put<ResponseUpdatedPackType>('cards/pack', pack)
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
  cardsPack: {
    name?: string
    deckCover?: string
    private?: boolean
  }
}

export type UpdatePackType = {
  cardsPack: {
    _id: string
    name?: string
  }
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
