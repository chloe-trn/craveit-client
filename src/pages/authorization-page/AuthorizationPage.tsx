import './authorization.css'
import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useLoginUserMutation, useRegisterUserMutation } from '../../services/clientApi'
import { setUser } from '../../services/auth/authSlice'
import { closeMenu } from '../../services/menu/menuSlice'
import { setLoadingWithDelay } from '../../helpers/loading-helper'

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

  // get user info from local storage if they are already logged in
  // redirect them to the home page
  const userDetails = JSON.parse(localStorage.getItem('tastebud_user') || '{}')
  useEffect(() => {
    dispatch(setUser(userDetails))

    if (userDetails && Object.keys(userDetails).length !== 0) {
      navigate('/home', { replace: true })
    }
  }, [])

  // state variables
  const [errorMessage, setErrorMessage] = useState('')
  const [registerView, setRegisterView] = useState(false)
  const [formValues, setFormValues] = useState(initialState)
  const [isLoading, setIsLoading] = useState(false)

  // mutation hooks for login and registration
  const [loginUser, { data: loginData, isSuccess: isLoginSuccess, isError: isLoginError, error: loginError }] = useLoginUserMutation()
  const [registerUser, { data: registerData, isSuccess: isRegisterSuccess, isError: isRegisterError, error: registerError }] = useRegisterUserMutation()

  // username and password validation helpers 
  const validateUsername = (username: string) => {
    return /^\S*$/.test(username)
  }
  
  const validatePassword = (password: string) => {
    return /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,}/.test(password)
  }

  // set the current form values if the user types
  const { username, email, password } = formValues 
  const handleChange = (e: any) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  // handles user registration, performs validation first 
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
      
      await setLoadingWithDelay(async () => {await registerUser({ username, email, password })}, setIsLoading)
    }
  }

  // handles user login
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (username && password) {
      await setLoadingWithDelay(async () => {await loginUser({ username, password })}, setIsLoading)
    } else {
      console.log('there is a login error')
    }
  }

  // handles registration or login success
  useEffect(() => {
    if (isRegisterSuccess && !isLoading) {
      if (registerData.status !== 'Success') {
        setErrorMessage(registerData.message)
      } else {
        dispatch(closeMenu())
        dispatch(setUser({ username: registerData.username, token: registerData.token, expiration: registerData.expiration }))
        navigate('/home')
      }
    }

    if (isLoginSuccess && !isLoading) {
      if (loginData.status !== 'Success') {
        setErrorMessage(loginData.message)
      } else {
        dispatch(closeMenu())
        dispatch(setUser({ username: loginData.username, token: loginData.token, expiration: loginData.expiration }))
        navigate('/home')
      }
    }
  }, [isRegisterSuccess, isLoginSuccess, isLoading])

  // handles registration or login errors
  useEffect(() => {
    isRegisterError && console.log('registration failed:', registerError)
    isLoginError && console.log('login failed:', loginError)
  }, [isRegisterError, isLoginError])

  // reset error message when switching from login/register screen
  useEffect(() => {
    setErrorMessage('')
  }, [registerView])

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
              <label htmlFor="username" className='hidden'>Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={handleChange}
                placeholder="enter username"
                required
              />
            </div>
            {registerView && (
              <div className="formfield">
                <label htmlFor="email" className='hidden'>Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="enter email"
                  required
                />
              </div>
            )}
            <div className="formfield">
              <label htmlFor="password" className='hidden'>Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="enter password"
                required
              />
            </div>
            <div className='btn-wrapper'>
              <input type="submit" className="btn arrow gradient" value='Submit' />
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default AuthorizationPage