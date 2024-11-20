import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { categoriesInitialState } from './models/categories.model';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  public readonly categoriesState = categoriesInitialState;

  public selectedCategory = signal<string | undefined>('Fruits');
}
