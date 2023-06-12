import './authorization.css'
import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useLoginUserMutation, useRegisterUserMutation } from '../../services/tasteBudClientApi'
import { setUser } from '../../services/auth/authSlice'
import { closeMenu } from '../../services/menu/menuSlice'
import { faWarning } from '@fortawesome/free-solid-svg-icons'
import Loading from '../../components/navigation/loading/Loading'
import Message from '../../components/generic/Message'

const initialState = {
  username: '',
  email: '',
  password: '',
}

const AuthorizationPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userDetails = JSON.parse(localStorage.getItem('tastebud_user') || '{}')

  useEffect(() => {
    console.log('user:', userDetails)
    dispatch(setUser(userDetails))

    if (userDetails && Object.keys(userDetails).length !== 0) {
      navigate('/home', { replace: true })
    }
  }, [])

  const [errorMessage, setErrorMessage] = useState('')
  const [registerView, setRegisterView] = useState(false)
  const [formValues, setFormValues] = useState(initialState)
  const [isLoading, setIsLoading] = useState(false)
  const [isAsyncCallCompleted, setIsAsyncCallCompleted] = useState(false)

  const { username, email, password } = formValues

  const [
    loginUser,
    { data: loginData, isSuccess: isLoginSuccess, isError: isLoginError, error: loginError },
  ] = useLoginUserMutation()

  const [
    registerUser,
    { data: registerData, isSuccess: isRegisterSuccess, isError: isRegisterError, error: registerError },
  ] = useRegisterUserMutation()

  const validateUsername = (username: string) => {
    return /^\S*$/.test(username)
  }
  
  const validatePassword = (password: string) => {
    return /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,}/.test(password)
  }

  const handleChange = (e: any) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (username && email && password) {
      if (!validateUsername(username)) {
        setErrorMessage('Username should not contain spaces.')
        return
      }
  
      if (!validatePassword(password)) {
        setErrorMessage('Password should be at least 8 characters long and contain at least 1 special character, 1 letter, and 1 number.')
        return
      }
      
      setIsLoading(true)
      const startTime = Date.now()

      await registerUser({ username, email, password })

      const endTime = Date.now()
      const delay = 1500

      const remainingTime = delay - (endTime - startTime)

      if (remainingTime > 0) {
        await new Promise((resolve) => setTimeout(resolve, remainingTime))
      }

      setIsLoading(false)
      setIsAsyncCallCompleted(true)
    }
  }

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (username && password) {
      setIsLoading(true)
      const startTime = Date.now()

      await loginUser({ username, password })

      const endTime = Date.now()
      const delay = 2500

      const remainingTime = delay - (endTime - startTime)

      if (remainingTime > 0) {
        await new Promise((resolve) => setTimeout(resolve, remainingTime))
      }

      setIsLoading(false)
      setIsAsyncCallCompleted(true)
    } else {
      console.log('there is a login error')
    }
  }

  useEffect(() => {
    setErrorMessage('')
  }, [registerView])

  useEffect(() => {
    if (isRegisterSuccess && isAsyncCallCompleted) {
      if (registerData.status !== 'Success') {
        setErrorMessage(registerData.message)
      } else {
        dispatch(closeMenu())
        dispatch(setUser({ username: registerData.username, token: registerData.token, expiration: registerData.expiration }))
        navigate('/home')
      }
    }

    if (isLoginSuccess && isAsyncCallCompleted) {
      if (loginData.status !== 'Success') {
        setErrorMessage(loginData.message)
      } else {
        dispatch(closeMenu())
        dispatch(setUser({ username: loginData.username, token: loginData.token, expiration: loginData.expiration }))
        navigate('/home')
      }
    }
  }, [isRegisterSuccess, isLoginSuccess, isAsyncCallCompleted])

  useEffect(() => {
    isRegisterError && console.log('registration failed:', registerError)
    isLoginError && console.log('login failed:', loginError)
  }, [isRegisterError, isLoginError])

  return (
    <>
      {isLoading ? (
        <Loading text="Loading..." />
      ) : (
        <div className="auth-container">
          <h2 data-testid="auth-heading">{registerView ? 'Register' : 'Login'}</h2>
          <p className="desc">
            {registerView ? (
              <>
                Already have an account?
                <button className="link" onClick={() => setRegisterView(false)}>
                  Login
                </button>
              </>
            ) : (
              <>
                Don't have an account?
                <button data-testid='register-btn' className="link" onClick={() => setRegisterView(true)}>
                  Register
                </button>
              </>
            )}
          </p>
          {errorMessage && <Message className={'msg error'} icon={faWarning} text={errorMessage} />}
          <form onSubmit={registerView ? handleRegister : handleLogin}>
            <div className="formfield">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={handleChange}
                placeholder="Enter username"
                required
              />
            </div>
            {registerView && (
              <div className="formfield">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  required
                />
              </div>
            )}
            <div className="formfield">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
            </div>
            <input type="submit" className="btn primary" value={registerView ? 'Register' : 'Login'} />
          </form>
        </div>
      )}
    </>
  )
}

export default AuthorizationPage