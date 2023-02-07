import React from 'react'
import Button from '@mui/material/Button'
import check from '../../../../assets/img/check.svg'
import s from './CheckEmailPage.module.css'
import { Title } from '../../../../common/components/Title/Title'
import { Link } from 'react-router-dom'

export const CheckEmailPage = () => {
  return (
    <div className={s.container}>
      <Title title={'Check Email'} />
      <div>
        <img src={check} className={s.img} alt="check" />
      </div>
      <p>We’ve sent an Email with instructions to example@mail.com</p>
      <Button variant={'contained'}>
        <Link style={{ textDecoration: 'none', color: 'white' }} to={'/login'}>
          Back to login
        </Link>
      </Button>
    </div>
  )
}
