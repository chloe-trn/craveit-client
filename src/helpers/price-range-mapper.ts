// maps dollar signs to a price range
export const mapPriceRange = (priceRange: string) => {
  switch (priceRange) {
    case '$':
      return 'Under $10'
    case '$$':
      return '$11-$30'
    case '$$$':
      return '$31-$60'
    case '$$$$':
      return 'Over $61'
    default:
      return ''
  }
}