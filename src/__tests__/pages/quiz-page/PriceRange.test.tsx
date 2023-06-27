import { fireEvent } from '@testing-library/react'
import { render, screen } from '../../../test-utils/render-util'
import { mockQuizState } from '../../../test-utils/mock-data'
import PriceRange from '../../../pages/quiz-page/questions/PriceRange'

const mockOnPrevious = jest.fn()
const mockOnSubmit = jest.fn()
const mockOnReset = jest.fn()

describe('PriceRange', () => {
  it('should enable the submit button when at least one price range is chosen', () => {
    // arrange and act
    render(<PriceRange quizState={mockQuizState} onPrevious={mockOnPrevious} onSubmit={mockOnSubmit} onReset={mockOnReset}/>)

    fireEvent.click(screen.getByLabelText('$11-$30'))

    const submitButton = screen.getByText('Submit')

    // assert
    expect(submitButton).toBeEnabled()
  })
  
  it('should disable the submit button when no price range is chosen', () => {
    // arrange and act
    render(<PriceRange quizState={mockQuizState} onPrevious={mockOnPrevious} onSubmit={mockOnSubmit} onReset={mockOnReset}/>)

    fireEvent.click(screen.getByLabelText('$11-$30'))
    fireEvent.click(screen.getByLabelText('$11-$30'))

    const submitButton = screen.getByText('Submit')

    // assert
    expect(submitButton).toBeDisabled() 
  })

  it('should call handlePrevious once when the previous button is clicked', () => {
    // arrange and act
    render(<PriceRange quizState={mockQuizState} onPrevious={mockOnPrevious} onSubmit={mockOnSubmit} onReset={mockOnReset}/>)

    fireEvent.click(screen.getByText('Previous'))

    // assert
    expect(mockOnPrevious).toHaveBeenCalledTimes(1)
  })

  it('should call handleReset once when the reset button is clicked', () => {
    // arrange and act
    render(<PriceRange quizState={mockQuizState} onPrevious={mockOnPrevious} onSubmit={mockOnSubmit} onReset={mockOnReset}/>)

    fireEvent.click(screen.getByText('Reset'))

    // assert
    expect(mockOnReset).toHaveBeenCalledTimes(1)
  })
})