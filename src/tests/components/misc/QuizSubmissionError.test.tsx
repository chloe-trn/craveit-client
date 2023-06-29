import { render, screen, fireEvent } from '@testing-library/react'
import QuizSubmissionError from '../../../components/misc/QuizSubmissionError'

const mockErrorMessage = 'Mock error message'
const mockReset = jest.fn()

describe('QuizSubmissionError', () => {
  it('displays correct error message', () => {
    // arrange and act
    render(<QuizSubmissionError onReset={mockReset} text={mockErrorMessage} />)
    
    // assert
    expect(screen.getByText('REQUEST ERROR: ' + mockErrorMessage)).toBeInTheDocument()
  })

  it('calls onReset when "Start Request Again" is clicked', () => {
    // arrange and act
    render(<QuizSubmissionError onReset={mockReset} text={mockErrorMessage} />)
    fireEvent.click(screen.getByText('Start request again'))
    
    // assert
    expect(mockReset).toHaveBeenCalledTimes(1)
  })
})