import React, { FC, ReactNode, useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import s from './BasicModal.module.css'
import { Title } from '../../Title/Title'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Tooltip from '@mui/material/Tooltip'
import AddIcon from '@mui/icons-material/Add'

export const BasicModal: FC<BasicModalType> = ({
  children,
  onClick,
  modalButtonType,
  title,
  openButtonName,
  openButtonType,
}) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleSubmit = () => {
    onClick()
    handleClose()
  }

  const openButtonSwitch = (openButtonType: OpenButtonType) => {
    switch (openButtonType) {
      case 'edit':
        return (
          <Tooltip title={'edit'}>
            <IconButton onClick={handleOpen}>
              <EditIcon fontSize={'medium'} />
            </IconButton>
          </Tooltip>
        )
      case 'delete':
        return (
          <Tooltip title={'delete'}>
            <IconButton onClick={handleOpen}>
              <DeleteForeverIcon fontSize={'medium'} />
            </IconButton>
          </Tooltip>
        )
      case 'add':
        return (
          <Button variant={'contained'} onClick={handleOpen}>
            {openButtonName}
          </Button>
        )
      case 'addIcon':
        return (
          <Tooltip title={'add card'}>
            <IconButton onClick={handleOpen}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        )
    }
  }

  return (
    <>
      {openButtonType && openButtonSwitch(openButtonType)}

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className={s.headerWrapper}>
            <Title title={title} />
            <IconButton onClick={handleClose}>
              <CloseIcon fontSize={'medium'} />
            </IconButton>
          </div>
          {children}
          <div className={s.buttonWrapper}>
            <Button onClick={handleClose} variant={'text'} color={'inherit'}>
              cancel
            </Button>
            <Button
              onClick={handleSubmit}
              variant={'contained'}
              color={modalButtonType === 'save' ? 'primary' : 'error'}
            >
              {modalButtonType}
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  )
}

type BasicModalType = {
  children: ReactNode
  onClick: () => void
  modalButtonType: 'save' | 'delete'
  title: string
  openButtonName?: string
  openButtonType?: OpenButtonType
}

export type OpenButtonType = 'edit' | 'delete' | 'add' | 'addIcon'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 380,
  bgcolor: 'background.paper',
  borderRadius: '2px',
  boxShadow: 24,
  p: 4,
}
