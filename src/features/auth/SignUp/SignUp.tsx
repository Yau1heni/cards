import React, { useState } from 'react'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { register } from '../authSlice'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { Title } from '../../../common/components/Title/Title'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Button from '@mui/material/Button'

export const SignUp = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector((s) => s.auth.isLoggedIn)
  const navigate = useNavigate()

  const validationSchema = yup.object({
    email: yup.string().email('Enter a valid email').required('Email is required'),
    password: yup
      .string()
      .min(7, 'Password is too short - should be 7 chars minimum.')
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Password are not matching!')
      .required('Confirm Password is required'),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: (values) => {
      let { email, password } = values
      dispatch(register({ email, password }))
    },
  })

  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show)
  const handleMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  if (isLoggedIn) {
    navigate('/profile')
  }

  return (
    <Grid container sx={{ justifyContent: 'center', marginTop: 6 }}>
      <Grid item sx={{ width: '40ch' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
          <Title title={'Sign Up'} />
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <FormControl fullWidth>
            <FormGroup>
              <TextField label="Email" margin="normal" {...formik.getFieldProps('email')} />
              {formik.touched.email && formik.errors.email ? (
                <div style={{ color: 'red' }}>{formik.errors.email}</div>
              ) : null}

              <FormControl sx={{ marginTop: 2 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  name="password"
                  onChange={formik.handleChange}
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>

              {formik.touched.password && formik.errors.password ? (
                <div style={{ color: 'red' }}>{formik.errors.password}</div>
              ) : null}

              <FormControl sx={{ marginTop: 2 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Confirm password</InputLabel>
                <OutlinedInput
                  id="confirmPassword"
                  name="confirmPassword"
                  onChange={formik.handleChange}
                  type={showConfirmPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>

              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <div style={{ color: 'red' }}> {formik.errors.confirmPassword}</div>
              ) : null}

              <Button type={'submit'} variant={'contained'} color={'primary'} sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
              <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                <Link to={'/signin'}>{'Already have an account? Sign In'}</Link>
              </Grid>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  )
}
