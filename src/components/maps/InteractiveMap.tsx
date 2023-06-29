import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
mapboxgl.accessToken = (process.env.REACT_APP_MAPBOX as string)

type InteractiveMapProps = {
  longitude: number
  latitude: number
}

const InteractiveMap = ({ longitude, latitude }: InteractiveMapProps) => {
  // Ref to map container element
  const mapContainer = useRef<HTMLDivElement | null>(null)
  
  // Ref to map instance
  const map = useRef<mapboxgl.Map | null>(null)

  // State variables for longitude, latitude, and zoom
  const [lng, setLng] = useState(longitude || 0)
  const [lat, setLat] = useState(latitude || 0)
  const [zoom, setZoom] = useState(13)

  useEffect(() => {
    // Create map when the component mounts
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current!,
        style: 'mapbox://styles/mapbox/satellite-v9',
        center: [lng, lat],
        zoom: zoom
      })

      // Add a map marker
      const marker = new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .addTo(map.current)
    }

    // Update state variables when the user moves the map 
    if (map.current) {
      map.current.on('move', () => {
        setLng(parseFloat(map.current!.getCenter().lng.toFixed(4)))
        setLat(parseFloat(map.current!.getCenter().lat.toFixed(4)))
        setZoom(parseFloat(map.current!.getZoom().toFixed(2)))
      })
    }
  }, [longitude, latitude])

  return (
    <div className='map-container'>
      <div className='map-info' aria-live='polite'>
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className='map' aria-label='Interactive Map' />
    </div>
  )
}

export default InteractiveMap