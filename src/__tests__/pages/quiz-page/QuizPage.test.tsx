import { render, screen } from '../../../test-utils/render-util'
import QuizPage from '../../../pages/quiz-page/QuizPage'

describe('QuizPage', () => {
  it('should render first quiz question with reset and next button', () => {
    // arrange and act 
    render(<QuizPage />)
    const addressQuestion = screen.getByText("What's your location?")
    const resetButton = screen.getByText('Reset')
    const nextButton = screen.getByText('Next')

    // assert
    expect(addressQuestion).toBeInTheDocument()
    expect(resetButton).toBeInTheDocument()
    expect(nextButton).toBeInTheDocument()
  })
})
