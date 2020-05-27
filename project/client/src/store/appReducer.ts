import { productAPI } from './../api/api';
import { recipeAPI } from '../api/api';
import { AppStateType } from '.';
import { Recipe,Product} from '../types/types';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

const SET_RECIPES = 'SET_RECIPES';
const SET_RECIPE = 'SET_RECIPE';

const SET_PRODUCTS = 'SET_PRODUCTS';
const SET_PRODUCT = 'SET_PRODUCT';

const initialState = {
  recipe:{
    id: 0,
    name: '',
    ingredients: [''],
    timeForPreparing: 0,
    description:
      '',
   rating: 0,
  } as Recipe,
  recipes: [
    {
      id: 0,
      name: '',
      ingredients: [''],
      timeForPreparing: 0,
      description:'',
      rating: 0,
    },
  ] as Array<Recipe>,
  product:{}as Product,
  products:[]as Array<Product>
};

type InitialState = typeof initialState;

const AppReducer = (state = initialState, action: ActionsTypes): InitialState => {
  switch (action.type) {
    case SET_RECIPES:
      return {
        ...state,
        recipes: action.recipes,
      };
    case SET_RECIPE:
      return {
        ...state,
        recipe: action.recipe,
      };
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.products,
      };
    case SET_PRODUCT:
      return {
        ...state,
        product: action.product,
      };
    default:
      return state;
  }
};

type ActionsTypes = SetRecipesActionType|SetRecipeActionType|SetProductActionType|SetProductsActionType;

interface SetRecipesActionType {
  type: typeof SET_RECIPES;
  recipes: Array<Recipe>;
}
export const setRecipes = (recipes: Array<Recipe>): SetRecipesActionType => ({
  type: SET_RECIPES,
  recipes,
});
interface SetRecipeActionType {
  type: typeof SET_RECIPE;
  recipe: Recipe;
}
export const setRecipe = (recipe: Recipe): SetRecipeActionType => ({
  type: SET_RECIPE,
  recipe,
});

interface SetProductActionType {
  type: typeof SET_PRODUCT;
  product: Product;
}
export const setProduct = (product: Product): SetProductActionType => ({
  type: SET_PRODUCT,
  product,
});
interface SetProductsActionType {
  type: typeof SET_PRODUCTS;
  products: Array<Product>;
}
export const setProducts = (products: Array<Product>): SetProductsActionType => ({
  type: SET_PRODUCTS,
  products,
});



type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionsTypes>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;


export const requestGetRecipes = (): ThunkType => {
  return async (dispatch, getState) => {
    const {data} = await recipeAPI.getRecipes();
    console.log(data)
    dispatch(setRecipes(data));
  };
};

export const requestGetRecipe = (id:string): ThunkType => {
  return async (dispatch, getState) => {
    const {data} = await recipeAPI.getRecipe(id);
    dispatch(setRecipe(data));
  };
};
export const requestAddRecipe = (recipe: Recipe): ThunkType => {
  return async (dispatch, getState) => {
    await recipeAPI.addRecipe(recipe);
    requestGetRecipes();
  };
};
export const requestUpdateRecipe = (id:string,recipe: Recipe): ThunkType => {
  return async (dispatch, getState) => {
    await recipeAPI.updateRecipe({id,...recipe});
    requestGetRecipes();
  };
};
export const requestRemoveRecipe = (id:string): ThunkType => {
  return async (dispatch, getState) => {
    await recipeAPI.removeRecipe(id);
    requestGetRecipes();
  };
};
export const requestFilterRecipe = (ingredients:Array<string>): ThunkType => {
  return async (dispatch, getState) => {
    const {data} = await recipeAPI.filter(ingredients);
    dispatch(setRecipes(data));
  };
};

//products
export const requestGetProducts = (): ThunkType => {
  return async (dispatch, getState) => {
    const {data} = await productAPI.getProducts();
    dispatch(setProducts(data));
  };
};
export const requestGetProduct = (id:string): ThunkType => {
  return async (dispatch, getState) => {
    const {data} = await productAPI.getProduct(id);
    dispatch(setProduct(data));
  };
};
export const requestAddProduct = (product: Product): ThunkType => {
  return async (dispatch, getState) => {
    await productAPI.addProduct(product);
    requestGetProducts();
  };
};
export const requestUpdateProduct = (id:string,product: Product): ThunkType => {
  return async (dispatch, getState) => {
    await productAPI.updateProduct({id,...product});
    requestGetProducts();
  };
};
export const requestRemoveProduct = (id:string): ThunkType => {
  return async (dispatch, getState) => {
    await productAPI.removeProduct(id);
    requestGetProducts();
  };
};
export default AppReducer;
