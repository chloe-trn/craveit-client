// @ts-nocheck
import './maps.css'
import { useState, useCallback, useEffect } from 'react'
import { AddressAutofill, AddressMinimap, config } from '@mapbox/search-js-react'
import { Location } from '../../../services/quiz/quizSlice'

type AutocompleteMapProps = {
  location?: Location
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  isReset: boolean
}

const AutocompleteMap = ({ location, onInputChange, isReset }: AutocompleteMapProps) => {
  const [showMinimap, setShowMinimap] = useState(false)
  const [feature, setFeature] = useState()
  const [token, setToken] = useState('')

  // Event handler for input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => onInputChange(e)

  // Event handler for saving the marker location
  const handleSaveMarkerLocation = (coordinate) => console.log(`Marker moved to ${JSON.stringify(coordinate)}.`)

  // Callback function to handle retrieval of address features
  const handleRetrieve = useCallback((res) => {
    const feature = res.features[0]
    setFeature(feature)
    setShowMinimap(true)
  }, [])

  // Set the Mapbox access token
  useEffect(() => {
    const accessToken = process.env.REACT_APP_MAPBOX
    setToken(accessToken)
    config.accessToken = accessToken
  }, [])

  // Reset the form when the reset flag is set
  useEffect(() => {
    const resetForm = () => {
      const inputs = document.querySelectorAll('input')
      inputs.forEach((input) => (input.value = ''))
      setFeature(null)
      setShowMinimap(false)
    }
    if (isReset) {
      resetForm()
    }
  }, [isReset])

  return (
    <>
      <div className='autocomplete-wrapper'>
        <div className={`input-map-wrapper ${showMinimap ? '' : 'map-hidden'}`}>
          <div className='column address'>
            <div className='formfield'>
              <label htmlFor='street'>Street</label>
              <AddressAutofill accessToken={token} onRetrieve={handleRetrieve}>
                <input
                  id='street'
                  placeholder='start typing your address, e.g. 123 Main...'
                  autoComplete='address-line1'
                  value={location.street || ''}
                  onChange={handleInputChange}
                  required
                />
              </AddressAutofill>
            </div>
            <div className='secondary-inputs'>
              <div className='formfield'>
                <label htmlFor='streetContinued'>Street Continued</label>
                <input 
                  type='text'
                  id='streetContinued'
                  placeholder='apartment, suite, unit, building, floor, etc.' 
                  autoComplete='address-line2'
                  value={location.streetContinued || ''}
                  onChange={handleInputChange} />
              </div>
              <div className='formfield'>
                <label htmlFor='city'>City</label>
                <input 
                  type='text'
                  id='city'
                  placeholder='your city' 
                  autoComplete='address-level2'
                  value={location.city || ''}
                  onChange={handleInputChange}
                  required />
              </div>
              <div className='formfield'>
                <label htmlFor='state'>State</label>
                <input 
                  type='text'
                  id='state'
                  placeholder='your state' 
                  autoComplete='address-level1'
                  value={location.state || ''}
                  onChange={handleInputChange} 
                  required />
              </div>
              <div className='formfield'>
                <label htmlFor='zipCode'>Zipcode</label>
                <input 
                  type='text'
                  id='zipCode'
                  className='input' 
                  placeholder='your zipcode' 
                  autoComplete='postal-code' 
                  value={location.zipCode || ''}
                  onChange={handleInputChange}
                  required />
              </div>
            </div>
          </div>
          <div className='column map'>
            <div className={`minimap ${showMinimap ? '' : 'map-hidden'}`}>
              <AddressMinimap
                canAdjustMarker={true}
                satelliteToggle={true}
                mapStyleMode={'satellite'}
                feature={feature}
                show={showMinimap}
                zoom={13}
                onSaveMarkerLocation={handleSaveMarkerLocation}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AutocompleteMap