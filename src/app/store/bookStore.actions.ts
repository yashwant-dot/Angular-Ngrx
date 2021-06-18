import { Action } from '@ngrx/store';

export enum BookStoreActionType {
  GetBooks = '[Books] Get All Books from Api',
  SetBooks = '[Books] Set Books in bookStore',
  AddBook = '[Books] Add Book in bookStore'
}

export class GetBooks implements Action {
  readonly type =  BookStoreActionType.GetBooks;
}

export class SetBooks implements Action {
  readonly type =  BookStoreActionType.SetBooks;

  constructor(public payload: any[]) {}
}

export class AddBook implements Action {
  readonly type = BookStoreActionType.AddBook;

  constructor(public payload: any) {}
}

export type BookStoreActions = GetBooks | SetBooks | AddBook;