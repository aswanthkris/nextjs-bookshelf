export interface Book {
  _id: string;
  bookName: string;
  author: string;
  price: string;
  image: string;
  description: string;
  language: string;
}

export interface BookResponse {
  data: Book;
  // Add other response properties if needed
}
