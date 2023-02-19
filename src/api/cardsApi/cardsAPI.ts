import { instance } from '../axiosSettings'

export const cardsAPI = {
  getCards(params?: ParamsTypeCards) {
    return instance.get<ResponseCardsType>('cards/card', {
      params,
    })
  },
  postCard(card: CardType) {
    return instance.post<ResponsePostCardType>('cards/card', { card: card })
  },
  deleteCard(id: string) {
    return instance.delete<ResponseDeleteCardType>(`cards/card?id=${id}`)
  },
  updateCard(card: UpdateCardType) {
    return instance.put<ResponseUpdatedCardType>('cards/card', card)
  },
}

export type ParamsTypeCards = {
  cardAnswer?: string
  cardQuestion?: string
  cardsPack_id: string
  min?: number
  max?: number
  sortCards?: string
  page?: number
  pageCount?: number
}

export type CardType = {
  _id?: string
  cardsPack_id: string
  question?: string
  answer?: string
  grade?: number
  shots?: number
  answerImg?: string
  questionImg?: string
  user_name?: string
  created?: string
  updated?: string
}

export type UpdateCardType = {
  _id: string
  question: string
  answer?: string
}
export type ResponseCardsType = {
  cards: Array<CardType>
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string
}

export type ResponsePostCardType = {
  newCard: CardType
}

export type ResponseDeleteCardType = {
  deletedCard: CardType
}

export type ResponseUpdatedCardType = {
  updatedCard: CardType
}
