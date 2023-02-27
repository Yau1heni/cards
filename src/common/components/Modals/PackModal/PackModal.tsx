import { BasicModal } from '../BasicModal/BasicModal'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import React, { FC, useState } from 'react'
import { addNewPack, updatePack } from '../../../../features/packs/packsSlice'
import { useAppDispatch } from '../../../hooks/useAppDispatch'

export const PackModal: FC<AddPackModalPropsType> = ({
  titleModal,
  openButtonName,
  openButtonType,
  id,
  packName,
}) => {
  const dispatch = useAppDispatch()

  const name = packName ? packName : ''
  const [newPackName, setNewPackName] = useState(name)

  const handleSetNewPackName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPackName(event.currentTarget.value)
  }

  const handleUpdatePack = () => {
    if (id) dispatch(updatePack({ name: newPackName, _id: id }))
  }

  const handleCreatePack = () => {
    dispatch(addNewPack({ name: newPackName }))
  }

  const onClick = openButtonType === 'edit' ? handleUpdatePack : handleCreatePack

  return (
    <BasicModal
      modalButtonType={'save'}
      title={titleModal}
      onClick={onClick}
      openButtonName={openButtonName}
      openButtonType={openButtonType}
    >
      <Box>
        <TextField
          value={newPackName}
          fullWidth
          id="pack"
          label="name pack"
          variant="standard"
          onChange={handleSetNewPackName}
        />
      </Box>
    </BasicModal>
  )
}

type AddPackModalPropsType = {
  titleModal: string
  openButtonName?: string
  openButtonType?: 'edit' | 'delete' | 'add'
  id?: string
  onClick?: () => void
  packName?: string
}
