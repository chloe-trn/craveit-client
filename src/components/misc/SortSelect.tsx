type SortSelectProps = {
  orderBy: string
  onSortChange: (sortDirection: string ) => void
}

// Render select element with dynamic options based on an 'orderBy' parameter
const SortSelect = ({ orderBy, onSortChange }: SortSelectProps) => {
  const getSortOptions = () => {
    switch (orderBy) {
      case 'date':
        return [
          <option key='oldest' value='asc'>Oldest First</option>,
          <option key='newest' value='dsc'>Newest First</option>
        ]
      case 'restaurantName':
        return [
          <option key='az' value='asc'>A-Z</option>,
          <option key='za' value='dsc'>Z-A</option>
        ]
      case 'rating':
        return [
          <option key='lowest' value='asc'>Lowest Rating</option>,
          <option key='highest' value='dsc'>Highest Rating</option>
        ]
      case 'priceRange':
        return [
          <option key='lowest' value='asc'>Lowest Price</option>,
          <option key='highest' value='dsc'>Highest Price</option>
        ]
      case 'distance':
        return [
          <option key='closest' value='asc'>Closest</option>,
          <option key='furthest' value='dsc'>Furthest</option>
        ]
      default:
        return []
    }
  }

  return (
    <select onChange={(e) => onSortChange(e.target.value as 'asc' | 'dsc' | '')}>
      {getSortOptions()}
    </select>
  )
}

export default SortSelect