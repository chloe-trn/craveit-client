import { render, screen } from '@testing-library/react'
import { useSelector } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import PrivateRoute from '../../../components/navigation/PrivateRoute'

// Mock useSelector 
jest.mock('react-redux', () => ({
  useSelector: jest.fn()
}))

describe('PrivateRoute', () => {
  it('renders children when the user is logged in', () => {
    // arrange 
    (useSelector as jest.Mock).mockReturnValue({ token: 'mock_token' })

    // act
    render(
      <MemoryRouter>
        <PrivateRoute>
          <div>Children Component</div>
        </PrivateRoute>
      </MemoryRouter>
    )

    const childElement = screen.getByText('Children Component')

    // assert
    expect(childElement).toBeInTheDocument()
  })

  it('renders LoadingToRedirect when the user is not logged in', () => {
    // arrange
    (useSelector as jest.Mock).mockReturnValue({ token: '' })

    // act
    render(
      <MemoryRouter>
        <PrivateRoute>
          <div>Children Component</div>
        </PrivateRoute>
      </MemoryRouter>
    )
    
    const loadingElement = screen.getByText(/Redirecting you./i)

    // assert
    expect(loadingElement).toBeInTheDocument()
  })
})