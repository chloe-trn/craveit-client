import { faWarning } from '@fortawesome/free-solid-svg-icons'
import Message from "../generic/Message"

type QuizSubmissionErrorProps = {
  onReset: () => void
  text: string
}

const QuizSubmissionError = ({ onReset, text }: QuizSubmissionErrorProps) => {

  const handleReset = () => onReset()

  return (
    <>
      <Message className={'msg error'} icon={faWarning} text={'REQUEST ERROR: ' + text} />
      <button className='btn primary' onClick={handleReset}>Start request again</button>
    </>
  )
}

export default QuizSubmissionError