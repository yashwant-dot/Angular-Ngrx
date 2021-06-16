import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from '../app/components/books/books.component';
import { DetailComponent } from './components/detail/detail.component';

const routes: Routes = [
  {path: '', component: BooksComponent },
  {path: 'detail/:id', component: DetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
