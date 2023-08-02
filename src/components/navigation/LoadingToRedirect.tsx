import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from './Loading'

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5)
  const navigate = useNavigate()

  useEffect(() => {
    if (count === 0) {
      navigate('/auth')
    }
  }, [count, navigate])

  useEffect(() => {
    const timeout = setInterval(() => {
      setCount((currentCount) => currentCount - 1)
    }, 1000)

    return () => clearInterval(timeout)
  }, [])

  return (
    <>
      <Loading text={''}/> 
      <p data-testid='loading-redirect'>Redirecting you to the login screen in {count} seconds</p>
    </>
  )
}

export default LoadingToRedirect