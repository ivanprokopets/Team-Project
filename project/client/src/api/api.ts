import { Recipe,Product } from './../types/types';
import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:4000/',

});

instance.defaults.headers['Csrf-Token'] = 'nocheck';

instance.interceptors.request.use(
  (config) => {
    config.withCredentials = true;
    config.headers['Csrf-Token'] = 'nocheck';
    config.headers['Content-Type'] = 'application/json';
    config.headers['Accept'] = 'application/json';
    config.headers['Access-Control-Allow-Origin'] = '*';
    config.headers['Access-Control-Allow-Methods'] = 'POST';
    config.headers['Access-Control-Allow-Headers'] = 'Content-Type';
    config.headers['Origin'] = 'http://localhost:3000';

    return config;

  },
  
  (error) => Promise.reject(error)
)
const headers={
    Authorization: `Bearer${localStorage.getItem('accessToken')}`,
}
export const recipeAPI = { 
    getRecipes() {
        return instance.get(`recipe`,{headers});
    },
    getRecipe(id:string) {
        return instance.get(`recipe/${id}`,{headers});
    },
    addRecipe({ name,
        timeForPreparing,
        description,
        ingredients,
        isPublic,
        rating}: Recipe) {
        return instance.post(`recipe`, { name,
            timeForPreparing,
            description,
            ingredients,
            isPublic,
            rating},{headers});
    },
    updateRecipe({ id, name,
        timeForPreparing,
        description,
        ingredients,
        isPublic,
        rating}:Recipe) {
            return instance.put(`recipe/${id}`, { name,
                timeForPreparing,
                description,
                ingredients,
                isPublic,
                rating},{headers});
        },
    filter(ingredients:Array<string>) {
        return instance.post(`recipe/filter`,{ingredients},{headers});    
    },
    removeRecipe(id:string) {
        return instance.delete(`recipe/${id}`,{headers});    
    },

} 
export const productAPI = { 
    getProducts() {
        return instance.get(`product`,{headers});
    },
    getProduct(id:string) {
        return instance.get(`product/${id}`,{headers});
    },
    addProduct({
        name,
        description,
        type}: Product) {
        return instance.post(`product`, {  name,
            description,
            type},{headers});
    },
    updateProduct({   id,name,
        description,
        type}:Product) {
            return instance.put(`product/${id}`, { name,
                description,
                type},{headers});
    },
    removeProduct(id:string) {
        return instance.delete(`product/${id}`,{headers});    
    },

} 
export const authAPI = {
    signIn(email:string,password:string) {
        return instance.post(`signin`, { email,password });
    },
    register(name:string,email:string,password:string) {
        return instance.post(`register`, { name,email,password });
    },
    refreshTokens(refreshToken:string){
        return instance.post(`refresh-tokens`, { refreshToken });
    }
}

export const userAPI = { 
    getUsers() {
        return instance.get(`user`,{headers});
    },
    getUser(id:string) {
        return instance.get(`user/${id}`,{headers});
    },
    removeUser(id:string) {
        return instance.delete(`user/${id}`,{headers});    
    },

} 