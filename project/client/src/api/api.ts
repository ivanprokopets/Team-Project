import { Recipe } from './../types/types';
import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8080/',

});

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}


type SetRecipeResponseType = {
    data: {
        recipes: Array<Recipe>
    }
    resultCode: ResultCodesEnum 
    messages: Array<string>
}

export const recipeAPI = {
    setRecipe(recipe: Recipe) {
        return instance.post<SetRecipeResponseType>(`recipe`, { recipe:recipe })
            .then((response:any) => response.data);
    },
    getRecipes() {
        return instance.get<SetRecipeResponseType>(`recipe`)
            .then((response:any) => response.data);
    },
}

