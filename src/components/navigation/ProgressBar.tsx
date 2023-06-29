type ProgressBarProps = {
  currentQuestion: number
  totalQuestions: number
}

// displays the progress of a quiz or questionnaire
const ProgressBar = ({ currentQuestion, totalQuestions }: ProgressBarProps ) => {
  // calculate the progress in percentage
  const progressPercentage = Math.ceil((currentQuestion / totalQuestions) * 100)

  return (
    <div className='progress-wrapper'>
      <div
        className='progress-bar-container'
        role='progressbar'
        aria-valuemin={1}
        aria-valuemax={totalQuestions}
        aria-valuenow={currentQuestion}
        aria-valuetext={`Question ${currentQuestion} of ${totalQuestions}`}>
        <div data-testid='progress-percentage' className='progress-bar' style={{ width: `${progressPercentage}%` }}></div>
      </div>
      <span className='progress-text'>{`${currentQuestion}/${totalQuestions}`}</span>
    </div>
  )
}

export default ProgressBar