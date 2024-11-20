export interface Category {
  name: string;
}

export interface CategoriesState {
  categories: Category[];
  currentCategory: Category | undefined;
}

export const categoriesInitialState: CategoriesState = {
  categories: [
    { name: 'All categories' },
    { name: 'Fruits' },
    { name: 'Vegetables' },
    { name: 'Meat' },
  ],
  currentCategory: { name: 'Fruits' },
};
