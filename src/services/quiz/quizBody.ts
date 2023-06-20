type quizBody = {
  userId: string
  date: string
  location: string
  distance: string
  cuisine: string
  priceRange: string
}

let savedQuizBody: quizBody | null

export const setQuizBody = (body: quizBody | null) => {
  savedQuizBody = body
}

export const getQuizBody = () => {
  return savedQuizBody
}