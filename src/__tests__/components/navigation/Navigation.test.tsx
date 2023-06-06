import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Navigation from '../../../components/navigation/Navigation'

jest.mock('../../../routes', () => [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
])

describe('Navigation', () => {
    test('renders the correct number of navigation items with the correct name and link', () => {
        // arrange
        const expectedItems = [
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
            { name: 'Contact', path: '/contact' }
        ]

        // act
        render(
            <MemoryRouter>
              <Navigation />
            </MemoryRouter>
        )

        const navigationItems = screen.getAllByRole('listitem')
        
        // assert
        expect(navigationItems).toHaveLength(3)

        navigationItems.forEach((item, index) => {
            const link = screen.getByRole('link', { name: expectedItems[index].name })
            expect(item).toContainElement(link)
            expect(link).toHaveAttribute('href', expectedItems[index].path)
        })
    })
})