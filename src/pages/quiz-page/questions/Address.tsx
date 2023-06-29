import { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { RootState } from '../../../redux/store'
import { setQuiz } from '../../../redux/slices/quizSlice'

type AddressProps = {
  quizState: RootState['quiz']
  onNext: () => void
  onReset: () => void
}

const Address = ({ quizState, onNext, onReset }: AddressProps) => {
  const dispatch = useDispatch()

  const [location, setLocation] = useState(quizState.location)
  const [isLocationValid, setIsLocationValid] = useState(quizState.location.street !== '')

  // validate the form by checking if all required inputs are filled
  const validateForm = () => {
    const requiredInputs = document.querySelectorAll<HTMLInputElement>('input[required]')
    let isValid = true

    requiredInputs.forEach((input) => {
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
  const handleReset = () => onReset()

  return (
    <>
      <p className='question'>What's your location?</p>
      <div className='formfield'>
        <label htmlFor='street'>Street Address</label>
        <input
          type='text'
          id='street'
          value={location.street || ''}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className='formfield'>
        <label htmlFor='streetContinued'>Street Address Continued</label>
        <input
          type='text'
          id='streetContinued'
          value={location.streetContinued || ''}
          onChange={handleInputChange}
        />
      </div>
      <div className='formfield'>
        <label htmlFor='city'>City</label>
        <input
          type='text'
          id='city'
          value={location.city || ''}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className='formfield'>
        <label htmlFor='state'>State</label>
        <input
          type='text'
          id='state'
          value={location.state || ''}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className='formfield'>
        <label htmlFor='zipCode'>Zip Code</label>
        <input
          type='text'
          id='zipCode'
          value={location.zipCode || ''}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className='btn-wrapper'>
        <button className='btn primary' onClick={handleReset}>
          Reset
        </button>
        <div className='inner-btn-wrapper'>
          <button className='btn primary' onClick={handleNext} disabled={!isLocationValid}>
            Next
          </button>
        </div>
      </div>
    </>
  )
}

export default Address