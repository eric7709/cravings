export interface Category {
  id: string;
  name: string;
  createdAt?: string
}

export type CategorySelectionStore = {
  selectedCategory: Category | null;
  selectCategory: (category: Category) => void
  clearCategory: () => void
  activeModal: "update" | "create" | "delete" | null;
  setModal: (modal: "update" | "create" | "delete" | null) => void;
  closeModal: () => void;
};
export interface CategoryDataStore {
  categories: Category[];
  isLoading: boolean;
  isUpdating: boolean;
  error: string | null;
  searchTerm: string;
  sortBy: keyof Category;
  sortOrder: "asc" | "desc";
  setCategories: (categories: Category[]) => void;
  setLoading: (isLoading: boolean) => void;
  setUpdating: (isUpdating: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  addCategory: (category: Category) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  removeCategory: (id: string) => void;
  reset: () => void;
  setSearchTerm: (term: string) => void;
  setSortBy: (field: keyof Category) => void;
  setSortOrder: (order: "asc" | "desc") => void;
  filteredCategories: () => Category[];
}
