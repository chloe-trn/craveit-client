import { Result } from '../../helpers/types'

// mock data for testing 

export const mockLoginUserResponse = {
  token: '1234',
  expiration: '2023-06-25T19:01:05Z',
  status: 'Success',
  message: 'Login successful!',
  username: 'mockusername'
}

export const mockRegisterUserResponse = {
  token: '1234',
  expiration: '2023-06-28T00:36:36Z',
  status: 'Success',
  message: 'User created successfully!',
  username: 'mockusername'
}

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

export const mockSubmitQuizResponse = {
  quizId: 1237,
  business: {
      id: 'abc',
      alias: 'test-alias',
      name: 'Test name',
      imageUrl: null,
      isClosed: false,
      url: 'www.test.com',
      reviewCount: 0,
      categories: [
          {
              alias: 'alias-category',
              title: 'title-category'
          }
      ],
      rating: 4.5,
      coordinates: {
          latitude: 38.862179,
          longitude: -77.295982
      },
      transactions: [],
      price: '$$$',
      location: {
          address1: '42 Wallaby Way',
          address2: 'Ste 100',
          address3: '',
          city: 'New York',
          zipCode: null,
          country: 'US',
          state: 'NY',
          displayAddress: null
      },
      phone: '+15715912955',
      displayPhone: null,
      distance: 10040.584
  }
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
    location: {
      address1: '42 Wallaby Way',
      city: 'New York',
      zipCode: null,
      country: 'US',
      state: 'NY',
      displayAddress: null,
    },
    price: '$$$',
    distance: 3873,
  }
}

export const mockGetResultsResponse: Result[] = [
  {
    id: 3093,
    userId: '1234',
    quizId: 3196,
    date: '2023-06-27T00:47:22.068',
    restaurantName: 'Mock Restaurant Name 1',
    location: '42 Wallaby Way New York NY',
    priceRange: '$$',
    distance: '1.71',
    rating: 3 
  },
  {
    id: 3094,
    userId: 'ef242dbc-873a-47bc-9957-dafc6dbfabde',
    quizId: 3196,
    date: '2023-06-27T00:47:26.921',
    restaurantName: 'Mock Restaurant Name 2',
    location: '52 Wallaby Way New York NY',
    priceRange: '$$',
    distance: '5.48',
    rating: 4
  }
]