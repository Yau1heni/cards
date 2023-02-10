import React, { ChangeEvent, useState } from 'react'
import editIcon from '../../../assets/img/editIcon.svg'
import s from './EditableSpan.module.css'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

type EditableSpanPropsType = {
  name: string | null
  changeName: (newName: string | null) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = ({ name, changeName }) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [newName, setNewName] = useState(name)

  const onEditMode = () => {
    setIsEditMode(true)
  }
  const offEditMode = () => {
    setIsEditMode(false)
    changeName(newName)
  }
  const onChangeEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewName(e.currentTarget.value)
  }

  const onClickEditHandler = () => {
    offEditMode()
  }

  return (
    <div className={s.editableSpan}>
      {isEditMode ? (
        <>
          <TextField
            onChange={onChangeEditHandler}
            value={newName ? newName : 'name'}
            label="enter name"
            size="small"
          />
          <Button variant={'outlined'} onClick={onClickEditHandler}>
            save
          </Button>
        </>
      ) : (
        <>
          <span onDoubleClick={onEditMode}>{name}</span>
          <img className={s.editIcon} onClick={onEditMode} src={editIcon} alt={'editIcon'} />
        </>
      )}
    </div>
  )
}
