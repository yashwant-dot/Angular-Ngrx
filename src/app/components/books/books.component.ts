import { Component, OnInit, EventEmitter } from '@angular/core';
import { BooksService } from '../../services/books.service';
import {MatDialog} from '@angular/material/dialog';
import { AddBookComponent } from '../add-book/add-book.component';
import {FormControl} from '@angular/forms';

import { Store } from '@ngrx/store';
import { Observable, fromEvent, Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { retrievedBookList, addBook } from '../../store/books.actions';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  searchFormControl = new FormControl('');
  data!: Observable<any[]>;
  allBooks!: any[];

  mySubject = new Subject<string>();

  constructor(private bookServ: BooksService, private dialog: MatDialog, private store: Store<{ books: any[] }>) {
    this.data = this.store.select('books');
   }

  ngOnInit(): void {
    // Getting data from api and adding it to state.
    if(!this.bookServ.booksLoaded) {
      this.bookServ.getBooks().subscribe(books => {
        this.store.dispatch(retrievedBookList({ books: books.items }));
        this.bookServ.booksLoaded = true;
      });
    }
    // getting data from state
    this.data.subscribe(val => this.allBooks = val);
    // handling search
    this.searchFormControl.valueChanges.subscribe(val => this.handleSearch(val));
    // Debouncing
    this.mySubject.pipe(debounceTime(300)).subscribe(val => this.search(val));
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(AddBookComponent, {
      height: '450px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(val => {
      if(val) {
        let book = {
          id: `${Math.floor(Math.random() * 1000000000)}`,
          volumeInfo: Object.assign({}, val.data)
        }
        this.store.dispatch(addBook({ book }));
      }
    });
  }

  handleSearch(text: string): void {
    this.mySubject.next(text);
  }

  search(text: any): void {
    
    this.data.subscribe(books => {
      if(!text) {
        this.allBooks = books;
        return;
      }
      this.allBooks = books.filter(book => 
        String(book.volumeInfo.title).trim().toLowerCase().startsWith(String(text).toLowerCase())
      )
    });
  }

}
