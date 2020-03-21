export interface Recipe {
  id: number;
  name: string;
  ingredients: Array<string>;
  preparationTimeMinutes: number;
  description: string;
  rating: number;
}
