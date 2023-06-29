import { fireEvent } from '@testing-library/react'
import { render, screen } from '../../utils/custom-render'
import SortSelect from '../../../components/misc/SortSelect'

const onSortChangeMock = jest.fn()

describe('SortSelect', () => {
  it('renders correct options when rating is chosen', () => {
    // arrange and act
    render(<SortSelect orderBy={'rating'} onSortChange={onSortChangeMock} />)

    const selectElement = screen.getByRole('combobox')
    const optionElements = screen.getAllByRole('option')

    // assert
    expect(selectElement).toBeInTheDocument()
    expect(optionElements).toHaveLength(2)
    expect(optionElements[0]).toHaveTextContent('Lowest Rating')
    expect(optionElements[1]).toHaveTextContent('Highest Rating')
  })

  it('calls onSortChange with the correct parameter when chosen', () => {
    // arrange 
    render(<SortSelect orderBy='rating' onSortChange={onSortChangeMock} />)
    
    // act
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'asc' } })

    // assert
    expect(onSortChangeMock).toHaveBeenCalledTimes(1)
    expect(onSortChangeMock).toHaveBeenCalledWith('asc')
  })
})