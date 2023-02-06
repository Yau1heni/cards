import React from 'react'
import Grid from '@mui/material/Grid'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Button from '@mui/material/Button'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Title } from '../../../common/components/Title/Title'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { login } from '../authSlice'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { Link, useNavigate } from 'react-router-dom'

export const SignIn = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector((s) => s.auth.isLoggedIn)
  const navigate = useNavigate()

  const validationSchema = yup.object({
    email: yup.string().email('Enter a valid email').required('Email is required'),
    password: yup
      .string()
      .min(7, 'Password is too short - should be 7 chars minimum.')
      .required('Password is required'),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(login(values))
    },
  })

  const [showPassword, setShowPassword] = React.useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
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
              <FormControlLabel
                label={'Remember me'}
                control={
                  <Checkbox
                    {...formik.getFieldProps('rememberMe')}
                    checked={formik.values.rememberMe}
                  />
                }
              />
              <Grid item sx={{ display: 'flex', justifyContent: 'end' }}>
                <Link to={'/forgotPassword'}>Forgot password?</Link>
              </Grid>
              <Button type={'submit'} variant={'contained'} color={'primary'} sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
              <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                <Link to={'/signup'}>{"Don't have an account? Sign Up"}</Link>
              </Grid>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  )
}
