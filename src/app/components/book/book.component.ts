import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  @Input() book!: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  getDetail(): void {
    this.router.navigate([`/detail/${this.book.id}`]);
  }

}
