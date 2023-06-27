export type User = {
  username: string; 
  email?: string; 
  password: string;
}

export type Quiz = {
  userId: string;
  date: string;
  location: string;
  distance: string;
  cuisine: string;
  priceRange: string;
}

export type Result = {
  id?: number;
  userId: string;
  quizId: number;
  date: string;
  restaurantName: string;
  location: string;
  priceRange: string;
  distance: string;
  rating: number;
}