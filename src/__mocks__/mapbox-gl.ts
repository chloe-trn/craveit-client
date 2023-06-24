// __mocks__/mapbox-gl.ts
// @ts-nocheck

// Mock mapboxgl module
const mapboxgl = jest.genMockFromModule('mapbox-gl')

mapboxgl.Map = function () {
  this.on = jest.fn()
}

mapboxgl.Marker = function () {
  this.setLngLat = jest.fn().mockReturnThis()
  this.addTo = jest.fn()
}

export {}
module.exports = mapboxgl