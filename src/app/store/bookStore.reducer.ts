import { BookStore } from './bookStore.model';
import { BookStoreActionType, BookStoreActions } from './bookStore.actions';
import { ActionReducerMap } from '@ngrx/store';

const initialState: BookStore = {
  isLoading: false,
  books: []
}

export interface BookState {
  books: BookStore
}

export function bookStoreReducer(state = initialState, action: BookStoreActions) {
  switch(action.type) {
    case BookStoreActionType.GetBooks:
      return { ...state, isLoading: true }
    case BookStoreActionType.SetBooks:
      return { isLoading: false, books: [ ...state.books, ...action.payload ]} 
    case BookStoreActionType.AddBook:
      return { ...state, books: [ action.payload, ...state.books  ]}   
    default:
      return { ...state}  
  }
}

export const reducer: ActionReducerMap<BookState, BookStoreActions> = {
  books: bookStoreReducer
}