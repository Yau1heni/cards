import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import * as yup from 'yup'
import s from './ForgotPassword.module.css'
import { Title } from '../../../../common/components/Title/Title'
import { passwordRecovery } from '../../authSlice'
import { useAppDispatch } from '../../../../common/hooks/useAppDispatch'
import { PATH } from '../../../../app/Pages/Pages'
import { selectAppIsSentRecoveryEmail } from '../../../../common/selectors/appSelectors'
import { useAppSelector } from '../../../../common/hooks/useAppSelector'

export const ForgotPassword = () => {
  const dispatch = useAppDispatch()
  const isSentRecoveryEmail = useAppSelector(selectAppIsSentRecoveryEmail)
  const navigate = useNavigate()

  const validationSchema = yup.object({
    email: yup.string().email('Enter a valid email').required('Email is required'),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(passwordRecovery(values.email))
    },
  })

  if (isSentRecoveryEmail) {
    navigate(PATH.PROFILE)
  }

  return (
    <div className={s.wrapper}>
      <Title title={'Forgot your Password?'} />
      <Box component="form" onSubmit={formik.handleSubmit}>
        <TextField
          variant="standard"
          margin="normal"
          required
          fullWidth
          id="email"
          name="email"
          label="Email"
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          value={formik.values.email}
          onChange={formik.handleChange}
          autoComplete="email"
          autoFocus
        />

        <div className={s.textWrapper}>
          <div className={s.textHint}>
            Enter your email address and we will send you further instructions
          </div>
          <Button fullWidth variant={'contained'}>
            Send instructions
          </Button>
          <div className={s.text}>Did you remember your password?</div>
          <Link to={PATH.SIGN_IN} style={{ textDecoration: 'none' }}>
            Try login in
          </Link>
        </div>
      </Box>
    </div>
  )
}
