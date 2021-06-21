import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      title: ['', [Validators.required, Validators.minLength(6)]],
      author: ['', [Validators.required, Validators.minLength(6)]],
      publishedDate: ['',[Validators.required]]
    });
    
  }

  get title() {
    return this.bookAddForm.get('title');
  }

  get author() {
    return this.bookAddForm.get('author');
  }

  get publishedDate() {
    return this.bookAddForm.get('publishedDate');
  }

  add(): void {
    this.dialogRef.close({ 
      data: {
        "title": this.title?.value,
        "authors": [this.author?.value],
        "publishedDate": this.datePipe.transform(this.publishedDate?.value, 'yyyy-MM-dd')
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }

}
