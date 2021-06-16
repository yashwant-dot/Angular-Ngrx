import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private apiUrl = "https://www.googleapis.com/books/v1/volumes?q=kaplan%20test%20prep";
  booksLoaded: boolean = false;
  totBooks!: Observable<any[]>;
  detailBook: any;
  
  constructor(private http: HttpClient, private store: Store<{ books: any[] }>) {
    this.totBooks = this.store.select('books');
   }

  getBooks(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  setDetailBook(id: any): any {
    this.totBooks.subscribe(books => {
      this.detailBook = books.filter(book => book.id === id)[0];
    })
    return this.detailBook;
  }
}
