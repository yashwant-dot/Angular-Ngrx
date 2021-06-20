import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatToolbarModule} from '@angular/material/toolbar';

import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BooksComponent } from './components/books/books.component';
import { BookComponent } from './components/book/book.component';
import { DetailComponent } from './components/detail/detail.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import {MatChipsModule} from '@angular/material/chips';

import { StoreModule } from '@ngrx/store';
import { BooksEffect } from './store/bookStore.effects';
import { EffectsModule } from '@ngrx/effects';
import { appReducer } from './store/reducer.all';


@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    BookComponent,
    DetailComponent,
    AddBookComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatChipsModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([BooksEffect])
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [AddBookComponent]
})
export class AppModule { }  
