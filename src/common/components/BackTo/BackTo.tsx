import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import s from './BackTo.module.css'

type BackToPropsType = {
  title: string
  direction: string
}

export const BackTo: FC<BackToPropsType> = ({ title, direction }) => {
  return (
    <div className={s.navToMain}>
      <Link to={direction}>
        <KeyboardBackspaceIcon />
        Back to {title}
      </Link>
    </div>
  )
}
