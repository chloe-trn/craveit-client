import { render, screen } from '@testing-library/react'
import Heading from '../../../components/generic/Heading'

describe('Heading', () => {
    it('renders a heading with the correct title', () => {
        // arrange
        const title = 'Test Heading'
      
        // act
        render(<Heading title={title} />)
        const headingElement = screen.getByText(title)
      
        // assert
        expect(headingElement).toBeInTheDocument()
        expect(headingElement.textContent).toBe(title)
    })
})