import { render, screen } from '@testing-library/react'
import PageNotFound from '../../pages/PageNotFound'

describe('PageNotFound', () => {
  it('renders text correctly', () => {
    // arrange and act
    render(<PageNotFound />)
    
    // assert 
    expect(screen.getByText('Oops!')).toBeInTheDocument()
    expect(screen.getByText('Sorry, this page isn\'t available.')).toBeInTheDocument()
  })
})