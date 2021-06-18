import { ActionReducerMap } from '@ngrx/store';
import { BookStore } from "./bookStore.model";
import { BookStoreActions } from './bookStore.actions';
import { bookStoreReducer } from './bookStore.reducer';

export interface AppState {
  books: BookStore
}

export const appReducer: ActionReducerMap<AppState, BookStoreActions> = {
  books: bookStoreReducer
}

