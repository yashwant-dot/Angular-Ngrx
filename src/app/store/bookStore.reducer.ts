import { BookStore } from './bookStore.model';
import { BookStoreActionType, BookStoreActions } from './bookStore.actions';

const initialState: BookStore = {
  isLoading: false,
  books: []
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