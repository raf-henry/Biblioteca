export interface Author {
  id?: number;
  name: string;
  nationality: string;
}

export interface Book {
  id?: number;
  title: string;
  isbn: string;
  stock: number;
  publicationYear?: number;
  genre?: string;
  description?: string;
  author: Author;
}

export interface Loan {
  id?: number;
  book: Book;
  borrowerName: string;
  loanDate?: string;
  dueDate?: string;
  returnDate?: string;
  fine?: number;
}
