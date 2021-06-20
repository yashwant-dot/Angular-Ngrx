import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../../services/books.service';

import { Store } from '@ngrx/store';
import { allBooksSelector } from '../../store/bookStore.selectors';
import { AppState } from '../../store/reducer.all';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  book!: any;
  allBooks!: Observable<any>;
  constructor(private route: ActivatedRoute, private bookSrv: BooksService, private store: Store<AppState>) {
    this.allBooks = this.store.select(allBooksSelector).pipe(map(books => books.filter(book => book.id !== this.book.id)));
   }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.bookSrv.detailBook.subscribe(val => this.book = val);
    this.bookSrv.setDetailBook(id);
  }

}
