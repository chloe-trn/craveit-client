import { render, screen } from '@testing-library/react'
import List from '../../../components/generic/List'

describe('List', () => {
  test('renders a list of with the correct number of items and item content', () => {
    // arrange
    const mockItems = ['Item 1', 'Item 2', 'Item 3']
    const mockRenderFunction= jest.fn(item => <span>{item}</span>)

    // act
    render(<List items={mockItems} render={mockRenderFunction} />)
    const listItems = screen.getAllByRole('listitem')

    // assert
    expect(listItems).toHaveLength(mockItems.length)

    listItems.forEach((listItem, index) => {
      expect(listItem).toHaveTextContent(mockItems[index])
    })

    expect(mockRenderFunction).toHaveBeenCalledTimes(mockItems.length)

    mockItems.forEach((item) => {
      expect(mockRenderFunction).toHaveBeenCalledWith(item)
    })
  })
})
