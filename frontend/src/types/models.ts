export interface Ingredient {
  id: number;
  userId?: number;
  name: string;
  details?: { price?: number; dryMatter?: number; days?: number };
  currentStock: number;
  createdAt?: string;
  updatedAt?: string;
}
