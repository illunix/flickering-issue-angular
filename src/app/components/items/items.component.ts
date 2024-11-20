import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CategoriesState } from '../../states/categories.state';

@Component({
  selector: 'app-items',
  imports: [],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css',
})
export class ItemsComponent implements OnInit {
  public readonly categoriesState = inject(CategoriesState);
  private readonly route = inject(ActivatedRoute);

  public ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const category = params.get('category');
      if (!category) return;

      this.categoriesState.setCurrentCategory(
        this.categoriesState.categories().find((q) => q.name === category)!
      );
    });
  }
}
