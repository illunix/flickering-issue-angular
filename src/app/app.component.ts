import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { explicitEffect } from 'ngxtension/explicit-effect';
import { CategoriesState } from './states/categories.state';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  public readonly categoriesState = inject(CategoriesState);
  private readonly router = inject(Router);

  public selectedCategory = signal<string | undefined>(undefined);

  public constructor() {
    explicitEffect(
      [this.categoriesState.currentCategory, this.categoriesState.categories],
      ([currentCategory, categories]) => {
        this.selectedCategory.set(currentCategory?.name ?? categories[0]?.name);
      }
    );
  }

  public ngOnInit(): void {
    this.categoriesState.getCategories();
  }

  public onCategoryChange(categoryName: string): void {
    this.categoriesState.setCurrentCategory(
      this.categoriesState.categories().find((q) => q.name === categoryName)!
    );
  }

  public onGo(): void {
    this.router.navigate([this.selectedCategory()]);
  }
}
