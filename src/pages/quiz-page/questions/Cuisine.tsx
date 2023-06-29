import { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { RootState } from '../../../redux/store'
import { setQuiz } from '../../../redux/slices/quizSlice'

type CuisineProps = {
  quizState: RootState['quiz']
  onPrevious: () => void
  onNext: () => void
  onReset: () => void
}

const Cuisine = ({ quizState, onPrevious, onNext, onReset }: CuisineProps) => {
  const dispatch = useDispatch()

  const [cuisine, setCuisine] = useState(quizState.cuisine)
  const [isCuisineSelected, setIsCuisineSelected] = useState(quizState.cuisine.length > 0)

  // update quiz state with the cuisine chosen 
  const setQuizState = () => {
    const updatedQuizState = {
      ...quizState,
      cuisine: cuisine,
    }

    dispatch(setQuiz(updatedQuizState))
  }

  // gets value of cuisine chosen and update current cuisine state
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkboxValue = e.target.value
    const updatedCuisine = [...cuisine]

    // check if cuisine chosen already exists in the array
    const index = updatedCuisine.indexOf(checkboxValue)

    // add cuisine to array if it's not there
    // remove it otherwise
    if (index > -1) {
      updatedCuisine.splice(index, 1)
    } else {
      updatedCuisine.push(checkboxValue)
    }

    // update cuisine state
    setCuisine(updatedCuisine) 
    setIsCuisineSelected(updatedCuisine.length > 0 )
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

    if (isCuisineSelected && cuisine) {
      setQuizState()
      onNext()
    }
  }

  // handle reset button click 
  const handleReset = () => {
    setIsCuisineSelected(false)
    onReset()
  }

  return (
    <>
      <label className='question' htmlFor='cuisine'>
        What type of cuisine are you craving?
      </label>
      <p className='sublabel'>Choose one or more options</p>
      <div className='input-group' id='cuisine'>
        <div className={`input-option ${cuisine.includes('thai') ? 'checked' : ''}`}>
          <input 
            type='checkbox' 
            id='thai' 
            name='cuisine' 
            value='thai' 
            checked={cuisine.includes('thai')}
            onChange={handleCheckboxChange}/>
          <label htmlFor='thai'>Thai</label>
        </div>
        <div className={`input-option ${cuisine.includes('korean') ? 'checked' : ''}`}>
          <input 
            type='checkbox' 
            id='korean' 
            name='cuisine' 
            value='korean' 
            checked={cuisine.includes('korean')}
            onChange={handleCheckboxChange}/>
          <label htmlFor='korean'>Korean</label>
        </div>
        <div className={`input-option ${cuisine.includes('japanese') ? 'checked' : ''}`}>
          <input 
            type='checkbox' 
            id='japanese' 
            name='cuisine' 
            value='japanese' 
            checked={cuisine.includes('japanese')}
            onChange={handleCheckboxChange}/>
          <label htmlFor='japanese'>Japanese</label>
        </div>
        <div className={`input-option ${cuisine.includes('american') ? 'checked' : ''}`}>
          <input 
            type='checkbox' 
            id='american' 
            name='cuisine' 
            value='american'
            checked={cuisine.includes('american')}
            onChange={handleCheckboxChange}/>
          <label htmlFor='american'>American</label>
        </div>
        <div className={`input-option ${cuisine.includes('vietnamese') ? 'checked' : ''}`}>
          <input 
            type='checkbox' 
            id='vietnamese' 
            name='cuisine' 
            value='vietnamese' 
            checked={cuisine.includes('vietnamese')}
            onChange={handleCheckboxChange}/>
          <label htmlFor='vietnamese'>Vietnamese</label>
        </div>
        <div className={`input-option ${cuisine.includes('mexican') ? 'checked' : ''}`}>
          <input 
            type='checkbox' 
            id='mexican' 
            name='cuisine' 
            value='mexican'
            checked={cuisine.includes('mexican')}
            onChange={handleCheckboxChange}/>
          <label htmlFor='mexican'>Mexican</label>
        </div>
      </div>
      <div className='btn-wrapper three-btn'>
        <button className='btn tertiary' onClick={handleReset}>Reset</button>
        <div className='inner-btn-wrapper'>
          <button className='btn quaternary' onClick={handlePrevious}>Previous</button>
          <button className='btn secondary' onClick={handleNext} disabled={!isCuisineSelected} >Next</button>
        </div>
      </div>
    </>
  )
}

export default Cuisine