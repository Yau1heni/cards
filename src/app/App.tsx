import React, { useEffect } from 'react'
import './App.css'
import { Pages } from './Pages/Pages'
import { useAppSelector } from '../common/hooks/useAppSelector'
import { useAppDispatch } from '../common/hooks/useAppDispatch'
import { initializedApp } from './appSlice'
import LinearProgress from '@mui/material/LinearProgress'
import { ErrorSnackbar } from '../common/components/ErrorSnackbar/ErrorSnackbar'

function App() {
  const status = useAppSelector((s) => s.app.status)
  const isInitialized = useAppSelector((s) => s.app.initialized)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializedApp())
  }, [])

  if (!isInitialized) {
    return <LinearProgress />
  }

  return (
    <>
      {status === 'loading' && <LinearProgress />}
      <div className="App">
        <Pages />
      </div>
      <ErrorSnackbar />
    </>
  )
}

export default App
