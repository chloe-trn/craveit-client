import { Result } from '../helpers/types'

// mocks of api responses for testing 
export const mockQuizState = {
  location: {
    street: '',
    streetContinued: '',
    city: '',
    state: '',
    zipCode: '',
  },
  distance: '',
  cuisine: [],
  priceRange: [],
}

export const mockResultData = {
  quizId: 1,
  business: {
    name: 'Restaurant Name',
    rating: 4.5,
    categories: [
      { alias: 'test category 1', title: 'Test Category 1' },
      { alias: 'test category 2', title: 'Test Category 2' },
    ],
    phone: '123-456-7890',
    url: 'https://test.com',
    coordinates: {
      longitude: 0,
      latitude: 0,
    },
    distance: 3873
  }
}

export const mockResults: Result[] = [
  {
    "id": 3093,
    "userId": "ef242dbc-873a-47bc-9957-dafc6dbfabde",
    "quizId": 3196,
    "date": "2023-06-27T00:47:22.068",
    "restaurantName": "Mock Restaurant Name 1",
    "location": "13952 Lee Jackson Memorial Hwy Chantilly VA",
    "priceRange": "$$",
    "distance": "1.71",
    "rating": 3 
  },
  {
    "id": 3094,
    "userId": "ef242dbc-873a-47bc-9957-dafc6dbfabde",
    "quizId": 3196,
    "date": "2023-06-27T00:47:26.921",
    "restaurantName": "Mock Restaurant Name 2",
    "location": "12158 Fairfax Towne Ctr Fairfax VA",
    "priceRange": "$$",
    "distance": "5.48",
    "rating": 4
  }
]