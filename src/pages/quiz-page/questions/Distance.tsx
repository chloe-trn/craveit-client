import { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { RootState } from '../../../app/redux-store'
import { setQuiz } from '../../../services/quiz/quizSlice'

type DistanceProps = {
  quizState: RootState['quiz']
  onPrevious: () => void
  onNext: () => void
  onReset: () => void
}

const Distance = ({ quizState, onPrevious, onNext, onReset }: DistanceProps) => {
  const dispatch = useDispatch()

  const [distance, setDistance] = useState(quizState.distance)
  const [isDistanceSelected, setIsDistanceSelected] = useState(quizState.distance !== '')

  // update quiz state with the distance chosen
  const setQuizState = () => {
    const updatedQuizState = {
      ...quizState,
      distance: distance,
    }

    dispatch(setQuiz(updatedQuizState))
  }

  // update the distance state when the user chooses a new radio button 
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDistance(e.target.value)
    setIsDistanceSelected(true)
  }

  // go to previous question and 
  // update quiz state when previous button is clicked
  const handlePrevious = () => {
    setQuizState()
    onPrevious()
  }

  // go to next question and 
  // update quiz state when next button is clicked
  const handleNext = (e: FormEvent) => {
    e.preventDefault()

    if (isDistanceSelected && distance) {
      setQuizState()
      onNext()
    }
  }

  // handle reset button click 
  const handleReset = () => {
    setIsDistanceSelected(false)
    onReset()
  }

  return (
    <>   
      <label className='question' htmlFor='distance'>What's your preferred travel distance from your current location?</label>
      <p className='sub-question'>Choose one option</p>
      <div className='input-group' id='distance'>
        <div className={`input-option ${distance === '8046' ? 'checked' : ''}`}>
          <input 
            type='radio' 
            id='distance5' 
            name='distance' 
            value='8046' 
            checked={distance === '8046'}
            onChange={handleRadioChange}/>
          <label htmlFor='distance5'>5 miles</label>
        </div>
        <div className={`input-option ${distance === '16093' ? 'checked' : ''}`}>
          <input 
            type='radio' 
            id='distance10' 
            name='distance' 
            value='16093' 
            checked={distance === '16093'}
            onChange={handleRadioChange}/>
          <label htmlFor='distance10'>10 miles</label>
        </div>
        <div className={`input-option ${distance === '24140' ? 'checked' : ''}`}>
          <input 
            type='radio' 
            id='distance15' 
            name='distance' 
            value='24140' 
            checked={distance === '24140'}
            onChange={handleRadioChange}/>
          <label htmlFor='distance15'>15 miles</label>
        </div>
        <div className={`input-option ${distance === '32187' ? 'checked' : ''}`}>
          <input 
            type='radio' 
            id='distance20' 
            name='distance' 
            value='32187' 
            checked={distance === '32187'}
            onChange={handleRadioChange}/>
          <label htmlFor='distance20'>20 miles</label>
        </div>
        <div className={`input-option ${distance === '40000' ? 'checked' : ''}`}>
          <input 
            type='radio' 
            id='distance25' 
            name='distance' 
            value='40000' 
            checked={distance === '40000'}
            onChange={handleRadioChange}/>
          <label htmlFor='distance25'>25 miles</label>
        </div>
      </div>
      <div className='btn-wrapper three-btn'>
        <button className='btn tertiary' onClick={handleReset}>Reset</button>
        <div className='inner-btn-wrapper'>
          <button className='btn quaternary' onClick={handlePrevious}>Previous</button>
          <button className='btn secondary' onClick={handleNext} disabled={!isDistanceSelected}>Next</button>
        </div>
      </div>
    </>
  )
}

export default Distance