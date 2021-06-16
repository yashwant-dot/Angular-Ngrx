import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import {MatDialog} from '@angular/material/dialog';
import { AddBookComponent } from '../add-book/add-book.component';
import {FormControl} from '@angular/forms';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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
    this.data.subscribe(val => this.allBooks = val);
    this.searchFormControl.valueChanges.subscribe(val => this.handleSearch(val));
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
    this.data.subscribe(books => {
      if(!text) {
        this.allBooks = books;
        return;
      }
      this.allBooks = books.filter(book => 
        String(book.volumeInfo.title).trim().toLowerCase().startsWith(text.toLowerCase())
      )
    });
  }
}
