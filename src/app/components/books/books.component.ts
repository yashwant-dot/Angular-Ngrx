import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AddBookComponent } from '../add-book/add-book.component';
import {FormControl} from '@angular/forms';

import { Observable, Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducer.all';
import { BookStore } from '../../store/bookStore.model'
import  { GetBooks, AddBook } from '../../store/bookStore.actions'

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  searchFormControl = new FormControl('');
  allBooks!: any[];
  storeData!: Observable<BookStore>;
  mySubject = new Subject<string>();

  constructor(private dialog: MatDialog, private store: Store<AppState>) {
    this.storeData = this.store.select('books');
   }

  ngOnInit(): void {
    // Getting data from api and adding it to state.
    this.store.dispatch(new GetBooks());
    // getting data from state
    this.storeData.subscribe(val => this.allBooks = val.books);
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
        this.store.dispatch(new AddBook(book));
      }
    });
  }

  handleSearch(text: string): void {
    this.mySubject.next(text);
  }

  search(text: any): void {

    this.storeData.pipe(map(data => data.books)).subscribe(books => {
      if(!text) {
        this.allBooks = books;
        return;
      }
      this.allBooks = books.filter(book => 
        String(book.volumeInfo.title).trim().toLowerCase().startsWith(String(text).toLowerCase())
      )
    })
  }

}
