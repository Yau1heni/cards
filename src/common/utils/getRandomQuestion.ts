import { CardType } from '../../api/cardsApi/cardsAPI'

export const getRandomQuestion = (cards: CardType[]) => {
  let i = 0
  let s = 0
  const sum = cards.reduce((acc, card) => acc + (6 - card.grade!) * (6 - card.grade!), 0)
  const randomNumber = Math.random() * sum

  while (s < randomNumber) {
    s += (6 - cards[i].grade!) * (6 - cards[i].grade!)
    i++
  }
  return cards[i - 1]
}
