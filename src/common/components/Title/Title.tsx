import React from 'react'
import s from './Title.module.css'

type TitleType = {
  title: string
}

export const Title = (props: TitleType) => {
  return <div className={s.title}>{props.title}</div>
}
