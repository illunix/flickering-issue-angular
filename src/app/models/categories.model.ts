export interface Category {
    name: string;
}

export type GetCategoriesStatus = 'pending' | 'getting' | 'success' | 'error';

export interface CategoriesState {
  getCategoriesStatus: GetCategoriesStatus;
  categories: Category[];
  currentCategory: Category | undefined;
}

export const categoriesInitialState: CategoriesState = {
  getCategoriesStatus: 'pending',
  categories: [],
  currentCategory: undefined,
};

