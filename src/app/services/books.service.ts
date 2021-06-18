import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/reducer.all';
import { allBooksSelector } from '../store/bookStore.selectors';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private apiUrl = "https://www.googleapis.com/books/v1/volumes?q=kaplan%20test%20prep";
  booksLoaded: boolean = false;
  allBooks!: Observable<any[]>;
  detailBook: Subject<any> = new Subject();
  
  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.allBooks = this.store.select(allBooksSelector);
   }

  getBooks(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  setDetailBook(id: any): any {
    this.allBooks.subscribe(books => {
      const book = books.filter(book => book.id === id)[0];
      this.detailBook.next(book);
    });
  }
}
