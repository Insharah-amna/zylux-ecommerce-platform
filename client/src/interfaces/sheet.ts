interface FilterSheetProps {
  isResetButtonShown: boolean;
  resetAllFilters: () => void;
  setCategories: (categories: string[]) => void;
  setPrice: (price: number[]) => void;
  setRatings: (ratings: number[]) => void;
  search: string;
  setSearch: (value: string) => void;
  handleSearch: () => void;
  price: number[];
  categoryList: any[]; // type this properly based on your category shape
  isCategoriesLoading: boolean;
  categories: string[];
  handleCheckboxChange: (categoryId: string) => void;
  ratings: number[];
  handleRatingChange: (rating: number) => void;
}
