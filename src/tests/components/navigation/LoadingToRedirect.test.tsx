import { render, act } from '@testing-library/react'
import LoadingToRedirect from '../../../components/navigation/LoadingToRedirect'

// Mock navigate function
const mockNavigate = jest.fn();

// Mock react-router-dom module 
// It overrides the useNavigate hook with the mockNavigate function
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate, 
 }))

describe('LoadingToRedirect', () => {
  it('should call navigate when count reaches 0', () => {
    // arrange
    jest.useFakeTimers()

    // act
    render(<LoadingToRedirect />)

    act(() => {
      jest.advanceTimersByTime(2000) 
    })

    // assert
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  })
})
