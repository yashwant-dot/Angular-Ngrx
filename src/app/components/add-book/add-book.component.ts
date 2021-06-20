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
  test:any = {
    next: (val: any) => console.log(val),
    error: (error: any) => console.log(error)
  };
  constructor(private dialogRef: MatDialogRef<AddBookComponent>, private fb: FormBuilder, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.bookAddForm = this.fb.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
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

  // getPublishedDateErrors(): string {
  //   if(this.bookAddForm.get('publishedDate')?.hasError('matDatepickerMax')) {
  //     return 'Please add date before today!';
  //   }
  //   return 'Please add date';
  // }

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
