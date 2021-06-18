import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/reducer.all';
import { BookStore } from '../store/bookStore.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private apiUrl = "https://www.googleapis.com/books/v1/volumes?q=kaplan%20test%20prep";
  booksLoaded: boolean = false;
  totBooks!: Observable<BookStore>;
  detailBook: Subject<any> = new Subject();
  
  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.totBooks = this.store.select('books');
   }

  getBooks(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  setDetailBook(id: any): any {
    this.totBooks.pipe(map(data => data.books)).subscribe(books => {
      const book = books.filter(book => book.id === id)[0];
      this.detailBook.next(book);
    });
  }
}
