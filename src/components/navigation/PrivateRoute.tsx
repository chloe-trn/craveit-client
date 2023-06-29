import { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { selectAuth } from '../../redux/slices/authSlice'
import LoadingToRedirect from './LoadingToRedirect'

type PrivateRouteProps = {
  children: ReactNode
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { token } = useSelector(selectAuth)

  // Render children if the user is logged in
  // otherwise render the 'LoadingToRedirect' component
  return token ? <>{children}</> : <LoadingToRedirect />
}

export default PrivateRoute