import './result.css'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSaveResultMutation, useSubmitQuizMutation } from '../../services/clientApi'
import { clearQuiz } from '../../services/quiz/quizSlice'
import { getQuizBody } from '../../services/quiz/quizBody'
import { setLoadingWithDelay } from '../../helpers/loading-helper'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faTags, faGlobe, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

import Loading from '../../components/navigation/loading/Loading'
import Message from '../../components/generic/Message'
import QuizSubmissionError from '../error-pages/QuizSubmissionError'
import StarRating from '../../components/misc/StarRating'
import InteractiveMap from '../../components/maps/InteractiveMap'

const ResultPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // state variables
  const [quizDataReturned, setQuizDataReturned] = useState(location.state?.quizData?.business)
  const [quizId, setQuizId] = useState(location.state?.quizData?.quizId)

  const [isLoading, setIsLoading] = useState(false)

  const [error, setError] = useState('')
  const [isError, setIsError] = useState(false)

  const [isSaveClicked, setIsSaveClicked] = useState(false)
  const [isSaveError, setIsSaveError] = useState(false)
  const [saveResponse, setSaveResponse] = useState('')

  // convert distance provided in km to mile
  const distanceInMiles = quizDataReturned ? (quizDataReturned.distance / 1609.34).toFixed(2) : null

  // mutation hooks for saving result and submitting another quiz
  const [saveResult, { isSuccess: isSaveResultSuccess, isError: isSaveResultError, error: saveResultError }] = useSaveResultMutation();

  const [submitQuiz, { data: quizData, isSuccess: isSubmitQuizSuccess, isError: isSubmitQuizError, error: submitQuizError }] = useSubmitQuizMutation()
  
  // reset quiz state and result page, redirect user back to quiz page
  const handleReset = () => {
    setIsLoading(false)
    setError('')
    setIsError(false)
    dispatch(clearQuiz())
    navigate('/questionnaire')
  }

  // when get directions is clicked, prepare data and open google map link
  const handleGetDirections = () => {
    const { location } = quizDataReturned
    const address = `${location.address1}, ${location.city}, ${location.state}`
    const encodedAddress = encodeURIComponent(address)
    const directionsLink = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`
    window.open(directionsLink, '_blank')
  }

  // makes a call to the server to save the current result
  const handleSave = async () => {
    if (quizDataReturned && distanceInMiles){

      const resultEntry = {
        userId: '', 
        quizId: quizId,
        date: new Date().toISOString(),
        restaurantName: quizDataReturned.name,
        location: `${quizDataReturned.location.address1} ${quizDataReturned.location.city} ${quizDataReturned.location.state}`,
        priceRange: quizDataReturned.price,
        distance: distanceInMiles, 
        rating: quizDataReturned.rating
      }

      await setLoadingWithDelay(async () => {await saveResult(resultEntry)}, setIsLoading)

      setIsLoading(false)
      setIsSaveClicked(true)

    }
  }

  // handle save result success
   useEffect(() => {
    if (isSaveResultSuccess) {
      setSaveResponse('This craving has been saved.')
      setIsSaveError(false)
    }
  }, [isSaveResultSuccess])

  // handle save result error
  useEffect(() => {
    if (isSaveResultError) {
      setSaveResponse('Something went wrong, please try again.')
      setIsSaveError(true)
    }
  }, [isSaveResultError, saveResultError])

   // submit most recent quiz again 
  const handleFindAnother = async () => {
    const body = getQuizBody()

    if (body !== null) {
      await setLoadingWithDelay(async () => {await submitQuiz(body)}, setIsLoading)
    } else {
      setError('This request cannot be made, please try again')
      setIsError(true)
    }
    setIsSaveClicked(false)
    setIsSaveError(false)
  }

  // handle quiz submission success
  useEffect(() => {
    if (isSubmitQuizSuccess) {
      setQuizDataReturned(quizData.business)
    }
  }, [isSubmitQuizSuccess, quizData])

  // handle quiz submission error
  useEffect(() => {
    const handleQuizError = () => {
      setIsError(true)
      if (submitQuizError && 'data' in submitQuizError) {
        setError(submitQuizError.data as string)
      } else {
        setError('SERVER ERROR')
      }
    }

    if (isSubmitQuizError) {
      handleQuizError()
    }
  }, [isSubmitQuizError, submitQuizError])

  // show an error message if the user navigates to this page
  // without taking a quiz first
  useEffect(() => {
    if (!quizDataReturned) { 
      setError('Please complete the questionnaire before we can find a matching restaurant for you')
      setIsError(true)
    }
  }, [quizDataReturned])

  return (
    <section className='result'>
      {isLoading ? (
        <Loading text='Loading...' />
      ): 
      (isError ? ( 
        <QuizSubmissionError onReset={handleReset} text={error}/> 
        ) : (
        <>
        {isSaveClicked && 
          <Message 
            className={`msg ${isSaveError ? 'error' : 'success'}`} 
            icon={faCheckCircle} 
            text={saveResponse} 
          />
        }
        <h2>Your craving destination is found <span>🎯</span></h2> 
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
              <p>
                <span className='hidden'>Yelp link</span>
                <FontAwesomeIcon icon={faGlobe} />
                <Link className='link' to={quizDataReturned?.url} target='_blank' rel='noopener noreferrer'>
                  View on Yelp
                </Link>
              </p>
              <div className='btn-wrapper'>
                {!isSaveClicked || isSaveError ? (
                    <button className='btn secondary' onClick={handleSave}>
                      Save This Spot
                    </button>
                ) : null}
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