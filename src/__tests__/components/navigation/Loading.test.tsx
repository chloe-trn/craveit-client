import { render, screen } from '@testing-library/react'
import Loading from '../../../components/navigation/loading/Loading'

describe('Loading', () => {
  it('renders the loading text', () => {
    // arrange
    const mockText = 'Mock Loading Text' 

    // act
    render(<Loading text={mockText} />) 
    const loadingText = screen.getByText(mockText) 

    // assert
    expect(loadingText).toBeInTheDocument()
  })
})
