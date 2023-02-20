import React, { FC, ReactNode, useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import s from './BasicModal.module.css'
import { Title } from '../../Title/Title'
import CloseIcon from '@mui/icons-material/Close'

export const BasicModal: FC<BasicModalType> = ({ children, onClick, buttonType, title }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleSubmit = () => {
    onClick()
    handleClose()
  }

  return (
    <>
      <Button onClick={handleOpen}>open</Button>
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
              color={buttonType === 'save' ? 'primary' : 'error'}
            >
              {buttonType}
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
  buttonType: 'save' | 'delete'
  title: string
}

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
