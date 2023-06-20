import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { RootState } from '../../../app/redux-store'
import { setQuiz } from '../../../services/quiz/quizSlice'

type PriceRangeProps = {
  quizState: RootState['quiz']
  onPrevious: () => void
  onSubmit: () => void 
  onReset: () => void
}

const PriceRange = ({ quizState, onPrevious, onSubmit, onReset }: PriceRangeProps) => {
  const dispatch = useDispatch()

  const [priceRange, setPriceRange] = useState(quizState.priceRange)
  const [isPriceRangeSelected, setIsPriceRangeSelected] = useState(quizState.priceRange.length > 0)

  // update quiz state with the price range chosen 
  const setQuizState = () => {
    const updatedQuizState = {
      ...quizState,
      priceRange: priceRange,
    }

    dispatch(setQuiz(updatedQuizState))
  }

  // gets value of price range chosen and update current price range state
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkboxValue = e.target.value
    const updatedPriceRange = [...priceRange] 

    // check if the price range chosen already exists in the array
    const index = updatedPriceRange.indexOf(checkboxValue)

    // add price range to array if it's not there
    // remove it otherwise
    if (index > -1) {
      updatedPriceRange.splice(index, 1)
    } else {
      updatedPriceRange.push(checkboxValue)
    }

    // update price range state
    setPriceRange(updatedPriceRange) 
    setIsPriceRangeSelected(updatedPriceRange.length > 0)    
  }

  // set the quiz state with price range info and process quiz submission 
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    if (isPriceRangeSelected && priceRange.length > 0) {
      setQuizState()
      onSubmit()
    }
  }

  // go to previous question and 
  // update quiz state when previous button is clicked
  const handlePrevious = () =>{
    setQuizState()
    onPrevious()
  }

  // handle reset button click 
  const handleReset = () => {
    setIsPriceRangeSelected(false)
    onReset()
  }

  return (
    <>
      <label className='question' htmlFor='priceRange'>
        What's your price range?
      </label>
      <p className='sublabel'>Choose one or more</p>
      <div className='input-group' id='priceRange'>
        <div className='input-option'>
          <input 
            type='checkbox' 
            id='priceLow' 
            name='priceRange' 
            value='1' 
            checked={priceRange.includes('1')}
            onChange={handleCheckboxChange}/>
          <label htmlFor='priceLow'>$</label>
        </div>
        <div className='input-option'>
          <input 
            type='checkbox' 
            id='priceMedium' 
            name='priceRange' 
            value='2' 
            checked={priceRange.includes('2')}
            onChange={handleCheckboxChange}/>
          <label htmlFor='priceMedium'>$$</label>
        </div>
        <div className='input-option'>
          <input 
            type='checkbox' 
            id='priceHigh' 
            name='priceRange' 
            value='3' 
            checked={priceRange.includes('3')}
            onChange={handleCheckboxChange}/>
          <label htmlFor='priceHigh'>$$$</label>
        </div>
        <div className='input-option'>
          <input 
            type='checkbox' 
            id='priceHighest' 
            name='priceRange' 
            value='4' 
            checked={priceRange.includes('4')}
            onChange={handleCheckboxChange}/>
          <label htmlFor='priceHighest'>$$$$</label>
        </div>
      </div>
      <div className='btn-wrapper'>
        <button className='btn primary' onClick={handleReset}>Reset</button>
        <div className='inner-btn-wrapper'>
          <button onClick={handlePrevious} className='btn primary'>Previous</button>
          <button type='submit' className='btn submit' onClick={handleSubmit} disabled={!isPriceRangeSelected}>Submit</button>
        </div>
      </div>
    </>
  )
}

export default PriceRange