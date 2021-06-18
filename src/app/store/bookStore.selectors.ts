import { createSelector } from '@ngrx/store';
import { BookStore } from './bookStore.model';
import { AppState } from './reducer.all';

export const booksSelector = createSelector(
  (state: AppState) => state.books,
  (books: BookStore) => books
)

export const allBooksSelector = createSelector (
  (state: AppState) => state.books,
  (books: BookStore) => books.books
)