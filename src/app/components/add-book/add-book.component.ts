import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  bookAddForm!:FormGroup;
  maxDate = new Date();

  constructor(private dialogRef: MatDialogRef<AddBookComponent>, private fb: FormBuilder, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.bookAddForm = this.fb.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      publishedDate: ['',[Validators.required]]
    });
  }

  get title() {
    return this.bookAddForm.get('title')?.value;
  }

  get author() {
    return this.bookAddForm.get('author')?.value;
  }

  get publishedDate() {
    return this.bookAddForm.get('publishedDate')?.value;
  }

  add(): void {
    this.dialogRef.close({ 
      data: {
        "title": this.title,
        "authors": [this.author],
        "publishedDate": this.datePipe.transform(this.publishedDate, 'yyyy-MM-dd')
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }

}
