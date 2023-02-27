import { BasicModal } from '../BasicModal/BasicModal'
import Box from '@mui/material/Box'
import React, { FC } from 'react'

export const DeleteModal: FC<DeleteCardModalPropsType> = ({ name, onClick }) => {
  return (
    <BasicModal
      modalButtonType={'delete'}
      title={'Delete card'}
      onClick={onClick}
      openButtonName={'delete'}
      openButtonType={'delete'}
    >
      <Box>
        <p>Do you really want to remove {name}? All cards will be deleted.</p>
      </Box>
    </BasicModal>
  )
}

type DeleteCardModalPropsType = {
  name: string
  onClick: () => void
}
