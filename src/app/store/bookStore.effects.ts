import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { BooksService } from '../services/books.service';
import { BookStoreActionType, GetBooks, SetBooks } from './bookStore.actions';

@Injectable()

export class BooksEffect {

  constructor(private bookServ: BooksService, private action$: Actions) {}

  loadBooks = createEffect(() => this.action$.pipe(
    ofType<GetBooks>(BookStoreActionType.GetBooks),
    mergeMap(() => this.bookServ.getBooks().pipe(
      map(data => (new SetBooks(data.items)))
    ))
  ))

}