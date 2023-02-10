import { Navigate, Outlet } from 'react-router-dom'
import { PATH } from './Pages'
import { useAppSelector } from '../../common/hooks/useAppSelector'
import { selectAppIsLoggedIn } from '../../common/selectors/appSelectors'

export const PrivateRoutes = () => {
  const isLoggedIn = useAppSelector(selectAppIsLoggedIn)

  return isLoggedIn ? <Outlet /> : <Navigate to={PATH.SIGN_IN} />
}
