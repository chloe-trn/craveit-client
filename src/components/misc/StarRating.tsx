type StarRatingProps = {
  rating: number
}

// component that displays stars based on a rating from 1-5
const StarRating = ({ rating }: StarRatingProps) => {

  // array to store the widths of each of the 5 star's fill
  const starFillWidths = Array(5).fill('0%');
  
  // calculate the width of a star's fill based on the rating
  if (rating > 0 && rating <= 5) {
    const fullStars = Math.floor(rating);
    const decimalPart = rating - fullStars;
    
    for (let i = 0; i < fullStars; i++) {
      starFillWidths[i] = '100%';
    }
    
    if (fullStars < 5) {
      starFillWidths[fullStars] = `${(decimalPart * 100).toFixed(0)}%`;
    }
  }

  return (
    <div className='rating-wrapper'>
      <div className='stars'>
        {starFillWidths.map((width, index) => (
          <span key={index} className='star'>
            <span data-testid={`fill-${index}`} className='fill' style={{ width }}></span>
          </span>
        ))}
      </div>
      <span className='rating'>{rating}</span>
    </div>
  )
}

export default StarRating