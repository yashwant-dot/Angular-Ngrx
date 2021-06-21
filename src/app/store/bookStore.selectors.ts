import { createSelector } from '@ngrx/store';
import { BookStore } from './bookStore.model';
import { AppState } from './reducer.all';

const getBookState = (state: AppState) => state.books;

export const getBookStore = createSelector(
  getBookState,
  (books: BookStore) => books
)

export const getAllBooks = createSelector(
  getBookState,
  (store: BookStore) => store.books
)

export const getBooksLoadingFlag = createSelector(
  getBookState,
  (store: BookStore) => store.isLoading
)