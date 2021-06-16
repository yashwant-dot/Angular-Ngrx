import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  title!: String;
  author!: String;
  date!: Date;
  constructor(private dialogRef: MatDialogRef<AddBookComponent>) { }

  ngOnInit(): void {
  }

  add(): void {
    if(!this.title || !this.author || !this.date) {
      alert('Please add all fields');
      return;
    }

    this.dialogRef.close({ 
      data: {
        "title": this.title,
        "authors": [this.author],
        "publishedDate": this.date
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }

}
