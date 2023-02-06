import { Navigate } from 'react-router-dom'
import { PATH } from '../../app/Pages/Pages'

export const Profile = () => {
  return (
    <div>
      <Navigate to={PATH.SIGN_IN} />
      Profile
    </div>
  )
}
