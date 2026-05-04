import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LibraryService } from '../../services/library.service';
import { Author } from '../../models/library.model';

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './authors.component.html'
})
export class AuthorsComponent implements OnInit {
  authors = signal<Author[]>([]);
  authorForm: FormGroup;
  showForm = signal(false);

  constructor(private libraryService: LibraryService, private fb: FormBuilder) {
    this.authorForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      nationality: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadAuthors();
  }

  loadAuthors(): void {
    this.libraryService.getAuthors().subscribe(data => this.authors.set(data));
  }

  submitForm(): void {
    if (this.authorForm.valid) {
      this.libraryService.saveAuthor(this.authorForm.value).subscribe(() => {
        this.loadAuthors();
        this.toggleForm();
      });
    }
  }

  deleteAuthor(id: number): void {
    if (confirm('Tem certeza que deseja excluir este autor?')) {
      this.libraryService.deleteAuthor(id).subscribe(() => this.loadAuthors());
    }
  }

  editAuthor(author: Author): void {
    this.authorForm.patchValue(author);
    this.showForm.set(true);
  }

  toggleForm(): void {
    this.showForm.set(!this.showForm());
    if (!this.showForm()) this.authorForm.reset();
  }
}
