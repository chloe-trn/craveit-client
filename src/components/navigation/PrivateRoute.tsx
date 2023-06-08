import { useSelector } from 'react-redux'
import { selectAuth } from '../../services/auth/authSlice'
import LoadingToRedirect from './LoadingToRedirect'

const PrivateRoute = ({ children }: { children: any }) => {
  const { token } = useSelector(selectAuth)

  // Render children if the user is logged in
  // otherwise render the 'LoadingToRedirect' component
  return token ? children : <LoadingToRedirect />
}

export default PrivateRoute
