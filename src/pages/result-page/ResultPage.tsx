import './result.css'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSubmitQuizMutation } from '../../services/tasteBudClientApi'
import { clearQuiz } from '../../services/quiz/quizSlice'
import { getQuizBody } from '../../services/quiz/quizBody'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faTags } from '@fortawesome/free-solid-svg-icons'

import Loading from '../../components/navigation/loading/Loading'
import QuizSubmissionError from '../error-pages/QuizSubmissionError'
import StarRating from '../../components/misc/StarRating'
import InteractiveMap from '../../components/maps/InteractiveMap'

const ResultPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // state variables
  const [quizDataReturned, setQuizDataReturned] = useState(location.state?.quizData)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isError, setIsError] = useState(false)
  const [hasErrorRendered, setHasErrorRendered] = useState(false) // Flag to track error rendering

  // convert distance provided in km to mile
  const distanceInMiles = quizDataReturned ? (quizDataReturned.distance / 1609.34).toFixed(2) : null
  
  // reset quiz state and result page
  // redirect user back to quiz page
  const handleReset = () => {
    setIsLoading(false)
    setError('')
    setIsError(false)
    dispatch(clearQuiz())
    navigate('/quiz')
  }

  // mutation hook for submitting quiz
  const [submitQuiz, { data: quizData, isSuccess: isSubmitQuizSuccess, isError: isSubmitQuizError, error: submitQuizError },] 
  = useSubmitQuizMutation()

   // submit stored form values from the most recent quiz
   // to get another quiz result
  const handleFindAnother = async () => {
    // Pull quizState from cache 
    const body = getQuizBody()

    if (body !== null) {
      // set loading component while waiting for an api response
      setIsLoading(true)
      const startTime = Date.now()

      await submitQuiz(body) // async call to the api

      // if the server responds faster than the delay time
      // the loading component will be shown for at least the delay time
      const endTime = Date.now()
      const delay = 2500
      const remainingTime = delay - (endTime - startTime)

      if (remainingTime > 0) {
        await new Promise((resolve) => setTimeout(resolve, remainingTime))
      }

      // set state after the response is finished
      setIsLoading(false)
    } else {
      setError('This request cannot be made, please try again')
      setIsError(true)
    }
  }

  // when get directions is clicked, 
  // prepare data and open google map link
  const handleGetDirections = () => {
    const { location } = quizDataReturned
    const address = `${location.address1}, ${location.city}, ${location.state}`
    const encodedAddress = encodeURIComponent(address)
    const directionsLink = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`
    window.open(directionsLink, '_blank')
  }

  // handle quiz submission success
  useEffect(() => {
    if (isSubmitQuizSuccess) {
      setQuizDataReturned(quizData)
    }
  }, [isSubmitQuizSuccess, quizData])

  // handle quiz submission error
  useEffect(() => {
    const handleQuizError = () => {
      if (submitQuizError && 'data' in submitQuizError) {
        setError(submitQuizError.data as string)
      } else {
        setError('SERVER ERROR')
      }
      setIsError(true)
    }

    if (isSubmitQuizError) {
      handleQuizError()
    }
  }, [isSubmitQuizError, submitQuizError])

  // show an error message if the user navigates to this page
  // without taking a quiz first
  useEffect(() => {
    if (!quizDataReturned && !hasErrorRendered) { 
      setError('Please complete the questionnaire before we can find a matching restaurant for you')
      setIsError(true)
      setHasErrorRendered(true)
    }
  }, [quizDataReturned, hasErrorRendered])

  return (
    <section className='result'>
      {isLoading ? (
        <Loading text='Loading...' />
      ): 
      (isError ? ( 
        <QuizSubmissionError onReset={handleReset} text={error}/> 
        ) : (
        <>
        <h2>Destination found <span>🎯</span></h2> 
          <div className='result-wrapper'>
            <div className='column left'>
              <h3 className='result-heading'>{quizDataReturned?.name}</h3> 
              {quizDataReturned?.rating && <StarRating rating={quizDataReturned?.rating} />} 
              {quizDataReturned?.categories && quizDataReturned?.categories.length > 0 && (
                <p>
                  <span className='hidden'>Categories</span>
                  <FontAwesomeIcon icon={faTags} />
                  {quizDataReturned.categories.map((category: { alias: string, title: string }, index: number) => (
                    <span key={category.alias}>
                      {category.title.toLowerCase()}
                      {index !== quizDataReturned?.categories.length - 1 && ', '}
                    </span>
                  ))}
                </p>
              )}   
              {quizDataReturned?.phone && 
                <p>
                  <span className='hidden'>Phone</span>
                  <FontAwesomeIcon icon={faPhone} />
                  <a href={`tel:${quizDataReturned?.phone}`}>{quizDataReturned?.phone}</a>
                </p>
              }
              <div className='btn-wrapper'>
                <Link className='btn secondary' to={quizDataReturned?.url} target='_blank' rel='noopener noreferrer'>
                  View on Yelp
                </Link>
                <button className='btn primary' onClick={handleFindAnother}>
                  Find Another Spot
                </button>
              </div>
            </div>
            <div className='column right'>
              <InteractiveMap 
                longitude={quizDataReturned?.coordinates.longitude || 0} 
                latitude={quizDataReturned?.coordinates.latitude || 0}/> 
              <button className='btn tertiary' onClick={handleGetDirections}>
                Get Directions ({distanceInMiles} miles away)
              </button>
            </div>
          </div>
        </>
        ))}
    </section>
  )
}

export default ResultPage