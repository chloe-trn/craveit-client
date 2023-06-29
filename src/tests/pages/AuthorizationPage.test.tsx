import { fireEvent } from '@testing-library/react'
import { render, screen } from '../utils/custom-render'
import AuthorizationPage from '../../pages/AuthorizationPage'

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}))

// mock navigate function
const mockNavigate = jest.fn();

// mock react-router-dom module 
// overrides the useNavigate hook with the mockNavigate function
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate, 
}))

describe('AuthorizationPage', () => {
  it('should render login form when registerView is false', () => {
    // arrange and act 
    render(<AuthorizationPage />)
  
    const formHeading = screen.getByTestId('auth-heading')
    const usernameField = screen.getByLabelText('Username') 
    const emailField = screen.queryByLabelText('Email')
    const passwordField = screen.getByLabelText('Password')
    const formFooterQuestion = screen.getByText('Don\'t have an account?')
  
    // assert
    expect(formHeading).toBeInTheDocument()
    expect(usernameField).toBeInTheDocument()
    expect(emailField).toBeNull()
    expect(passwordField).toBeInTheDocument()
    expect(formFooterQuestion).toBeInTheDocument()
  })

  it('should render registration form when registerView is true', () => {
    // arrange and act 
    render(<AuthorizationPage />)

    const registerBtn = screen.getByTestId('register-btn')
    fireEvent.click(registerBtn)

    const formHeading = screen.getByTestId('auth-heading')
    const usernameField = screen.getByLabelText('Username') 
    const emailField = screen.getByLabelText('Email')
    const passwordField = screen.getByLabelText('Password')
    const formFooterQuestion = screen.getByText('Already have an account?')

    // assert
    expect(formHeading).toBeInTheDocument()
    expect(usernameField).toBeInTheDocument()
    expect(emailField).toBeInTheDocument()
    expect(passwordField).toBeInTheDocument()
    expect(formFooterQuestion).toBeInTheDocument()
  })
})
