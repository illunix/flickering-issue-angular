import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { createInjectable } from 'ngxtension/create-injectable';
import { signalSlice } from 'ngxtension/signal-slice';
import {
  catchError,
  EMPTY,
  map,
  merge,
  Observable,
  startWith,
  Subject,
} from 'rxjs';
import { categoriesInitialState, Category } from '../models/categories.model';

export const CategoriesState = createInjectable(() => {
  const httpClient = inject(HttpClient);

  const getCategoriesError$ = new Subject<void>();

  const sources$ = merge(
    getCategoriesError$.pipe(
      map(() => ({ getCategoriesStatus: 'error' as const }))
    )
  );

  return signalSlice({
    initialState: categoriesInitialState,
    sources: [sources$],
    actionSources: {
      getCategories: (_, $: Observable<void>) =>
        $.pipe(
          map((q) => ({
            getCategoriesStatus: 'success' as const,
            categories: [
              { name: 'All categories' },
              { name: 'Fruits' },
              { name: 'Vegetables' },
              { name: 'Meat' },
            ],
          })),
          catchError(() => {
            getCategoriesError$.next();
            return EMPTY;
          }),
          startWith({
            getCategoriesStatus: 'getting' as const,
            categories: [],
          })
        ),
      setCurrentCategory: (_, $: Observable<Category>) =>
        $.pipe(
          map((q) => ({
            currentCategory: q,
          }))
        ),
      resetState: (_, $: Observable<void>) =>
        $.pipe(map(() => categoriesInitialState)),
    },
  });
});
