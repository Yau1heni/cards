import React, { useState, MouseEvent } from 'react'
import {
  Box,
  Container,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Typography,
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Button from '@mui/material/Button'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useParams } from 'react-router-dom'
import { Title } from '../../../../common/components/Title/Title'

export const NewPassword = () => {
  let { token } = useParams()
  console.log(token)
  const validationSchema = yup.object({
    password: yup.string().min(7, 'Password is too short - should be 7 chars minimum.'),
  })

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values)
    },
  })

  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box>
        <Typography component="h2" variant="h5">
          <Title title={'Create new Password'} />
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <FormControl sx={{ width: '100% ' }} variant="standard" fullWidth>
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
          <div>Create new password and we will send you further instructions to email</div>
          <Button>Create new password</Button>
        </Box>
      </Box>
    </Container>
  )
}
