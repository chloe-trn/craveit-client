import { render, screen } from '@testing-library/react'
import ProgressBar from '../../../components/navigation/ProgressBar'

const mockCurrentQuestion = 2
const mockTotalQuestions = 5

describe('ProgressBar', () => {
  it('should calculate the progress percentage correctly', () => {
    // arrange and act
    render(<ProgressBar currentQuestion={mockCurrentQuestion} totalQuestions={mockTotalQuestions} />)

    const progressPercentage = screen.getByTestId('progress-percentage')
    const progressBarStyle = window.getComputedStyle(progressPercentage)
    const width = progressBarStyle.getPropertyValue('width')

    const mockProgressPercentage = Math.ceil((mockCurrentQuestion / mockTotalQuestions) * 100)

    // assert
    expect(progressPercentage).toBeInTheDocument()
    expect(width).toBe(`${mockProgressPercentage}%`)
  })

  it('should have the correct accessibility attributes', () => {
    // arrange and act
    render(<ProgressBar currentQuestion={mockCurrentQuestion} totalQuestions={mockTotalQuestions} />)

    const progressBar = screen.getByRole('progressbar')

    // assert
    expect(progressBar).toBeInTheDocument()
    expect(progressBar).toHaveAttribute('aria-valuemin', '1')
    expect(progressBar).toHaveAttribute('aria-valuemax', '5')
    expect(progressBar).toHaveAttribute('aria-valuenow', '2')
    expect(progressBar).toHaveAttribute('aria-valuetext', `Question ${mockCurrentQuestion} of ${mockTotalQuestions}`)
  })
})
