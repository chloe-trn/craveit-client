import './quiz.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../app/redux-store'
import { useSubmitQuizMutation } from '../../services/tasteBudClientApi'
import { setQuizBody } from '../../services/quiz/quizBody'
import { clearQuiz } from '../../services/quiz/quizSlice'
import { setLoadingWithDelay } from '../../helpers/loading-helper'

import Loading from '../../components/navigation/loading/Loading'
import ProgressBar from '../../components/navigation/progress-bar/ProgressBar'
import QuizSubmissionError from '../error-pages/QuizSubmissionError'

import AddressMap from './questions/AddressMap'
import Distance from './questions/Distance'
import Cuisine from './questions/Cuisine'
import PriceRange from './questions/PriceRange'

const QuizPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // state variables
  const quizState = useSelector((state: RootState) => state.quiz)
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [isQuizCompleted, setIsQuizCompleted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState('')

  // reset quiz states
  const handleReset = () => {
    setCurrentQuestion(1)
    setIsQuizCompleted(false)
    setIsLoading(false)
    setIsError(false)
    setError('')
    dispatch(clearQuiz())
  }

  // go to previous and next quiz questions
  const nextPage = () => setCurrentQuestion(currentQuestion + 1)
  const previousPage = () => setCurrentQuestion(currentQuestion - 1)

  // mutation hook for submitting quiz
  const [submitQuiz, { data: quizData, isSuccess: isSubmitQuizSuccess, isError: isSubmitQuizError, error: submitQuizError }] = useSubmitQuizMutation()

  // handle quiz submission
  const handleSubmit = () => setIsQuizCompleted(true)

  // on component load, start quiz from a blank state
  useEffect(() => {
    handleReset()
    setQuizBody(null)
  }, [])
  
  // submit form values to get a quiz result
  useEffect(() => {
    const submitFormValues = async () => {
      let fullStreet

      if (quizState.location.streetContinued !== '') {
        fullStreet = quizState.location.street + ' ' + quizState.location.streetContinued
      } else {
        fullStreet = quizState.location.street
      }

      let fullAddress = `${fullStreet}, ${quizState.location.city}, ${quizState.location.state}, ${quizState.location.zipCode}`
      
      const body = {
        userId: '',
        date: new Date().toISOString(),
        location: fullAddress,
        distance: quizState.distance,
        cuisine: quizState.cuisine.join(','),
        priceRange: quizState.priceRange.join(','),
      }

      setQuizBody(body) 
      await setLoadingWithDelay(async () => {await submitQuiz(body)}, setIsLoading)
    }

    if (isQuizCompleted) {
      submitFormValues()
    }
  }, [isQuizCompleted])
  
   // handle quiz submission success
  useEffect(() => {
    if (isSubmitQuizSuccess && !isLoading) {
      handleReset()
      navigate('/result', { state: { quizData } })
    }
  }, [isSubmitQuizSuccess, isLoading])

  // handle quiz submission error
  useEffect(() => {
    if (isSubmitQuizError) {
      if (submitQuizError && 'data' in submitQuizError) {
        setError(submitQuizError.data as string)
      } else {
        setError('SERVER ERROR')
      }
      setIsError(true)
    }
  }, [isSubmitQuizError, submitQuizError])

  return (
    <section className='quiz'>
      {isLoading ? (
        <Loading text='Loading...' />
      ) : (
        !isError ? (
          <>
          <ProgressBar currentQuestion={currentQuestion} totalQuestions={4} />
            <form>
              {currentQuestion === 1 && <AddressMap quizState={quizState} onNext={nextPage} onReset={handleReset} />}
              {currentQuestion === 2 && <Distance quizState={quizState} onPrevious={previousPage} onNext={nextPage} onReset={handleReset} />}
              {currentQuestion === 3 && <Cuisine quizState={quizState} onPrevious={previousPage} onNext={nextPage} onReset={handleReset} />}
              {currentQuestion === 4 && <PriceRange quizState={quizState} onPrevious={previousPage} onSubmit={handleSubmit} onReset={handleReset}/>}
            </form>
          </>
        ): (<QuizSubmissionError onReset={handleReset} text={error}/> )
      )}
    </section>
  )
}

export default QuizPage