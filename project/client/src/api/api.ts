import { Recipe, Product } from './../types/types';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4000/',
});
const token = localStorage.getItem('accessToken');
const headers = {
  Authorization: `Bearer ${token ? JSON.parse(token).value : ''}`,
  'content-type': 'application/json',
};
export const recipeAPI = {
  getRecipes(isPublic: string, userId?: string) {
    return instance.get(`recipe`, { params: { isPublic, userId }, headers });
  },
  getRecipe(id: string) {
    return instance.get(`recipe/${id}`, { headers });
  },
  addRecipe({
    userId,
    recipe: { name, timeForPreparing, description, ingredients, isPublic },
  }: {
    userId: string;
    recipe: Recipe;
  }) {
    return instance.post(
      `recipe`,
      {
        name,
        timeForPreparing,
        description,
        ingredients,
        isPublic,
        creatorId: userId,
        likers: [],
      },
      { headers },
    );
  },
  updateRecipe({ id, name, timeForPreparing, description, ingredients, isPublic, likers }: Recipe) {
    return instance.put(
      `recipe/${id}`,
      { name, timeForPreparing, description, ingredients, isPublic, likers },
      { headers },
    );
  },
  filter(ingredients: Array<string>, userId?: string) {
    return instance.post(`recipe/filter`, { ingredients, userId }, { headers });
  },
  removeRecipe(id: string) {
    return instance.delete(`recipe/${id}`, { headers });
  },
};
export const productAPI = {
  getProducts() {
    return instance.get(`product`, { headers });
  },
  getProduct(id: string) {
    return instance.get(`product/${id}`, { headers });
  },
  addProduct({ name, description, type }: Product) {
    return instance.post(`product`, { name, description, type }, { headers });
  },
  updateProduct({ id, name, description, type }: Product) {
    return instance.put(`product/${id}`, { name, description, type }, { headers });
  },
  removeProduct(id: string) {
    return instance.delete(`product/${id}`, { headers });
  },
};
export const authAPI = {
  signIn(email: string, password: string) {
    return instance.post(`signin`, { email, password });
  },
  register(name: string, email: string, password: string) {
    return instance.post(`register`, { name, email, password });
  },
  refreshTokens(refreshToken: string) {
    return instance.post(`refresh-tokens`, { refreshToken });
  },
};

export const userAPI = {
  getUsers() {
    return instance.get(`user`, { headers });
  },
  getUser(id: string) {
    return instance.get(`user/${id}`, { headers });
  },
  removeUser(id: string) {
    return instance.delete(`user/${id}`, { headers });
  },
};
