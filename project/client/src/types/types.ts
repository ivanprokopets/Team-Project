export interface Recipe {
  id?: number;
  name: string;
  ingredients: Array<string>;
  timeForPreparing: number;
  description: string;
  isPublic: boolean;
  likers: string[];
}
export interface Product {
  id: number;
  name: string;
  description: string;
  type: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}
