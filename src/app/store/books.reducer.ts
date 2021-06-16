import { createReducer, on } from '@ngrx/store';
import { retrievedBookList, addBook } from './books.actions';

export const initialState: ReadonlyArray<any> = [];

export const booksReducer = createReducer(
  initialState,
  on(retrievedBookList, (state, { books }) => [...state, ...books]),
  on(addBook, (state, { book }) => [book, ...state]),
);  