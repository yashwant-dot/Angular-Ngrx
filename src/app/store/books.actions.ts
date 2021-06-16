import { createAction, props } from '@ngrx/store';

export const retrievedBookList = createAction(
  '[Books Component]  Retrieve Books',
  props<{ books: any[] }>()
);

export const addBook = createAction(
  '[Books Component] Add Book',
  props<{ book: any }>()
);
