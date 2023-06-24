import { render, screen } from '@testing-library/react'
import StarRating from '../../../components/misc/StarRating'

describe('StarRating', () => {
  test('renders stars with correct fill width for given rating', () => {
    // arrange
    const rating = 3.75

    // act
    render(<StarRating rating={rating} />)

    // assert
    for (let index = 0; index < 5; index++) {  
      const fillElement = screen.getByTestId(`fill-${index}`)
      const expectedFillWidth =
        index < Math.floor(rating) 
        ? '100%'
        : index === Math.floor(rating) 
        ? `${((rating % 1) * 100).toFixed(0)}%`
        : '0%'

      expect(fillElement).toHaveStyle(`width: ${expectedFillWidth}`)
    }
  })
})