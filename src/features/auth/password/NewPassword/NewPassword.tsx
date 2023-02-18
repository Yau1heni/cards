import React, { useState, MouseEvent } from 'react'
import Container from '@mui/material/Container'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Button from '@mui/material/Button'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import { Title } from '../../../../common/components/Title/Title'
import { createNewPassword } from '../../authSlice'
import { useAppDispatch } from '../../../../common/hooks/useAppDispatch'
import { PATH } from '../../../../app/Pages/Pages'
import { useAppSelector } from '../../../../common/hooks/useAppSelector'
import { selectAppIsSentPassword } from '../../../../common/selectors/appSelectors'

export const NewPassword = () => {
  const dispatch = useAppDispatch()
  const isSentPassword = useAppSelector(selectAppIsSentPassword)
  const navigate = useNavigate()

  let { token } = useParams()

  const validationSchema = yup.object({
    password: yup.string().min(7, 'Password is too short - should be 7 chars minimum.'),
  })

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      if (token) {
        dispatch(createNewPassword({ password: values.password, resetPasswordToken: token }))
      }
    },
  })

  if (isSentPassword) {
    navigate(PATH.SIGN_IN)
  }

  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h2" variant="h5">
        <Title title={'Create new Password'} />
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <FormControl sx={{ mt: 3, mb: 3 }} variant="standard" fullWidth>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            fullWidth
            id="password"
            name="password"
            required
            error={formik.touched.password && Boolean(formik.errors.password)}
            value={formik.values.password}
            onChange={formik.handleChange}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText
            id="password"
            error={formik.touched.password && Boolean(formik.errors.password)}
            disabled={formik.touched.password && !Boolean(formik.errors.password)}
          >
            {formik.errors.password}
          </FormHelperText>
        </FormControl>
        <Box>Create new password and we will send you further instructions to email</Box>
        <Button
          type={'submit'}
          color={'primary'}
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          variant={'contained'}
        >
          Create new password
        </Button>
      </form>
    </Container>
  )
}
