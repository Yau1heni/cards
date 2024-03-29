import React, { ChangeEvent, useEffect } from 'react'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import { SelectChangeEvent } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '../../common/hooks/useAppDispatch'
import { useDebounce } from '../../common/hooks/useDebounce'
import { TableSearchBar } from '../../common/components/TableSearchbar/TableSearchbar'
import { CardBody } from './cardsTable/CardBody'
import { useAppSelector } from '../../common/hooks/useAppSelector'
import {
  getCards,
  removeCard,
  setCardSearchWord,
  setCardsPage,
  setCardsPageCount,
} from './cardsSlice'
import { TablePagination } from '../../common/components/TablePagination/TablePagination'
import s from './Cards.module.css'
import { Title } from '../../common/components/Title/Title'
import { CardHead } from './cardsTable/CardHead'
import { BackTo } from '../../common/components/BackTo/BackTo'
import { PATH } from '../../app/Pages/Pages'
import {
  selectCards,
  selectCardsPage,
  selectCardsPageCount,
  selectCardsSearch,
  selectCardsSort,
  selectCardsTotalCount,
  selectCardsUserId,
} from '../../common/selectors/cardsSelectors'
import { selectProfileUserId } from '../../common/selectors/profileSelectors'
import { CardModal } from '../../common/components/Modals/CardModal/CardModal'

export const Cards = () => {
  const dispatch = useAppDispatch()
  const { packId } = useParams()

  const cards = useAppSelector(selectCards)
  const page = useAppSelector(selectCardsPage)
  const sort = useAppSelector(selectCardsSort)
  const pageCount = useAppSelector(selectCardsPageCount)
  const search = useAppSelector(selectCardsSearch)
  const cardTotalCount = useAppSelector(selectCardsTotalCount)
  const userId = useAppSelector(selectCardsUserId)
  const myUserId = useAppSelector(selectProfileUserId)

  const isMyCards = myUserId === userId

  const debouncedValue = useDebounce<string>(search, 500)

  useEffect(() => {
    if (packId) {
      dispatch(getCards(packId))
    }
  }, [sort, packId, page, pageCount, debouncedValue])

  const handleSetPage = (event: ChangeEvent<unknown>, value: number) => {
    dispatch(setCardsPage(value))
  }

  const handleSetSearch = (value: string) => {
    dispatch(setCardSearchWord(value))
  }

  const handleSetPageCount = (event: SelectChangeEvent) => {
    dispatch(setCardsPageCount(+event.target.value))
  }

  const handleRemoveCard = (id: string) => {
    dispatch(removeCard(id))
  }

  return (
    <div className={s.wrapper}>
      <BackTo title={'Pack list'} direction={PATH.PACKS} />
      <div className={s.titleWrapper}>
        <Title title={isMyCards ? 'My pack' : "Friend's pack"} />
        <CardModal
          titleModal={'Add card'}
          openButtonName={'add card'}
          packId={packId}
          openButtonType={'add'}
        />
      </div>
      {cardTotalCount === 0 ? (
        <div>Pack is empty</div>
      ) : (
        <div>
          <div className={s.searchWrapper}>
            <TableSearchBar onChange={handleSetSearch} />
          </div>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <CardHead />
              <CardBody cards={cards} removeCard={handleRemoveCard} isMyCards={isMyCards} />
            </Table>
          </TableContainer>

          <TablePagination
            pageCount={pageCount}
            totalCountItems={cardTotalCount}
            handleSetPage={handleSetPage}
            handleSetPageCount={handleSetPageCount}
            page={page}
          />
        </div>
      )}
    </div>
  )
}
