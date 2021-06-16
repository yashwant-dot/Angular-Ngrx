import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../../services/books.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  book!: any;
  constructor(private route: ActivatedRoute, private bookSrv: BooksService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.book = this.bookSrv.setDetailBook(id);
    console.log(this.book);
  }

}
