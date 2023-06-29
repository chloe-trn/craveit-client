import { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { RootState } from '../../redux/store'
import { setQuiz } from '../../redux/slices/quizSlice'
import AutocompleteMap  from '../maps/AutocompleteMap'

type AddressMapProps = {
  quizState: RootState['quiz']
  onNext: () => void
  onReset: () => void
}

const AddressMap = ({ quizState, onNext, onReset }: AddressMapProps) => {
  const dispatch = useDispatch()

  const [location, setLocation] = useState(quizState.location)
  const [isLocationValid, setIsLocationValid] = useState(quizState.location.street !== '')
  const [isReset, setIsReset] = useState(false)

  // validate the form by checking if all required inputs are filled
  const validateForm = () => {
    const requiredInputs = document.querySelectorAll<HTMLInputElement>('input[required]')
    let isValid = true

    requiredInputs.forEach((input) => {
      console.log('input:')
      console.log(input.value)
      if (input.value.trim() === '') {
        isValid = false
      }
    })

    setIsLocationValid(isValid)
  }

  // update the location state and
  // check form validity when the user types in any input 
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target

    setLocation((prevlocation) => ({
      ...prevlocation,
      [id]: value,
    }))

    validateForm()
  }

  // go to next question and 
  // update quiz state when next button is clicked
  const handleNext = (e: FormEvent) => {
    e.preventDefault()

    if (location) {
      const updatedQuizState = {
        ...quizState,
        location: location,
      }

      dispatch(setQuiz(updatedQuizState))
      onNext()
    }
  }

  // handle reset button click 
  const handleReset = () => {
    setIsReset(true)
    onReset()
  }

  return (
    <>
      <p className='question'>What's your current location?</p>
      <p className='sub-question'><em>Help us find the perfect dining spot by sharing where you are</em></p>
      <AutocompleteMap  
        location={location}
        onInputChange={handleInputChange}
        isReset={isReset} />
      <div className='btn-wrapper two-btn'>
        <button className='btn tertiary' onClick={handleReset}>
          Reset
        </button>
        <button className='btn secondary' onClick={handleNext} disabled={!isLocationValid}>
          Next
        </button>
      </div>
    </>
  )
}

export default AddressMap