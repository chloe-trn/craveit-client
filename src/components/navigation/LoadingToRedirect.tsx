import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from './Loading'

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5)
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      // Start a countdown interval, update the count by decrementing it
      setCount((currentCount) => currentCount - 1)
    }, 1000)

    // Redirect to the specified route when count reaches 0
    if (count === 0) {
      clearInterval(interval)
      navigate('/auth')
    }

    // Clear the interval when the component is unmounted or the count changes
    return () => clearInterval(interval)
  }, [count, navigate])

  return (
    <>
      <Loading text={''}/> 
      <p data-testid='loading-redirect'>Redirecting you to the login screen in {count} seconds</p>
    </>
  )
}

export default LoadingToRedirect