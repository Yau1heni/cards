import { Dispatch } from '@reduxjs/toolkit'

export const handleSortTable = (
  property: string,
  sort: string,
  dispatch: Dispatch,
  actionCreator: any,
) => {
  dispatch(actionCreator(sort === `0${property}` ? `1${property}` : `0${property}`))
}
