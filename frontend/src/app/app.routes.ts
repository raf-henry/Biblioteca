import { Routes } from '@angular/router';
import { AuthorsComponent } from './components/authors/authors.component';
import { BooksComponent } from './components/books/books.component';
import { LoansComponent } from './components/loans/loans.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'authors', component: AuthorsComponent },
  { path: 'books', component: BooksComponent },
  { path: 'loans', component: LoansComponent }
];
