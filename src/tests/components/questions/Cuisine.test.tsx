import { fireEvent } from '@testing-library/react'
import { render, screen } from '../../utils/custom-render'
import { mockQuizState } from '../../utils/mock-data'
import Cuisine from '../../../pages/quiz-page/questions/Cuisine'

const mockOnPrevious = jest.fn()
const mockOnNext = jest.fn()
const mockOnReset = jest.fn()

describe('Cuisine', () => {
  it('should enable the next button when all at least one cuisine is chosen', () => {
    // arrange and act
    render(<Cuisine quizState={mockQuizState} onPrevious={mockOnPrevious} onNext={mockOnNext} onReset={mockOnReset}/>)

    fireEvent.click(screen.getByLabelText('Thai'))

    const nextButton = screen.getByText('Next')

    // assert
    expect(nextButton).toBeEnabled()
  })
  
  it('should disable the next button when no cuisine is chosen', () => {
    // arrange and act
    render(<Cuisine quizState={mockQuizState} onPrevious={mockOnPrevious} onNext={mockOnNext} onReset={mockOnReset}/>)

    fireEvent.click(screen.getByLabelText('Thai'))
    fireEvent.click(screen.getByLabelText('Thai'))

    const nextButton = screen.getByText('Next')

    // assert
    expect(nextButton).toBeDisabled()
  })

  it('should call handlePrevious once when the previous button is clicked', () => {
    // arrange and act
    render(<Cuisine quizState={mockQuizState} onPrevious={mockOnPrevious} onNext={mockOnNext} onReset={mockOnReset}/>)

    fireEvent.click(screen.getByText('Previous'))

    // assert
    expect(mockOnPrevious).toHaveBeenCalledTimes(1)
  })

  it('should call handleReset once when the reset button is clicked', () => {
    // arrange and act
    render(<Cuisine quizState={mockQuizState} onPrevious={mockOnPrevious} onNext={mockOnNext} onReset={mockOnReset}/>)

    fireEvent.click(screen.getByText('Reset'))

    // assert
    expect(mockOnReset).toHaveBeenCalledTimes(1)
  })
})