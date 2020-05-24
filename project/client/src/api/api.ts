import { Recipe } from './../types/types';
import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:4000/',

});

export const recipeAPI = {
    setRecipe(recipe: Recipe) {
        return instance.post(`recipe`, { recipe:recipe })
            .then((response:any) => response.data);
    },
    getRecipes() {
        return instance.get(`recipe`)
            .then((response:any) => response.data);
    },
}

export const authAPI = {
    signin(email:string,password:string) {
        return instance.post(`signin`, { email,password })
            .then((response:any) => response.data);
    },
}

// product, user,
// middleware = + token

