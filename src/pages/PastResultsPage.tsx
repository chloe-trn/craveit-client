import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Result } from '../helpers/types'
import { mapPriceRange } from '../helpers/price-range-mapper'
import { useGetResultsQuery, useDeleteResultMutation } from '../redux/clientApi'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faExclamationCircle,
  faStore,
  faStar,
  faDollarSign,
  faArrowsLeftRightToLine,
  faLocationDot,
  faTrash
} from '@fortawesome/free-solid-svg-icons'

import Loading from '../components/navigation/Loading'
import Message from '../components/generic/Message'
import SortSelect from '../components/misc/SortSelect'

const PastResultsPage = () => {
  // api endpoints 
  const getResults = useGetResultsQuery()
  const [deleteResult, { isSuccess: isDeleteResultSuccess, isError: isDeleteResultError }] = useDeleteResultMutation()

  // filter states
  const [sortedResults, setSortedResults] = useState<Result[]>(getResults.data || [])
  const [orderBy, setOrderBy] = useState<keyof Omit<Result, 'id'> | 'date'>('date')
  const [sortDirection, setSortDirection] = useState('')
  
  // delete result states
  const [deletedResultIds, setDeletedResultIds] = useState<number[]>([])
  const [resultIdClicked, setResultIdClicked] = useState(0)
  const [deleteResponse, setDeleteResponse] = useState('')
  const [isDeleteClicked, setIsDeleteClicked] = useState(false)
  const [isDeleteError, setIsDeleteError] = useState(false)

  // update orderBy filter state when user changes it
  // set initial sort to 'asc'
  const handleOrderByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrderBy(e.target.value as keyof Omit<Result, 'id'> | 'date')
    setSortDirection('asc')
  }

  // update sortDirection state when user changes it 
  const handleSortChange = (sortDirection: string) => setSortDirection(sortDirection)

  // calls delete result api endpoint
  const handleDelete = async (id: number) => {
    await deleteResult(id)
    setResultIdClicked(id)
  }

  // handle delete result api response
  useEffect(() => {
    if (isDeleteResultSuccess) {
      setIsDeleteClicked(true)
      setIsDeleteError(false)   
      setDeleteResponse('Item deleted.')
      setDeletedResultIds(prevIds => [...prevIds, resultIdClicked])

      setTimeout(() => {
        setIsDeleteClicked(false)
      }, 3000)
    } else if (isDeleteResultError) {
      setIsDeleteClicked(true)
      setIsDeleteError(true)
      setDeleteResponse('Cannot delete this item.')
    }
  }, [isDeleteResultSuccess, isDeleteResultError, resultIdClicked])

  // update sortedResults list when filters change
  useEffect(() => {
    if (orderBy && sortDirection) {
      const copyOfResults = [...sortedResults]

      // sorting algorithm
      copyOfResults.sort((a, b) => {
        const valueA = a[orderBy]
        const valueB = b[orderBy]

        // compare two string values
        if (typeof valueA === 'string' && typeof valueB === 'string') {
          if (sortDirection === 'asc') {
            return valueA.localeCompare(valueB)
          } else if (sortDirection === 'dsc') {
            return valueB.localeCompare(valueA)
          }
        }

        // compare two numeric values
        if (typeof valueA === 'number' && typeof valueB === 'number') {
          if (sortDirection === 'asc') {
            return valueA - valueB
          } else if (sortDirection === 'dsc') {
            return valueB - valueA
          }
        }

        // default case: no sorting
        return 0
      })

      setSortedResults(copyOfResults)
    }
  }, [orderBy, sortDirection, sortedResults])

  // set results when available 
  useEffect(() => {
    if (getResults.data) {
      setSortedResults(getResults.data)
    }
  }, [getResults.data])

  // fetch results on mount
  useEffect(() => {
    getResults.refetch()
    setIsDeleteClicked(false)
  }, [])

  // show the loading screen while results are being fetched
  if (getResults.isLoading) {
    return <Loading text='Loading...' />
  }

  return (
    <section className='past-results'>
      {getResults.data && sortedResults.length > 0 ? (
        <>
          <h2>Your Previous Cravings <span>😋</span></h2>
          <p>Explore your past cravings and customize the display by ordering and sorting based on different categories.</p>
          <div className='filter-wrapper'>
            <div className='filter order-by'>
              <label htmlFor='order-by'>Order By:</label>
              <select id='order-by' value={orderBy} onChange={handleOrderByChange}>
                <option value='date'>Date Saved</option>
                <option value='restaurantName'>Restaurant Name</option>
                <option value='rating'>Rating</option>
                <option value='priceRange'>Price Range</option>
                <option value='distance'>Distance</option>
              </select>
            </div>
            <div className='filter sort'>
              <label htmlFor='sort'>Sort:</label>
              <SortSelect orderBy={orderBy} onSortChange={handleSortChange} />
            </div>
          </div>
          <div className='table-wrapper'>
            {isDeleteClicked &&
              <Message
                className={isDeleteError ? 'msg error' : 'msg disclaimer'}
                icon={faExclamationCircle}
                text={deleteResponse}
              />
            }
            <table>
              <thead>
                <tr>
                  <th className='name'>
                    <FontAwesomeIcon icon={faStore} />
                    Name
                  </th>
                  <th className='rating'>
                    <FontAwesomeIcon icon={faStar} />
                    Rating
                  </th>
                  <th className='price'>
                    <FontAwesomeIcon icon={faDollarSign} />
                    Price Range
                  </th>
                  <th className='distance'>
                    <FontAwesomeIcon icon={faArrowsLeftRightToLine} />
                    Distance Away (mi)
                  </th>
                  <th className='location'>
                    <FontAwesomeIcon icon={faLocationDot} />
                    Location
                  </th>
                  <th className='delete'><span className='hidden'>Delete</span></th>
                </tr>
              </thead>
              <tbody>
                {sortedResults.map((result) => (
                  <tr key={result.id} id={result.id?.toString()} className={deletedResultIds.includes(result.id ?? 0) ? 'deleted' : ''}>
                    <td className='name'>{result.restaurantName}</td>
                    <td className='rating'>{result.rating}</td>
                    <td className='price'>{mapPriceRange(result.priceRange)}</td>
                    <td className='distance'>{result.distance}</td>
                    <td className='location'>{result.location}</td>
                    <td className='delete'>
                      <button onClick={() => result.id && handleDelete(result.id)}>
                        <span className='hidden'>Delete</span>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : getResults.isError ? (
        <>
          <Message className={'msg disclaimer'} icon={faExclamationCircle} text={'No results found.'} />
          <Link to="/questionnaire" className="btn gradient">Take the Questionnaire</Link>
        </>
      ) : (
        <Loading text='Loading...' />
      )}
    </section>
  ) 
}

export default PastResultsPage