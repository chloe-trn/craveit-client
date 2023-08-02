import { render, screen, waitFor } from '@testing-library/react'
import { useNavigate, NavigateFunction } from 'react-router-dom'
import LoadingToRedirect from '../../../components/navigation/LoadingToRedirect'

type UseNavigateMock = jest.Mock<NavigateFunction>

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}))

jest.useFakeTimers()

describe('LoadingToRedirect', () => {
  it('should redirect to /auth after 5 seconds', async () => {
    // arrange
    const navigateMock = jest.fn() as UseNavigateMock 
    (useNavigate as UseNavigateMock).mockReturnValue(navigateMock)

    // act
    render(<LoadingToRedirect />)

    // assert
    const loadingText = screen.getByTestId('loading-redirect')
    expect(loadingText).toHaveTextContent('Redirecting you to the login screen in 5 seconds')
    jest.advanceTimersByTime(5000)

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('/auth')
    })
  })
})
